import { useAppStore } from 'store/app/app'
import { Sidebar } from '@quantun/core'

import { Image, useMantineTheme } from '@mantine/core'
import { IconLogout, IconMoonStars, IconSun } from '@tabler/icons-react'

import { rotas } from './static'

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
      {rotas.map((rota) => (
        <Sidebar.Item
          key={rota.path}
          icon={rota.icon}
          label={rota.label}
          onClick={() => navigate(rota.path)}
          path={rota.path}
          activecolor={theme === 'dark' ? colors.green[5] : colors.green[6]}
        />
      ))}
      <Sidebar.FooterItem
        icon={theme === 'dark' ? IconSun : IconMoonStars}
        label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <Sidebar.FooterItem icon={IconLogout} label="Logout" onClick={logout} />
    </Sidebar.Root>
  )
}
