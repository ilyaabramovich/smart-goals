import ListGroup from "react-bootstrap/ListGroup";
import { Link, useLoaderData } from "react-router-dom";
import { getGoals } from "../api/goals";

function loader() {
  const goals = getGoals();
  if (!goals) {
    return [];
  }

  return goals;
}

function Goals() {
  const goals = useLoaderData();

  return (
    <>
      <h1 className="fs-4 mb-4">My goals</h1>
      {goals.length > 0 ? (
        <ListGroup as="ul" className="mb-2">
          {goals.map((goal) => (
            <ListGroup.Item as="li" key={goal.id}>
              <Link
                to={`${goal.id}`}
                className="link-underline link-underline-opacity-0 d-block"
              >
                {goal.description}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="mb-2">You have no goals yet. Go ahead and add one!</p>
      )}
      <Link className="link-primary" to="new">
        New goal
      </Link>
    </>
  );
}

Goals.loader = loader;
export default Goals;
