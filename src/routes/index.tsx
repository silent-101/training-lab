import TrainingLab from '#/components/lab.tsx';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div>
      <TrainingLab/>
    </div>
  )
}
