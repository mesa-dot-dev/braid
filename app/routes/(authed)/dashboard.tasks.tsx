import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)/dashboard/tasks')({
  component: RouteComponent,
  loader: () => {
    return { breadcrumb: 'Tasks' }
  },
})

function RouteComponent() {
  return <>Hello, tasks!</>
}
