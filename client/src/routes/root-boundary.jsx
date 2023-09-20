import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
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

  const getErrorStack = (err) => {
    if (isRouteErrorResponse(err)) {
      return err.error?.stack
    }
    return err?.stack
  }

  return (
    <>
      <Header />
      <Container as="main" className="my-4">
        <h1 className="fs-4 text-danger">Application error</h1>
        <Alert className="mb-2" variant="danger">
          {getErrorMessage(error)}
        </Alert>
        <code className="selectable" style={{ wordBreak: 'break-word' }}>
          {getErrorStack(error)}
        </code>
      </Container>
    </>
  )
}
