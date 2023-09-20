import { redirect } from 'react-router-dom'
import { createGoal } from '../api/goals'
import GoalForm from '../components/goal-form'

async function action({ request }) {
  const formData = await request.formData()
  const goalData = Object.fromEntries(formData)
  const goal = await createGoal(goalData)

  return redirect(`/goals/${goal.id}`)
}

function CreateGoal() {
  return (
    <>
      <h1 className="fs-4">New goal</h1>
      <GoalForm />
    </>
  )
}

CreateGoal.action = action
export default CreateGoal
