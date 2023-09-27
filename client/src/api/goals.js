import { deepSnakeCase } from "../utils/deepSnakeCase";

export async function getGoals() {
  const res = await fetch("/api/v1/goals");

  if (!res.ok) {
    throw res;
  }

  return await res.json();
}

export async function createGoal(goalData) {
  const res = await fetch("/api/v1/goals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deepSnakeCase({ goal: goalData })),
  });

  if (!res.ok) {
    if (res.status === 422) {
      const { status, errors } = await res.json();

      if (status === "error") {
        return { goal: null, errors };
      }
    }

    throw new Error(
      "An error occured while trying to create new goal. Try submitting the form again.",
    );
  }

  const goal = await res.json();
  return { goal, errors: null };
}

export async function getGoal(id) {
  const res = await fetch(`/api/v1/goals/${id}`);

  if (!res.ok) {
    throw res;
  }

  return await res.json();
}

export async function updateGoal(id, goalData) {
  const res = await fetch(`/api/v1/goals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deepSnakeCase({ goal: goalData })),
  });

  if (!res.ok) {
    if (res.status === 422) {
      const { status, errors } = await res.json();

      if (status === "error") {
        return { errors };
      }
    }

    throw new Error(
      "An error occured while trying to update a goal. Try submitting the form again.",
    );
  }

  return { ok: true, errors: null };
}

export async function deleteGoal(id) {
  await fetch(`/api/v1/goals/${id}`, { method: "DELETE" });
}

export async function getGoalDetails(id) {
  const res = await fetch(`/api/v1/goals/${id}/details`);

  if (!res.ok) {
    throw res;
  }

  return await res.json();
}
