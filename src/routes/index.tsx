import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const Route = createFileRoute('/')({ component: App })

const someFn = createServerFn({ method: 'POST' }).handler(async () => {
  throw new Error('always throw')
})

function App() {
  const mutation = useMutation({
    mutationFn: () => someFn(),
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <div style={{ padding: 50 }}>
      <p>Inspect the network and see the return of 200 instead of 500</p>
      <button type="button" onClick={() => mutation.mutate()} style={{
        border: '1px solid black',
      }}>
        Click me
      </button>
    </div>
  )
}
