import { Form, useLoaderData } from 'react-router-dom'
import { getGoal } from '../goals'

export async function loader({ params }) {
  const goal = await getGoal(params.goalId)
  if (!goal) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { goal };
}

export default function Goal() {
  const { goal } = useLoaderData()

  return (
    <div id="goal">
      <div>
        {goal.description && <h1>{goal.description}</h1>}

        {goal.targetValue && <p>{goal.targetValue}</p>}

        {goal.currentValue && <p>{goal.currentValue}</p>}

        {goal.targetDate && <p>{goal.targetDate}</p>}

        {goal.stats && <p>{goal.stats}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                // eslint-disable-next-line no-restricted-globals
                !confirm('Please confirm you want to delete this goal.')
              ) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}
