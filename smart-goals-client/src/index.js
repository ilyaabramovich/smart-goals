import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import Root from './routes/root'
import { action as destroyAction } from './routes/destroy'

import ErrorPage from './error-page'
import Goal, { loader as goalLoader } from './routes/goal'
import EditGoal, { action as editAction } from './routes/edit'
import Index from './routes'
import Login from './routes/login'
import Signup from './routes/signup'
import { AuthProvider } from './context/auth'
import RequireAuth from './require-auth'
import Goals, { loader as goalsLoader, action as goalsAction } from './routes/goals'
import CreateGoal, { action as createAction } from './routes/create';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Root />}>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route errorElement={<ErrorPage />}>
          <Route index element={<Index />} />
          <Route path="goals" element={<RequireAuth><Goals /></RequireAuth>} loader={goalsLoader} action={goalsAction} />
          <Route path="goals/new" element={<RequireAuth><CreateGoal /></RequireAuth>} action={createAction} />
          <Route path="goals/:goalId" element={<RequireAuth><Goal /></RequireAuth>} loader={goalLoader} />
          <Route path="goals/:goalId/edit" element={<RequireAuth><EditGoal /></RequireAuth>} loader={goalLoader} action={editAction} />
          <Route path="goals/:goalId/destroy" action={destroyAction} />
        </Route>
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
