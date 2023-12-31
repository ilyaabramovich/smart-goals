import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { useEffect, useRef, useState } from "react";

export default function SignUp() {
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData);

    setError(null);
    setErrors({});
    setIsSubmitting(true);
    try {
      const { errors } = await signup(userData);
      if (errors) {
        setErrors(errors);
        return;
      }

      navigate("/goals", { replace: true });
    } catch (error) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="auth-form">
        <h1 className="fs-4 mb-4">Sign up</h1>
        <Form.Group as="section" className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            ref={ref}
            name="username"
            autoComplete="username"
            isInvalid={errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as="section" className="mb-3" controlId="new-password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            autoComplete="new-password"
          />
        </Form.Group>
        <Button
          variant="primary"
          disabled={isSubmitting}
          type="submit"
          className="me-2"
        >
          Sign up
        </Button>
        {error && (
          <Alert className="mt-4" variant="danger">
            {error.message}
          </Alert>
        )}
      </Form>
      <p className="text-center mt-4 text-secondary">
        <span>
          Already have an account? <Link to="/signin">Sign in</Link>
        </span>
      </p>
    </>
  );
}
