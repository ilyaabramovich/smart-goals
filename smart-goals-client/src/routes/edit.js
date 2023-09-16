import { redirect, useLoaderData } from 'react-router-dom'
import { updateGoal } from '../api/goals'
import GoalForm from '../components/goal-form'

export async function action({ request, params }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await updateGoal(params.goalId, updates)
  return redirect(`/goals/${params.goalId}`)
}

export default function EditGoal() {
  const { goal } = useLoaderData()

  return <GoalForm goal={goal} />
}
