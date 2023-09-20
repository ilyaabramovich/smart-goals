import { Link, useLoaderData } from 'react-router-dom'
import { getGoals } from '../api/goals'

function loader() {
  const goals = getGoals()
  if (!goals) {
    return []
  }

  return goals
}

function Goals() {
  const goals = useLoaderData()

  return (
    <>
      <h1 className="text-2xl font-bold">My goals</h1>
      {goals.length > 0 ? (
        <ul className="mb-2">
          {goals.map((goal) => (
            <li key={goal.id}>
              <Link to={`${goal.id}`}>
                {goal.description}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-2">You have no goals yet. Go ahead and add one!</p>
      )}
      <Link to="new">
        New goal
      </Link>
    </>
  )
}

Goals.loader = loader
export default Goals
