import { Link, useNavigate } from 'react-router-dom'

import { Group, Button, Divider, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { AppBar, useAppBarStyles, LinkAppBar } from '@quantun/core'
import { IconBrandGoogle } from '@tabler/icons-react'

import { useAuthStore } from 'store/auth/auth'

import Logo from 'assets/logo/logo.svg'
import LogoDark from 'assets/logo/logo-dark.svg'

export function PublicHeader() {
  const _navigate = useNavigate()
  const { classes, theme } = useAppBarStyles()
  const { login } = useAuthStore()
  const menorQueMd = useMediaQuery('(max-width: 768px)')

  return (
    <Box>
      <AppBar
        logo={
          <img
            src={theme.colorScheme !== 'dark' ? LogoDark : Logo}
            alt="Logo do Coinkeeper"
            style={{ width: 135 }}
          />
        }
        customSpace={{
          center: (
            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <Link to="/" className={classes.link}>
                Login
              </Link>
              <Link to="/termos" className={classes.link}>
                Termos de Serviço
              </Link>
              <Link to="/privacidade" className={classes.link}>
                Política de Privacidade
              </Link>
            </Group>
          ),
          right: (
            <Group className={classes.hiddenMobile}>
              <Button color="green" leftIcon={<IconBrandGoogle size={18} />} onClick={login}>
                Entrar com o Google
              </Button>
            </Group>
          ),
        }}
        itemsDrawer={
          menorQueMd && (
            <>
              <LinkAppBar label="Login" onClick={() => {}} />
              <LinkAppBar label="Termos de Serviço" onClick={() => _navigate('/termos')} />
              <LinkAppBar
                label="Política de Privacidade"
                onClick={() => _navigate('/privacidade')}
              />
              <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
              <Group position="center" grow pb="xl" px="md">
                <Button color="green" leftIcon={<IconBrandGoogle size={18} />} onClick={login}>
                  Entrar com o Google
                </Button>
              </Group>
            </>
          )
        }
      />
    </Box>
  )
}
