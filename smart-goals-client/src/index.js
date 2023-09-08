import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import { action as destroyAction } from './routes/destroy'

import ErrorPage from './error-page'
import Goal, { loader as goalLoader } from './routes/goal'
import EditGoal, { action as editAction } from './routes/edit'
import Index from './routes'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="goals/:goalId"
          element={<Goal />}
          loader={goalLoader}
        />
        <Route
          path="goals/:goalId/edit"
          element={<EditGoal />}
          loader={goalLoader}
          action={editAction}
        />
        <Route
          path="goals/:goalId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
