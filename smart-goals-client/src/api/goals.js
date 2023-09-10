import { camelToSnake } from '../utils/camelToSnake'

export async function getGoals(query) {
  const res = await fetch(`/api/v1/goals`)
  const goals = await res.json()
  if (!goals) return []
  return goals
}

export async function createGoal(goalData) {
let response
  try {
    response = await fetch(`/api/v1/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(camelToSnake({ goal: goalData })),
    })
  } catch (error) {
    console.log('There was an error', error)
  }
  let json
  try {
    if (response) {
      json = await response.json()
      if (response?.ok) {
        return json
      } else {
        throw new Error(json?.error || 'Unexpected error')
      }
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log('There was a SyntaxError', error)
    } else {
      console.log('There was an error', error)
      throw error
    }
  }
}

export async function getGoal(id) {
  const res = await fetch(`/api/v1/goals/${id}`)
  const goal = await res.json()
  return goal ?? null
}

export async function updateGoal(id, goalData) {
  const res = await fetch(`/api/v1/goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal: goalData }),
  })
  const goal = await res.json()
  return goal
}

export async function deleteGoal(id) {
  await fetch(`/api/v1/goals/${id}`, { method: 'DELETE' })
}
