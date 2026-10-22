'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBox() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to the newest message whenever the list changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      if (!res.ok) throw new Error('Request failed')

      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Closed: show only the round button
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 1000,
          padding: '12px 18px', borderRadius: 999, border: 'none',
          background: '#1a56db', color: '#fff', fontSize: 15, cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        }}
      >
        Chat with us
      </button>
    )
  }

  // Open: show the chat window
  return (
    <div
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 1000,
        width: 340, height: 460, display: 'flex', flexDirection: 'column',
        background: '#fff', color: '#111', borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)', overflow: 'hidden',
        fontFamily: 'sans-serif', fontSize: 14,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 14px', background: '#1a56db', color: '#fff',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <strong>Gopinathji Group Assistant</strong>
        <button
          onClick={() => setOpen(false)}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {messages.length === 0 && (
          <div style={{ color: '#666' }}>
            Hi! Ask me about our schemes, amenities, or available plots.
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%', padding: '8px 12px', borderRadius: 12,
              background: m.role === 'user' ? '#1a56db' : '#eef0f3',
              color: m.role === 'user' ? '#fff' : '#111',
              whiteSpace: 'pre-wrap',
            }}
          >
            {m.content}
          </div>
        ))}

        {loading && <div style={{ color: '#666' }}>Typing...</div>}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', gap: 8, padding: 10, borderTop: '1px solid #ddd' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
          placeholder="Type your question..."
          style={{
            flex: 1, padding: '8px 10px', borderRadius: 8,
            border: '1px solid #ccc', fontSize: 14, color: '#111', background: '#fff',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: '8px 14px', borderRadius: 8, border: 'none',
            background: loading ? '#9bb4ee' : '#1a56db', color: '#fff',
            cursor: loading ? 'default' : 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}