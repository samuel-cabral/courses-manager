'use client'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

interface DateFormatterProps {
  date: string
}

export function DateFormatter({ date }: DateFormatterProps) {
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <time dateTime={date} title={`Timezone: ${browserTimezone}`}>
      {dayjs.utc(date).tz(browserTimezone).format('DD/MM/YYYY HH:mm:ss')}
    </time>
  )
}
