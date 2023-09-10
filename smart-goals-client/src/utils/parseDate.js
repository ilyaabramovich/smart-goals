import { format, parseISO } from 'date-fns'

export function formatDateString(dateString) {
  return format(parseISO(dateString), 'yyyy-MM-dd')
}
