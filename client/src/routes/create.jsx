import { redirect, useActionData } from "react-router-dom";
import { createGoal } from "../api/goals";
import GoalForm from "../components/goal-form";

async function action({ request }) {
  const formData = await request.formData();
  const goalData = Object.fromEntries(formData);
  const { goal, errors } = await createGoal(goalData);
  if (errors) {
    return errors;
  }

  return redirect(`/goals/${goal.id}`);
}

function CreateGoal() {
  const errors = useActionData();

  return (
    <>
      <h1 className="fs-4 mb-4">New goal</h1>
      <GoalForm errors={errors} />
    </>
  );
}

CreateGoal.action = action;
export default CreateGoal;
