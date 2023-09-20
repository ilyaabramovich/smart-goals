import { Form } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import CancelButton from './cancel-button'
import { useEffect, useRef } from 'react'

const goalNullObject = {
  description: '',
  targetDate: new Date().setDate(new Date().getDate() + 1),
  initialValue: 0,
  targetValue: 0,
  interval: 'daily',
}

export default function GoalForm({ goal = goalNullObject }) {
  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return (
    <Form method="post">
      <section className="mb-3" id="goal-field-description">
        <label>Goal description</label>
        <textarea
          ref={ref}
          required
          minLength={15}
          rows={3}
          name="description"
          defaultValue={goal.description}
          placeholder="minimum 15 letters"
        />
      </section>
      <section className="mb-3" id="goal-field-initial-value">
        <label>Initial value</label>
        <input type="number" min={0} name="initialValue" defaultValue={goal.initialValue} />
      </section>
      <section className="mb-3" id="goal-field-target-value">
        <label>Target value</label>
        <input required type="number" min={0} name="targetValue" defaultValue={goal.targetValue} />
      </section>
      <section className="mb-3" id="goal-field-target-date">
        <label>Target date</label>
        <input
          required
          type="date"
          min={formatDate(new Date())}
          name="targetDate"
          defaultValue={formatDate(goal.targetDate)}
        />
      </section>
      <section className="mb-3" id="goal-field-interval">
        <label>Interval</label>
        <select aria-label="Goal time frame interval" name="interval" defaultValue={goal.interval}>
          <option value="daily">daily</option>
          <option value="weekly">weekly</option>
          <option value="monthly">monthly</option>
        </select>
      </section>
      <button type="submit" className="me-2">
        Save
      </button>
      <CancelButton />
    </Form>
  )
}
