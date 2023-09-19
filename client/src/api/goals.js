import { deepSnakeCase } from '../utils/deepSnakeCase'

export async function getGoals() {
  const res = await fetch('/api/v1/goals')
  if (!res.ok) {
    throw res
  }

  return await res.json()
}

export async function createGoal(goalData) {
  const res = await fetch('/api/v1/goals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deepSnakeCase({ goal: goalData })),
  })
  if (!res.ok) {
    throw res
  }

  return await res.json()
}

export async function getGoal(id) {
  const res = await fetch(`/api/v1/goals/${id}`)
  if (!res.ok) {
    throw res
  }

  return await res.json()
}

export async function getGoalDetails(id) {
  const res = await fetch(`/api/v1/goals/${id}/details`)
  if (!res.ok) {
    throw res
  }

  return await res.json()
}

export async function updateGoal(id, goalData) {
  const res = await fetch(`/api/v1/goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deepSnakeCase({ goal: goalData })),
  })
  if (!res.ok) {
    throw res
  }

  return { ok: true }
}

export async function deleteGoal(id) {
  await fetch(`/api/v1/goals/${id}`, { method: 'DELETE' })
}
