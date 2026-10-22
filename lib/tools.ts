export const tools = [
  {
    name: 'get_scheme_details',
    description:
      'Get details about a specific residential scheme, including developer, architect, address, and amenities.',
    input_schema: {
      type: 'object' as const,
      properties: {
        slug: {
          type: 'string' as const,
          description: "The scheme's slug, e.g. 'radharaman-bungalows'",
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'get_plot_availability',
    description:
      'Get plot availability for a specific scheme — how many plots are available, their numbers, and sizes offered.',
    input_schema: {
      type: 'object' as const,
      properties: {
        slug: {
          type: 'string' as const,
          description: "The scheme's slug, e.g. 'radharaman-bungalows'",
        },
      },
      required: ['slug'],
    },
  },
]
