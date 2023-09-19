import { redirect, useLoaderData } from 'react-router-dom'
import { getGoal, updateGoal } from '../api/goals'
import GoalForm from '../components/goal-form'

async function loader({ params }) {
  const goal = await getGoal(params.goalId)
  if (!goal) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }
  return { goal }
}

async function action({ request, params }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await updateGoal(params.goalId, updates)
  return redirect(`/goals/${params.goalId}`)
}

function EditGoal() {
  const { goal } = useLoaderData()

  return (
    <>
      <h1 className="fs-4">Edit goal</h1>
      <GoalForm goal={goal} />
    </>
  )
}

EditGoal.action = action
EditGoal.loader = loader
export default EditGoal
