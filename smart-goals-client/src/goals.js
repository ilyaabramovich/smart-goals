import { camelToSnake } from './utils/camelToSnake'

export async function getGoals(query) {
  const res = await fetch(`http://localhost:3000/api/v1/goals`)
  const goals = await res.json()
  if (!goals) return []
  return goals
}

export async function createGoal() {
  const goalData = {
    description: 'My new SMART goal',
    targetDate: new Date(new Date().getFullYear() + 1, 0, 1).toISOString(),
  }
  const res = await fetch(`http://localhost:3000/api/v1/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(camelToSnake({ goal: goalData })),
  })
  const goal = await res.json()
  return goal
}

export async function getGoal(id) {
  const res = await fetch(`http://localhost:3000/api/v1/goals/${id}`)
  const goal = await res.json()
  return goal ?? null
}

export async function updateGoal(id, goalData) {
  const res = await fetch(`http://localhost:3000/api/v1/goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal: goalData }),
  })
  const goal = await res.json()
  return goal
}

export async function deleteGoal(id) {
  await fetch(`http://localhost:3000/api/v1/goals/${id}`, { method: 'DELETE' })
}
