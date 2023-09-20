import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Header from '../components/header'

export default function RootBoundary() {
  const error = useRouteError()

  const getErrorMessage = (err) => {
    if (isRouteErrorResponse(err)) {
      if (err.status === 404) {
        return 'This page does not exist!'
      }

      if (err.status === 401) {
        return 'You are not authorized to see this'
      }
    }

    if (err instanceof Error) {
      return err.message
    }

    return 'Something went wrong'
  }

  return (
    <>
      <Header />
      <main className="my-4">
        <h1 className="text-2xl font-bold text-danger">Application error</h1>
        <p className="mb-2 text-danger">
          {getErrorMessage(error)}
        </p>
      </main>
    </>
  )
}
