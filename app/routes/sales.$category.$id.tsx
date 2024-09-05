import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sales/$category/$id')({
  component: () => <div>Hello /sales/$category/$id!</div>
})