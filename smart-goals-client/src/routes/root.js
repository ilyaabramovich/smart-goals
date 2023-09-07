import { Outlet, Link, Form, useLoaderData, redirect } from 'react-router-dom'
import { createGoal, getGoals } from '../goals'

export async function loader() {
  const goals = await getGoals()
  return { goals }
}

export async function action() {
  const goal = await createGoal()
  return redirect(`/goals/${goal.id}/edit`)
}

export default function Root() {
  const { goals } = useLoaderData()

  return (
    <>
      <div id="sidebar">
        <h1>SMART Goals</h1>
        <div>
          <form id="search-form" role="search">
            <input id="q" aria-label="Search goals" placeholder="Search" type="search" name="q" />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>
        <nav>
          {goals.length ? (
            <ul>
              {goals.map((goal) => (
                <li key={goal.id}>
                  <Link to={`goals/${goal.id}`}>{goal.id}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No goals</i>
            </p>
          )}
        </nav>
        <Form method="post">
          <button type="submit">New</button>
        </Form>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}
