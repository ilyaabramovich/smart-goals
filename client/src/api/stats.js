import { deepSnakeCase } from "../utils/deepSnakeCase";

export async function updateStat(goalId, statId, statData) {
  const res = await fetch(`/api/v1/goals/${goalId}/stats/${statId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deepSnakeCase({ stat: statData })),
  });

  if (!res.ok) {
    throw res;
  }

  return { ok: true };
}
