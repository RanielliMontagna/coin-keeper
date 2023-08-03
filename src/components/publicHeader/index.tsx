import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Group, Button, Divider, Box, Image } from '@mantine/core'
import { AppBar, useAppBarStyles, LinkAppBar } from '@quantun/core'
import { IconLogout } from '@tabler/icons-react'

import Logo from 'assets/logo/logo.svg'
import LogoDark from 'assets/logo/logo-dark.svg'
import { useIsMobile } from 'hooks/useIsMobile'

export function PublicHeader() {
  const _navigate = useNavigate()
  const { classes, theme } = useAppBarStyles()
  const { pathname } = useLocation()
  const { isMobile } = useIsMobile()

  const _login = () => _navigate('/login')

  return (
    <Box>
      <AppBar
        logo={
          <Image
            src={theme.colorScheme !== 'dark' ? LogoDark : Logo}
            alt="Coinkeeper's Logo"
            style={{ width: 135 }}
          />
        }
        customSpace={{
          center: (
            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <Link
                to="/terms"
                className={classes.link}
                style={{
                  backgroundColor: pathname === '/terms' ? theme.colors.green[9] : 'transparent',
                }}
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className={classes.link}
                style={{
                  backgroundColor: pathname === '/privacy' ? theme.colors.green[9] : 'transparent',
                }}
              >
                Privacy Policy
              </Link>
            </Group>
          ),
          right: (
            <Group className={classes.hiddenMobile}>
              <Button color="green" leftIcon={<IconLogout size={18} />} onClick={_login}>
                Login
              </Button>
            </Group>
          ),
        }}
        itemsDrawer={
          isMobile && (
            <>
              <LinkAppBar label="Terms of Service" onClick={() => _navigate('/terms')} />
              <LinkAppBar label="Privacy Policy" onClick={() => _navigate('/privacy')} />
              <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
              <Group position="center" grow pb="xl" px="md">
                <Button color="green" leftIcon={<IconLogout size={18} />} onClick={_login}>
                  Login
                </Button>
              </Group>
            </>
          )
        }
      />
    </Box>
  )
}
