import { DateInput as MantineDateInput, DateInputProps } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'
import React from 'react'

interface IDateInputProps extends DateInputProps {}

export function DateInput(props: IDateInputProps) {
  const ref = React.useRef<HTMLInputElement>(null)

  return (
    <MantineDateInput
      ref={ref}
      valueFormat="DD/MM/YYYY"
      rightSection={
        <button
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          data-testid="calendar-icon"
          onClick={() => {
            ref.current?.focus()
          }}
        >
          <IconCalendar size={18} />
        </button>
      }
      {...props}
    />
  )
}
