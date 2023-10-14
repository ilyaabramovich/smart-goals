import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
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
import BarChart from "../components/bar-chart";
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
  const { errors, ok } = await updateStat(
    params.goalId,
    params.statId,
    statData,
  );
  if (errors) {
    return errors;
  }

  return ok;
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
      <div
        style={{ display: "grid", gap: "1rem", gridTemplateColumns: "100%" }}
      >
        <section aria-labelledby="goal-details">
          <dl
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
              <dt>Description</dt>
              <dd>{goal.description}</dd>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
              <dt>Initial value</dt>
              <dd>{goal.initialValue}</dd>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
              <dt>Target value</dt>
              <dd>{goal.targetValue}</dd>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
              <dt>Accumulated value</dt>
              <dd>{goal.accumulatedValue}</dd>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
              <dt>Target date</dt>
              <dd>
                {formatDate(goal.targetDate)} (
                {formatRelativeDate(goal.daysToComplete)})
              </dd>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
              <dt>Interval</dt>
              <dd>{goal.interval}</dd>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                alignItems: "baseline",
              }}
            >
              <dt>Goal progress</dt>
              <dd>
                <ProgressBar
                  now={goal.completionPercentage}
                  label={`${goal.completionPercentage}%`}
                />
              </dd>
            </div>
          </dl>
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
            Recorded: {goal.measurementValues.length} / {goal.statsTotal}
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
          <BarChart
            title={goal.description}
            label={`${goal.interval} measurement`}
            data={goal.measurementValues}
            labels={goal.measurementDates}
          />
        </section>
      </div>
    </>
  );
}

Goal.loader = loader;
Goal.action = action;
export default Goal;
