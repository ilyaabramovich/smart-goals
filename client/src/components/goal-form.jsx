import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Form as RouterForm } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import CancelButton from './cancel-button'
import { useEffect, useRef } from 'react'

const goalNullObject = {
  description: '',
  targetDate: new Date(),
  initialValue: 0,
  targetValue: 0,
  interval: 'daily'
}

export default function GoalForm({ goal = goalNullObject }) {
  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return (
    <Form as={RouterForm} method="post">
      <Form.Group className="mb-3" controlId="goal-field-description">
        <Form.Label>Goal description</Form.Label>
        <Form.Control ref={ref} required as="textarea" minLength={15} rows={3} name="description" defaultValue={goal.description} placeholder='minimum 15 letters' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="goal-field-initial-value">
        <Form.Label>Initial value</Form.Label>
        <Form.Control type="number" min={0} name="initialValue" defaultValue={goal.initialValue} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="goal-field-target-value">
        <Form.Label>Target value</Form.Label>
        <Form.Control required type="number" min={0} name="targetValue" defaultValue={goal.targetValue} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="goal-field-target-date">
        <Form.Label>Target date</Form.Label>
        <Form.Control required type="date" min={formatDate(new Date())} name="targetDate" defaultValue={formatDate(goal.targetDate)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="goal-field-interval">
        <Form.Label>Interval</Form.Label>
        <Form.Select aria-label="Goal time frame interval" name="interval" defaultValue={goal.interval}>
          <option value="daily">daily</option>
          <option value="weekly">weekly</option>
          <option value="monthly">monthly</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" className="me-2">
        Save
      </Button>
      <CancelButton />
    </Form>
  )
}
