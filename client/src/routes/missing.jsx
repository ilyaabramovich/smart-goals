import { Link } from "react-router-dom";

export default function Missing() {
  return (
    <h1 className="fs-4 mb-4">
      The page you requested does not exist. <Link to='/'>Back to homepage</Link>
    </h1>
  )
}
