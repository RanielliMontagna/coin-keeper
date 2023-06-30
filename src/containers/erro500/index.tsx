import { Button, Flex, Group, Image, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

import Erro500Image from 'assets/erro/erro500.svg'

export default function Erro500() {
  const navigate = useNavigate()

  function handleBack() {
    navigate('/')
  }

  return (
    <Flex direction="column" justify="center" align="center" style={{ height: '100vh' }} gap={16}>
      <Image
        src={Erro500Image}
        style={{
          width: '100%',
          maxWidth: 400,
        }}
      />
      <Flex direction="column" align="center">
        <Title>Something went wrong</Title>
        <Text color="dimmed" align="center">
          We are working on fixing this issue, please try again later.
        </Text>
      </Flex>
      <Group position="center">
        <Button size="md" onClick={handleBack}>
          Go back to home page
        </Button>
      </Group>
    </Flex>
  )
}
