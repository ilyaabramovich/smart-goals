import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

export default function CancelButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="secondary"
      type="button"
      onClick={() => {
        navigate(-1);
      }}
    >
      Cancel
    </Button>
  );
}
