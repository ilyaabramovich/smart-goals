import { deepSnakeCase } from "../utils/deepSnakeCase";

export async function updateStat(goalId, statId, statData) {
  const res = await fetch(`/api/v1/goals/${goalId}/stats/${statId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deepSnakeCase({ stat: statData })),
  });

  if (!res.ok) {
    if (res.status === 422) {
      const { status, errors } = await res.json();

      if (status === "error") {
        return { errors };
      }
    }

    throw new Error(
      "An error occured while trying to update a stat. Try submitting the form again.",
    );
  }

  return { ok: true, errors: null };
}
