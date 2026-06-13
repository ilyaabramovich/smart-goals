import { redirect, useActionData, useNavigation, Form } from "react-router-dom";
import { generateGoal } from "../api/goals";

async function action({ request }) {
  const formData = await request.formData();
  const prompt = formData.get("prompt");
  const { goal, errors } = await generateGoal(prompt);
  if (errors) {
    return errors;
  }

  return redirect(`/goals/${goal.id}`);
}

function GenerateGoal() {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const errorMessages = errors ? Object.values(errors) : [];

  return (
    <>
      <h1 className="fs-4 mb-4">Create goal with AI</h1>
      <Form method="post">
        {errorMessages.length > 0 && (
          <div className="alert alert-danger">
            {errorMessages.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="prompt" className="form-label">
            Describe your goal
          </label>
          <textarea
            id="prompt"
            name="prompt"
            className="form-control"
            rows={4}
            placeholder="e.g. Run 500km total by December 31, tracking weekly progress"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create goal"}
        </button>
      </Form>
    </>
  );
}

GenerateGoal.action = action;
export default GenerateGoal;
