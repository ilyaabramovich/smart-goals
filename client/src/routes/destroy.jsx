import { redirect } from 'react-router-dom'
import { deleteGoal } from '../api/goals'

export async function action({ params }) {
  await deleteGoal(params.goalId)
  return redirect('/goals')
}
