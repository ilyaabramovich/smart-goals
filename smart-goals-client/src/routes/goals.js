import { Link, Form, useLoaderData, redirect } from 'react-router-dom'
import { createGoal, getGoals } from '../goals'

export async function loader() {
  const goals = await getGoals()
  return { goals }
}

export async function action() {
  const goal = await createGoal()
  return redirect(`/goals/${goal.id}/edit`)
}

export default function Goals() {
  const { goals } = useLoaderData()

  return (
    <>
      {goals.length ? (
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <Link to={`goals/${goal.id}`}>{goal.id}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          You have no goals yet. Go ahead and add one!
        </p>
      )}
      <Form method="post">
        <button type="submit">New goal</button>
      </Form>
    </>
  )
}
