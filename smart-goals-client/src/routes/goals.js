import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLoaderData } from 'react-router-dom'
import { getGoals } from '../api/goals'

export async function loader() {
  const goals = await getGoals()
  return { goals }
}
export default function Goals() {
  const { goals } = useLoaderData()

  return (
    <>
      <div className='mb-2'>
        {goals.length > 0 ? (
          <ListGroup>
            {goals.map((goal) => (
              <ListGroup.Item key={goal.id}>
                <Link to={`${goal.id}`} className="link-underline link-underline-opacity-0">
                  {goal.description}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <span>You have no goals yet. Go ahead and add one!</span>
        )}
      </div>
      <Link to="new">New goal</Link>
    </>
  )
}
