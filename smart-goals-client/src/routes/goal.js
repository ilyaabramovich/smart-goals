import { Form, Link, useLoaderData } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { getGoal } from '../goals'
import { formatDateString } from '../utils/parseDate'
import GoalStatsChart from '../goal-stats-chart'

export async function loader({ params }) {
  const goal = await getGoal(params.goalId)
  if (!goal) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }
  return { goal }
}

export default function Goal() {
  const { goal } = useLoaderData()

  return (
    <Container className="mt-2">
      <Table borderless className="mb-4">
        <tbody>
        <tr>
          <th>Description</th>
          <td>
            {goal.description}
          </td>
        </tr>
        <tr>
          <th>Target value</th>
          <td>{goal.targetValue}</td>
        </tr>
        <tr>
          <th>Current value</th>
          <td>{goal.currentValue}</td>
        </tr>
        <tr>
          <th>Target date</th>
          <td>{formatDateString(goal.targetDate)}</td>
        </tr>
        </tbody>
      </Table>
      {goal.stats.length > 0 && (
        <GoalStatsChart goal={goal} />
      )}
      <Container>
        <Link to="edit">Edit</Link>
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
          <Button variant="danger" type="submit">
            Delete
          </Button>
        </Form>
      </Container>
    </Container>
  )
}
