import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Table from 'react-bootstrap/Table'
import { Link, Form as RouterForm, useFetcher, useLoaderData, useNavigation } from 'react-router-dom'
import { getGoalDetails } from '../api/goals'
import { updateStat } from '../api/stats'
import { formatDate } from '../utils/formatDate'
import GoalStatsChart from '../components/goal-stats-chart'

function loader({ params }) {
  const goal = getGoalDetails(params.goalId)
  if (!goal) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }

  return goal
}

async function action({ params, request }) {
  const formData = await request.formData()
  const statData = Object.fromEntries(formData)
  const stat = await updateStat(params.goalId, params.statId, statData)
  return stat
}

function Goal() {
  const fetcher = useFetcher()
  const navigation = useNavigation()
  const goal = useLoaderData()

  const isSubmittingStat = navigation.formData?.get('measurementValue') != null

  return (
    <>
      <h1 className="fs-4">Goal details</h1>
      <Table borderless>
        <tbody>
          <tr>
            <th>Description</th>
            <td>{goal.description}</td>
          </tr>
          <tr>
            <th>Initial value</th>
            <td>{goal.initialValue}</td>
          </tr>
          <tr>
            <th>Target value</th>
            <td>{goal.targetValue}</td>
          </tr>
          <tr>
            <th>Accumulated value</th>
            <td>{goal.accumulatedValue}</td>
          </tr>
          <tr>
            <th>Target date</th>
            <td>{formatDate(goal.targetDate)}</td>
          </tr>
          <tr>
            <th>Interval</th>
            <td>{goal.interval}</td>
          </tr>
          <tr>
            <th>Goal progress</th>
            <td>
              <ProgressBar now={goal.completionPercentage} label={`${goal.completionPercentage}%`} />
            </td>
          </tr>
        </tbody>
      </Table>
      {goal.pendingStats.length > 0 && (
        <Accordion defaultActiveKey={goal.pendingStats[0].id} className="mb-2">
          {goal.pendingStats.map((stat) => (
            <Accordion.Item eventKey={stat.id} key={stat.id}>
              <Accordion.Header>Enter measurement for {formatDate(stat.measurementDate)}</Accordion.Header>
              <Accordion.Body>
                <Form
                  style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'max-content min-content' }}
                  as={fetcher.Form}
                  action={`stats/${stat.id}`}
                  method="post"
                >
                  <Form.Control min={0} required type="number" name="measurementValue" defaultValue={0} />
                  <Button variant="secondary" type="submit" disabled={isSubmittingStat}>
                    {isSubmittingStat ? 'Submitting' : 'Submit'}
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
      <GoalStatsChart goal={goal} />
      <div
        style={{
          marginTop: '0.5rem',
          display: 'grid',
          gap: '0.5rem',
          gridTemplateColumns: 'min-content min-content',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Link to="edit">Edit</Link>
        <RouterForm
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm('Please confirm you want to delete this goal.')) {
              event.preventDefault()
            }
          }}
        >
          <Button variant="danger" type="submit">
            Delete
          </Button>
        </RouterForm>
      </div>
    </>
  )
}

Goal.loader = loader
Goal.action = action
export default Goal
