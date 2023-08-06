import { useNavigate } from 'react-router-dom'

import { Grid, Image, Text, Title } from '@mantine/core'
import { RegisterScreen } from '@quantun/register-screen'

import Illustration from 'assets/login/illustration.svg'
import Logo from 'assets/logo/logo.svg'
import { useAuthStore } from 'store/auth/auth'

export default function Register() {
  const { register } = useAuthStore()
  const _navigate = useNavigate()

  return (
    <RegisterScreen
      onRegister={register}
      onLogin={() => _navigate('/login')}
      welcomeContent={
        <>
          <Image src={Logo} alt="Logo do Coinkeeper" style={{ width: 300 }} />
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
      beforeRegisterContent={
        <>
          <Title order={3}>Register now</Title>
          <Text size="sm" color="gray.6">
            Start organizing your personal finances with Coinkeeper today!
          </Text>
        </>
      }
    />
  )
}
