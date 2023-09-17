export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-CA') // yyyy-MM-dd
}
