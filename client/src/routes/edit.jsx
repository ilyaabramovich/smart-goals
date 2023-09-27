import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { getGoal, updateGoal } from "../api/goals";
import GoalForm from "../components/goal-form";

function loader({ params }) {
  const goal = getGoal(params.goalId);
  if (!goal) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return goal;
}

async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const { errors } = await updateGoal(params.goalId, updates);
  if (errors) {
    return errors;
  }

  return redirect(`/goals/${params.goalId}`);
}

function EditGoal() {
  const goal = useLoaderData();
  const errors = useActionData();

  return (
    <>
      <h1 className="fs-4 mb-4">Edit goal</h1>
      <GoalForm goal={goal} errors={errors} />
    </>
  );
}

EditGoal.action = action;
EditGoal.loader = loader;
export default EditGoal;
