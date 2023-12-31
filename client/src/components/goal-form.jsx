import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Form as RouterForm } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import CancelButton from "./cancel-button";
import { useEffect, useRef } from "react";

const goalNullObject = {
  description: "",
  targetDate: new Date(),
  initialValue: 0,
  targetValue: 0,
  interval: "daily",
};

export default function GoalForm({ goal = goalNullObject, errors = {} }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <Form as={RouterForm} method="post">
      <Form.Group
        as="section"
        className="mb-3"
        controlId="goal-field-description"
      >
        <Form.Label>Goal description</Form.Label>
        <Form.Control
          ref={ref}
          required
          as="textarea"
          minLength={15}
          rows={3}
          name="description"
          defaultValue={goal.description}
          isInvalid={errors.description}
          aria-describedby="description-help-block"
        />
        <Form.Text id="description-help-block" muted>
          Description must be at least 15 characters long
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </Form.Group>
      <div
        style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}
      >
        <Form.Group
          as="section"
          className="mb-3"
          controlId="goal-field-initial-value"
        >
          <Form.Label>Initial value</Form.Label>
          <Form.Control
            type="number"
            min={0}
            name="initialValue"
            isInvalid={errors.initialValue}
            defaultValue={goal.initialValue}
          />
          <Form.Control.Feedback type="invalid">
            {errors.initialValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as="section"
          className="mb-3"
          controlId="goal-field-target-value"
        >
          <Form.Label>Target value</Form.Label>
          <Form.Control
            required
            type="number"
            min={0}
            name="targetValue"
            isInvalid={errors.targetValue}
            defaultValue={goal.targetValue}
          />
          <Form.Control.Feedback type="invalid">
            {errors.targetValue}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div
        style={{ display: "grid", gap: "1rem", gridTemplateColumns: "2fr 1fr" }}
      >
        <Form.Group
          as="section"
          className="mb-3"
          controlId="goal-field-target-date"
        >
          <Form.Label>Target date</Form.Label>
          <Form.Control
            required
            type="date"
            min={formatDate(goal.targetDate)}
            name="targetDate"
            isInvalid={errors.targetDate}
            defaultValue={formatDate(goal.targetDate)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.targetDate}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as="section"
          className="mb-3"
          controlId="goal-field-interval"
        >
          <Form.Label>Interval</Form.Label>
          <Form.Select
            aria-label="Goal time frame interval"
            name="interval"
            isInvalid={errors.interval}
            defaultValue={goal.interval}
          >
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.interval}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <Button variant="primary" type="submit" className="me-2">
        Save
      </Button>
      <CancelButton />
    </Form>
  );
}
