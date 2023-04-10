import { Link, useNavigate } from 'react-router-dom'

import {
  Header,
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  rem,
  SimpleGrid,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLogout, IconMoonStars, IconSun, IconChevronDown } from '@tabler/icons-react'

import { useStyles } from './styles'
import { rotas } from 'components/sidebar/static'
import { useAppStore } from 'store/app/app'
import { useAuthStore } from 'store/auth/auth'

import SmallLogo from 'assets/logo/small-logo.svg'
import Logo from 'assets/logo/logo.svg'

import SmallLogoDark from 'assets/logo/small-logo-dark.svg'
import LogoDark from 'assets/logo/logo-dark.svg'

export function PrivateHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(true)

  const { classes, theme } = useStyles()
  const navigate = useNavigate()

  const { logout } = useAuthStore()
  const { theme: themeApp, setTheme } = useAppStore()

  const links = rotas
    ?.filter((item) => item.label !== 'Home')
    ?.map((item) => (
      <UnstyledButton
        className={classes.subLink}
        key={item.label}
        onClick={() => {
          navigate(item.path)
          closeDrawer()
        }}
      >
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.label}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ))

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <img
            src={themeApp !== 'dark' ? SmallLogoDark : SmallLogo}
            alt="Logo do Coinkeeper"
            style={{ width: 35 }}
          />

          <Burger opened={drawerOpened} onClick={toggleDrawer} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <img
            src={themeApp !== 'dark' ? LogoDark : Logo}
            alt="Logo do Coinkeeper"
            style={{ width: 130 }}
          />
        }
        zIndex={1000000}
      >
        <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

        <Link className={classes.link} to="/" onClick={closeDrawer}>
          Home
        </Link>

        <UnstyledButton className={classes.link} onClick={toggleLinks}>
          <Center inline>
            <Box component="span" mr={5}>
              Funcionalidades
            </Box>
            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
          </Center>
        </UnstyledButton>
        <Collapse in={linksOpened}>{links}</Collapse>

        <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

        <SimpleGrid>
          <Button
            variant="gradient"
            gradient={{
              from: 'green.6',
              to: 'green.9',
            }}
            leftIcon={themeApp === 'dark' ? <IconSun size="18" /> : <IconMoonStars size="18" />}
            onClick={() => setTheme(themeApp === 'dark' ? 'light' : 'dark')}
          >
            Tema {theme.colorScheme === 'dark' ? 'Claro' : 'Escuro'}
          </Button>
          <Button color="red" leftIcon={<IconLogout size="18" />} onClick={logout}>
            Sair
          </Button>
        </SimpleGrid>
      </Drawer>
    </Box>
  )
}
