import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import z from 'zod'

export const Route = createFileRoute('/')({ component: App })

const someFn = createServerFn({ method: 'POST' })
.inputValidator(z.object({
  str: z.string().max(2, { message: 'string must be less than 2 characters' })
}))
.handler(async ({ data }) => {
  throw new Error(`always throw with data: "${data.str}"`)
})

function App() {
  const [str, setStr] = useState('123')
  
  const mutation = useMutation({
    mutationFn: () => someFn({ data: { str } }),
    onError: (error) => {
      console.log('hello error', error)
    },
  })

  return (
    <div style={{ padding: 50 }}>
      <p>Inspect the network and see the return of 200 instead of 500</p>

      <p>String should not validate if it's longer than 2 characters</p>
      <input style={{ border: '1px solid black' }} value={str} onChange={(e) => setStr(e.target.value)} />
      <button type="button" onClick={() => mutation.mutate()} style={{
        border: '1px solid black',
        marginLeft: 10,
      }}>
        Click me
      </button>
    </div>
  )
}
