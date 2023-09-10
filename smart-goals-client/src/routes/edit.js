import { Form as RouterForm, useLoaderData, redirect, useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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
    <Form as={RouterForm} method="post">
      <Form.Group className="mb-3" controlId="createGoalDescription">
        <Form.Label>Goal description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" defaultValue={goal.description} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createGoalTargetValue">
        <Form.Label>Target value</Form.Label>
        <Form.Control type="number" name="targetValue" placeholder="0" defaultValue={goal.targetValue} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createGoalTargetDate">
        <Form.Label>Target date</Form.Label>
        <Form.Control type="date" name="targetDate" defaultValue={format(parseISO(goal.targetDate), 'yyyy-MM-dd')} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createGoalInterval">
      <Form.Label>Interval</Form.Label>
      <Form.Select aria-label="Goal time frame interval" name="interval" defaultValue={goal.interval}>
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
