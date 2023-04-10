import { Grid, Text, Title } from '@mantine/core'
import { LoginScreen } from '@quantun/login-screen'

import Illustration from 'assets/login/illustration.svg'
import { useAuthStore } from 'store/auth/auth'

import Logo from 'assets/logo/logo.svg'

export function Login() {
  const { login } = useAuthStore()

  return (
    <LoginScreen
      welcomeContent={
        <>
          <img src={Logo} alt="Logo do Coinkeeper" style={{ width: 300 }} />
          <Grid>
            <img src={Illustration} />
          </Grid>
          <Grid style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
            <Title order={3}>O guardião das suas finanças pessoais.</Title>
            <Text size="md" color="gray.6">
              Seu dinheiro sempre seguro e organizado.
            </Text>
          </Grid>
        </>
      }
      beforeLoginContent={
        <>
          <Title order={3}>Bem-vindo ao Coinkeeper!</Title>
          <Text size="sm" color="gray.6">
            Você está a um passo de começar a organizar suas finanças pessoais.
          </Text>
        </>
      }
      onLogin={login}
    />
  )
}
