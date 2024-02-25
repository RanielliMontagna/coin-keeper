import { useAppStore } from 'store/app/app'
import { Sidebar } from '@quantun/core'

import { Image, useMantineTheme } from '@mantine/core'
import { IconLogout, IconMoonStars, IconSettings, IconSun } from '@tabler/icons-react'

import { routes } from './static'

import { useAuthStore } from 'store/auth/auth'
import { useNavigate } from 'react-router-dom'

import SmallLogoWhite from 'assets/logo/small-logo.svg'
import SmallLogoBlack from 'assets/logo/small-logo-dark.svg'
import LogoWhite from 'assets/logo/logo.svg'
import LogoBlack from 'assets/logo/logo-dark.svg'

export function SideBar() {
  const { colors } = useMantineTheme()
  const { logout } = useAuthStore()
  const { theme, setTheme } = useAppStore()

  const navigate = useNavigate()

  return (
    <Sidebar.Root>
      <Sidebar.Header>
        <Image
          src={theme === 'dark' ? SmallLogoWhite : SmallLogoBlack}
          alt="Logo do Coinkeeper"
          style={{ width: 40 }}
        />
        <Image
          src={theme === 'dark' ? LogoWhite : LogoBlack}
          alt="Logo do Coinkeeper"
          style={{ width: 120 }}
        />
      </Sidebar.Header>
      {routes.map(({ label, path, icon }) => (
        <Sidebar.Item
          key={path}
          icon={icon}
          label={label}
          onClick={() => navigate(path)}
          path={path}
          activecolor={theme === 'dark' ? colors.green[5] : colors.green[6]}
        />
      ))}
      <Sidebar.FooterItem
        icon={theme === 'dark' ? IconSun : IconMoonStars}
        label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <Sidebar.FooterItem
        icon={IconSettings}
        label="Configurations"
        onClick={() => navigate('/configurations')}
      />
      <Sidebar.FooterItem icon={IconLogout} label="Logout" onClick={logout} />
    </Sidebar.Root>
  )
}
