import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import { Link, Form as RouterForm, useLoaderData, useRevalidator } from 'react-router-dom'
import { getGoalDetails } from '../api/goals'
import { updateStat } from '../api/stats'
import { formatDate } from '../utils/formatDate'
import GoalStatsChart from '../components/goal-stats-chart'

async function loader({ params }) {
  const goal = await getGoalDetails(params.goalId)
  if (!goal) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }
  return { goal }
}

function Goal() {
  const revalidator = useRevalidator()
  const { goal } = useLoaderData()

  function handleSubmit(event, statId) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const measurementValue = formData.get('measurementValue')

    updateStat(goal.id, statId, { measurementValue })
      .catch((error) => console.error(error))
      .then(() => {
        revalidator.revalidate()
      })
  }

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
                <Form onSubmit={(event) => handleSubmit(event, stat.id)}>
                  <Row>
                    <Col>
                      <Form.Control min={0} required type="number" name="measurementValue" defaultValue={0} />
                    </Col>
                    <Col>
                      <Button variant="secondary" type="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
      <GoalStatsChart goal={goal} />
      <Row className="mt-2 align-items-baseline justify-content-end">
        <Col sm="auto">
          <Link to="edit">Edit</Link>
        </Col>
        <Col sm="auto">
          <RouterForm
            className="mt-2"
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
        </Col>
      </Row>
    </>
  )
}

Goal.loader = loader
export default Goal
