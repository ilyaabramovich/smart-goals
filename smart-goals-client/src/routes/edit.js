import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom'
import { updateGoal } from '../goals'

export async function action({ request, params }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await updateGoal(params.goalId, updates)
  return redirect(`/goals/${params.goalId}`)
}

export default function EditGoal() {
  const { goal } = useLoaderData()
  const navigate = useNavigate()

  return (
    <Form method="post" id="goal-form">
      <p>
        <span>Description</span>
        <textarea
          rows={6}
          placeholder="Description"
          aria-label="Description"
          name="description"
          defaultValue={goal.description}
        />
      </p>
      <label>
        <span>Target Value</span>
        <input type="number" name="targetValue" placeholder="0" defaultValue={goal.targetValue} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  )
}
