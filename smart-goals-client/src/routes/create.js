import { Form as RouterForm, redirect, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { createGoal } from '../goals'

export async function action({ request }) {
  const formData = await request.formData()
  const goalData = Object.fromEntries(formData)
  try {
    const goal = await createGoal(goalData)
    return redirect(`/goals/${goal.id}/edit`)
  } catch (error) {
    console.error(error)
    return null
  }
}

export default function CreateGoal() {
  const navigate = useNavigate()

  return (
    <Form as={RouterForm} method="post">
      <Form.Group className="mb-3" controlId="createGoalDescription">
        <Form.Label>Goal description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createGoalTargetValue">
        <Form.Label>Target value</Form.Label>
        <Form.Control type="number" name="targetValue" placeholder="0" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createGoalTargetDate">
        <Form.Label>Target date</Form.Label>
        <Form.Control type="datetime-local" name="targetDate" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createGoalInterval">
      <Form.Label>Interval</Form.Label>
      <Form.Select aria-label="Goal time frame interval" name="interval">
        <option>Select interval</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" min={0} className='me-2'>
        Save
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={() => {
          navigate(-1)
        }}
      >
        Cancel
      </Button>
    </Form>
  )
}
