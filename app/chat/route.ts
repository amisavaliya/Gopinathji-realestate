// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { tools } from '@/lib/tools'
import { getSchemeDetails, getPlotAvailability } from '@/lib/aiTools'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are a helpful assistant for Gopinathji Group, a real estate developer in Surat.
Answer visitor questions about residential schemes (Radharaman Bungalows, Shyam Sundar Villa, etc.)
using the tools provided. Always use a tool to look up real data rather than guessing.
If you're unsure which scheme the visitor means, ask them to confirm the name.`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()
  const conversation = [...messages]

  // Ask Claude what to do with the visitor's message
  let response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: conversation,
    tools,
  })

  // Keep looping as long as Claude keeps asking for tools
  // (a question can sometimes take more than one round-trip)
  while (response.stop_reason === 'tool_use') {
    // Record Claude's tool request in the conversation history
    conversation.push({ role: 'assistant', content: response.content })

    // Claude can ask for more than one tool at once — run all of them
    const toolResults = []

    for (const block of response.content) {
      if (block.type !== 'tool_use') continue

      let result
      try {
        const input = block.input as { slug: string }
        if (block.name === 'get_scheme_details') {
          result = await getSchemeDetails(input.slug)
        } else if (block.name === 'get_plot_availability') {
          result = await getPlotAvailability(input.slug)
        } else {
          result = { error: `Unknown tool: ${block.name}` }
        }
      } catch (err) {
        result = { error: 'Something went wrong looking that up.' }
      }

      toolResults.push({
        type: 'tool_result' as const,
        tool_use_id: block.id,
        content: JSON.stringify(result),
      })
    }

    // Send the results back to Claude as a new turn
    conversation.push({ role: 'user', content: toolResults })

    response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: conversation,
      tools,
    })
  }

  // Claude is done — pull out the final text reply
  const textBlock = response.content.find((block) => block.type === 'text')
  return NextResponse.json({ reply: textBlock?.text ?? '' })
}