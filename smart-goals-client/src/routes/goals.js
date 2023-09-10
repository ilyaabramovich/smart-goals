import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { Link, useLoaderData } from 'react-router-dom'
import { getGoals } from '../goals'

export async function loader() {
  const goals = await getGoals()
  return { goals }
}
export default function Goals() {
  const { goals } = useLoaderData()

  return (
<>
    <Container className='mt-2 mb-4'>
      {goals.length > 0 ? (
        <ListGroup>
          {goals.map((goal) => (
            <ListGroup.Item key={goal.id}>
              <Link to={`/goals/${goal.id}`}>{goal.description}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>You have no goals yet. Go ahead and add one!</p>
      )}
    </Container>
      <Link to={`/goals/new`} variant="primary" type="submit">
        New goal
      </Link>
</>
  )
}
