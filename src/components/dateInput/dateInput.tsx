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
        <IconCalendar
          size={18}
          onClick={() => {
            ref.current?.focus()
          }}
        />
      }
      {...props}
    />
  )
}
