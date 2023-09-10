import { Form as RouterForm, Link, useLoaderData, useFetcher, useRevalidator } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { getGoal } from '../goals'
import { formatDateString } from '../utils/parseDate'
import GoalStatsChart from '../goal-stats-chart'
import { updateStat } from '../stats'

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
    <Container className="mt-2">
      <Table borderless className="mb-4">
        <tbody>
          <tr>
            <th>Description</th>
            <td>{goal.description}</td>
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
          <tr>
            <th>Goal progress</th>
            <td>
              <ProgressBar now={goal.completionPercentage} label={`${goal.completionPercentage}%`} />
            </td>
          </tr>
        </tbody>
      </Table>
      {goal.pendingStats.length > 0 && (
        <Accordion defaultActiveKey={goal.pendingStats[0].id}>
          {goal.pendingStats.map((stat) => (
            <Accordion.Item eventKey={stat.id} key={stat.id}>
              <Accordion.Header>Enter measurement for {formatDateString(stat.measurementDate)}</Accordion.Header>
              <Accordion.Body>
                <Form onSubmit={(event) => handleSubmit(event, stat.id)}>
                  <Row>
                    <Col>
                      <Form.Control type="number" name="measurementValue" placeholder="0" />
                    </Col>
                    <Col>
                      <Button variant="link" type="submit">
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
      {goal.measuredStats.length > 0 && <GoalStatsChart goal={goal} />}
      <Container>
        <Link to="edit">Edit</Link>
        <RouterForm
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
        </RouterForm>
      </Container>
    </Container>
  )
}
