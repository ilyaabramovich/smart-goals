import { camelToSnake } from './utils/camelToSnake'

export async function updateStat(goalId, statId, statData) {
  let response
  try {
    response = await fetch(`/api/v1/goals/${goalId}/stats/${statId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(camelToSnake({ stat: statData })),
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
