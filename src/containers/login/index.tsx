import { useNavigate } from 'react-router-dom'

import { Grid, Image, Text, Title } from '@mantine/core'
import { LoginScreen, LoginTypeEnum } from '@quantun/login-screen'

import { useAuthStore } from 'store/auth/auth'

import Illustration from 'assets/login/illustration.svg'
import Logo from 'assets/logo/logo.svg'
import { getLocal } from 'helpers/localStorage'

export default function Login() {
  const { login } = useAuthStore()
  const _navigate = useNavigate()

  return (
    <LoginScreen
      initialValues={{ email: getLocal('email') || '' }}
      loginType={LoginTypeEnum.EMAIL}
      welcomeContent={
        <>
          <Image src={Logo} alt="Coinkeeper's Logo" style={{ width: 300 }} />
          <Grid>
            <Image
              src={Illustration}
              style={{
                width: '80%',
                maxWidth: 350,
              }}
            />
          </Grid>
          <Grid style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
            <Title order={3}>Take control of your personal finances with Coinkeeper!</Title>
            <Text size="md" color="gray.6">
              Keep your money safe and organized at all times
            </Text>
          </Grid>
        </>
      }
      beforeLoginContent={
        <>
          <Title order={3}>Welcome to Coinkeeper!</Title>
          <Text size="sm" color="gray.6">
            You are one step away from starting to organize your personal finances.
          </Text>
        </>
      }
      onLogin={login}
      onRegister={() => {
        _navigate('/register')
      }}
    />
  )
}
