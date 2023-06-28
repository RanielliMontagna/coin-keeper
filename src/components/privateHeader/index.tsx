import { useNavigate } from 'react-router-dom'

import { AppBar, LinkAppBar, useAppBarStyles } from '@quantun/core'
import {
  Button,
  UnstyledButton,
  Divider,
  Center,
  Box,
  Collapse,
  SimpleGrid,
  Image,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconLogout,
  IconMoonStars,
  IconSun,
  IconChevronDown,
  IconDashboard,
} from '@tabler/icons-react'

import { rotas } from 'components/sidebar/static'
import { useAppStore } from 'store/app/app'
import { useAuthStore } from 'store/auth/auth'

import SmallLogo from 'assets/logo/small-logo.svg'
import Logo from 'assets/logo/logo.svg'

import SmallLogoDark from 'assets/logo/small-logo-dark.svg'
import LogoDark from 'assets/logo/logo-dark.svg'

export function PrivateHeader() {
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(true)

  const { classes, theme } = useAppBarStyles()
  const navigate = useNavigate()

  const { logout } = useAuthStore()
  const { theme: themeApp, setTheme } = useAppStore()

  return (
    <Box>
      <AppBar
        logo={
          <Image
            src={themeApp !== 'dark' ? SmallLogoDark : SmallLogo}
            alt="Coinkeeper's Logo"
            style={{ width: 35 }}
          />
        }
        logoDrawer={
          <Image
            src={themeApp !== 'dark' ? LogoDark : Logo}
            alt="Coinkeeper's Logo"
            style={{ width: 130 }}
          />
        }
        itemsDrawer={
          <>
            <LinkAppBar icon={<IconDashboard />} label="Dashboard" onClick={() => navigate('/')} />

            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>
              {rotas
                .filter((rota) => rota.path !== '/')
                .map((rota) => (
                  <LinkAppBar
                    key={rota.path}
                    label={rota.label}
                    onClick={() => navigate(rota.path)}
                    description={rota.description}
                    icon={<rota.icon />}
                  />
                ))}
            </Collapse>

            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

            <SimpleGrid>
              <Button
                variant="outline"
                leftIcon={themeApp === 'dark' ? <IconSun size="18" /> : <IconMoonStars size="18" />}
                onClick={() => setTheme(themeApp === 'dark' ? 'light' : 'dark')}
              >
                {theme.colorScheme === 'dark' ? 'Light' : 'Dark'} Mode
              </Button>
              <Button color="red" leftIcon={<IconLogout size="18" />} onClick={logout}>
                Logout
              </Button>
            </SimpleGrid>
          </>
        }
      />
    </Box>
  )
}
