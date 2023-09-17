import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { action as destroyAction } from './routes/destroy'

import ErrorBoundary from './routes/error-boundary'
import Goal, { loader as goalLoader } from './routes/goal'
import EditGoal, { action as editAction } from './routes/edit'
import Login from './routes/login'
import Signup from './routes/signup'
import { AuthProvider } from './context/auth'
import Goals, { loader as goalsLoader } from './routes/goals'
import CreateGoal, { action as createAction } from './routes/create'
import Home from './routes/home'
import Layout from './routes/layout'
import ProtectedRoute from './routes/protected'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route index element={<Home />} />
      <Route errorElement={<ErrorBoundary />} element={<ProtectedRoute />}>
        <Route path="goals" element={<Goals />} loader={goalsLoader} />
        <Route path="goals/new" element={<CreateGoal />} action={createAction} />
        <Route path="goals/:goalId" element={<Goal />} loader={goalLoader} />
        <Route path="goals/:goalId/edit" element={<EditGoal />} loader={goalLoader} action={editAction} />
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
