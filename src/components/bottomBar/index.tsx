import { useNavigate } from 'react-router-dom'

import { BottomBar as BottomBarQuantun } from '@quantun/core'
import { IconLogout, IconMoonStars, IconSettings, IconSun } from '@tabler/icons-react'
import { Flex, Image, useMantineTheme } from '@mantine/core'

import { routes } from 'components/sidebar/static'
import { useAppStore } from 'store/app/app'
import { useAuthStore } from 'store/auth/auth'

import LogoWhite from 'assets/logo/logo.svg'

export function BottomBar() {
  const _navigate = useNavigate()
  const { logout } = useAuthStore()
  const { theme, setTheme } = useAppStore()
  const { colors } = useMantineTheme()

  function onPress(path: string) {
    _navigate(path)
  }

  return (
    <BottomBarQuantun highlightColor={colors.green[6]}>
      {routes?.map(({ label, icon, path }) => (
        <BottomBarQuantun.Item
          key={label}
          icon={icon}
          path={path}
          onPress={() => onPress(path)}
          selected={window.location.pathname === path}
        >
          {label}
        </BottomBarQuantun.Item>
      ))}
      <BottomBarQuantun.Item
        icon={theme === 'dark' ? IconSun : IconMoonStars}
        onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </BottomBarQuantun.Item>
      <BottomBarQuantun.Item icon={IconSettings} onPress={() => _navigate('/configurations')}>
        Configurations
      </BottomBarQuantun.Item>
      <BottomBarQuantun.Item icon={IconLogout} onPress={logout}>
        Logout
      </BottomBarQuantun.Item>
      <BottomBarQuantun.Menu
        header={
          <Flex justify="center" style={{ flex: 1, width: 'calc(100% - 25px)' }}>
            <Image src={LogoWhite} alt="Logo do Coinkeeper" style={{ width: 120 }} />
          </Flex>
        }
      />
    </BottomBarQuantun>
  )
}
