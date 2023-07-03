import { Text, Tooltip } from '@mantine/core'

export function DescriptionRowRender({ description }: { description: string }) {
  return (
    <Tooltip
      label={description}
      multiline
      maw={300}
      withArrow
      position="top-start"
      openDelay={1000}
    >
      <Text
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: '95%',
          whiteSpace: 'nowrap',
        }}
      >
        {description}
      </Text>
    </Tooltip>
  )
}
