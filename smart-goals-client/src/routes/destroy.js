import { redirect } from "react-router-dom";
import { deleteGoal } from "../goals";

export async function action({ params }) {
  await deleteGoal(params.goalId);
  return redirect("/");
}