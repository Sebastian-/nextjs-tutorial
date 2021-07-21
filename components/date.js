import { parseISO, format } from 'date-fns'

export default function FormattedDate({ dateString, formatString }) {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>
      {format(date, formatString || 'LLLL d, yyyy')}
    </time>
  )
}
