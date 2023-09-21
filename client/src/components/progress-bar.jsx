export default function ProgressBar({ now }) {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        role="progressbar"
        aria-valuenow={now}
        aria-valuemin={0}
        aria-valuemax={100}
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full transition-width ease delay-600"
        style={{ width: `${Math.min(now, 100)}%` }}
      >
        <span className="d-block p-1">{now}%</span>
      </div>
    </div>
  )
}
