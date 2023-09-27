import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Table from "react-bootstrap/Table";
import {
  Link,
  Form as RouterForm,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { getGoalDetails } from "../api/goals";
import { updateStat } from "../api/stats";
import { formatDate } from "../utils/formatDate";
import GoalStatsChart from "../components/goal-stats-chart";
import { formatRelativeDate } from "../utils/formatRelativeDate";

function loader({ params }) {
  const goal = getGoalDetails(params.goalId);
  if (!goal) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return goal;
}

async function action({ params, request }) {
  const formData = await request.formData();
  const statData = Object.fromEntries(formData);
  const { errors } = await updateStat(params.goalId, params.statId, statData);
  if (errors) {
    return errors;
  }
}

function Goal() {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const goal = useLoaderData();
  const errors = fetcher.data;

  const isSubmittingStat = navigation.formData?.get("measurementValue") != null;

  return (
    <>
      <h1 className="fs-4 mb-4">Goal</h1>
      <div style={{ display: "grid", gap: "1rem" }}>
        <section aria-labelledby="goal-details">
          <h2 className="fs-5" id="goal-details">
            Details
          </h2>
          <Table borderless role="presentation">
            <tbody>
              <tr>
                <td>
                  <strong>Description</strong>
                </td>
                <td>{goal.description}</td>
              </tr>
              <tr>
                <td>
                  <strong>Initial value</strong>
                </td>
                <td>{goal.initialValue}</td>
              </tr>
              <tr>
                <td>
                  <strong>Target value</strong>
                </td>
                <td>{goal.targetValue}</td>
              </tr>
              <tr>
                <td>
                  <strong>Accumulated value</strong>
                </td>
                <td>{goal.accumulatedValue}</td>
              </tr>
              <tr>
                <td>
                  <strong>Target date</strong>
                </td>
                <td>
                  {formatDate(goal.targetDate)} (
                  {formatRelativeDate(goal.daysToComplete)})
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Interval</strong>
                </td>
                <td>{goal.interval}</td>
              </tr>
              <tr>
                <td>
                  <strong>Goal progress</strong>
                </td>
                <td>
                  <ProgressBar
                    now={goal.completionPercentage}
                    label={`${goal.completionPercentage}%`}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </section>
        <section aria-labelledby="goal-actions">
          <h2 className="fs-5" id="goal-actions">
            Actions
          </h2>
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              gridTemplateColumns: "min-content min-content",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Link to="edit">Edit</Link>
            <RouterForm
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (!confirm("Please confirm you want to delete this goal.")) {
                  event.preventDefault();
                }
              }}
            >
              <Button variant="danger" type="submit">
                Delete
              </Button>
            </RouterForm>
          </div>
        </section>
        <section aria-labelledby="goal-stats">
          <h2 className="fs-5">Stats</h2>
          <p className="text-secondary">
            Recorded: {goal.measuredStats.length} / {goal.statsLength}
          </p>
          {goal.pendingStats.length > 0 && (
            <>
              <p className="text-secondary">
                Start tracking your goal progress by recording stat measurements{" "}
                {goal.interval}
              </p>
              <Accordion
                defaultActiveKey={goal.pendingStats[0].id}
                className="mb-2"
              >
                {goal.pendingStats.map((stat) => (
                  <Accordion.Item eventKey={stat.id} key={stat.id}>
                    <Accordion.Header as="h3">
                      Enter measurement for {formatDate(stat.measurementDate)}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Form
                        style={{
                          display: "grid",
                          gap: "0.5rem",
                          gridTemplateColumns: "max-content min-content",
                          alignItems: "start",
                        }}
                        as={fetcher.Form}
                        action={`stats/${stat.id}`}
                        method="post"
                      >
                        <section>
                          <Form.Control
                            min={0}
                            required
                            type="number"
                            name="measurementValue"
                            defaultValue={0}
                            isInvalid={errors?.measurementValue}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.measurementValue}
                          </Form.Control.Feedback>
                        </section>
                        <Button
                          variant="secondary"
                          type="submit"
                          disabled={isSubmittingStat}
                        >
                          {isSubmittingStat ? "Submitting" : "Submit"}
                        </Button>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </>
          )}
          {goal.nearestUpcomingStatDate != null &&
            goal.pendingStats.length === 0 && (
              <p className="text-secondary">
                You are all caught up for now! Next tracking would be available
                at {formatDate(goal.nearestUpcomingStatDate)}
              </p>
            )}
          <GoalStatsChart goal={goal} />
        </section>
      </div>
    </>
  );
}

Goal.loader = loader;
Goal.action = action;
export default Goal;
