import { IconDashboard, IconCategory, IconTransferIn, IconBuildingBank } from '@tabler/icons-react'

export const rotas = [
  {
    icon: IconDashboard,
    label: 'Dashboard',
    description: 'Home page of the application',
    path: '/',
  },
  {
    icon: IconBuildingBank,
    label: 'Accounts',
    description: 'Overview of your accounts',
    path: '/accounts',
  },
  {
    icon: IconTransferIn,
    label: 'Transactions',
    description: 'Register your transactions',
    path: '/transactions',
  },
  {
    icon: IconCategory,
    label: 'Categories',
    description: 'Organize your transactions by categories',
    path: '/categories',
  },
]
