import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { action as destroyAction } from "./routes/destroy";

import Goal from "./routes/goal";
import EditGoal from "./routes/edit";
import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";
import Goals from "./routes/goals";
import CreateGoal from "./routes/create";
import Home from "./routes/home";
import Layout from "./routes/layout";
import ProtectedRoute from "./routes/protected";
import RootBoundary from "./routes/root-boundary";
import Missing from "./routes/missing";
import { AuthProvider } from "./providers/auth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RootBoundary />}>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route index element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="goals" element={<Goals />} loader={Goals.loader} />
        <Route
          path="goals/new"
          element={<CreateGoal />}
          action={CreateGoal.action}
        />
        <Route path="goals/:goalId" element={<Goal />} loader={Goal.loader}>
          <Route path="stats/:statId" action={Goal.action} />
        </Route>
        <Route
          path="goals/:goalId/edit"
          element={<EditGoal />}
          loader={EditGoal.loader}
          action={EditGoal.action}
        />
        <Route path="goals/:goalId/destroy" action={destroyAction} />
      </Route>
      <Route path="*" element={<Missing />} />
    </Route>,
  ),
);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
