import { Button, Container, Group, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Illustration } from './illustration'
import { useStyles } from './styles'

export function Erro404() {
  const { classes } = useStyles()
  const navigate = useNavigate()

  function handleVoltar() {
    navigate('/')
  }

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Página não encontrada</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            A página que você está procurando pode ter sido removida ou não está
            mais disponível. Tente voltar para a página inicial.
          </Text>
          <Group position="center">
            <Button size="md" onClick={handleVoltar}>
              Voltar para a página inicial
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  )
}
