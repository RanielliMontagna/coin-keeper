import { Button, Container, Group, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Illustration } from './illustration'
import { useStyles } from './styles'

export default function Erro404() {
  const { classes } = useStyles()
  const navigate = useNavigate()

  function handleBack() {
    navigate('/')
  }

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Page not found</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            The page you are looking for may have been removed or is no longer available.
          </Text>
          <Group position="center">
            <Button size="md" onClick={handleBack}>
              Go back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  )
}
