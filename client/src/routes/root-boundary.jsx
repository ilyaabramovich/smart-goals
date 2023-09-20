import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page does not exist!</div>;
    }

    if (error.status === 401) {
      return <div>You are not authorized to see this</div>;
    }
  }

  return <div>Something went wrong</div>;
}