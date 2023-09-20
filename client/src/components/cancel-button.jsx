import { useNavigate } from 'react-router'

export default function CancelButton() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => {
        navigate(-1)
      }}
    >
      Cancel
    </button>
  )
}
