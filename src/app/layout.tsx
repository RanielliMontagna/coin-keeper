import './globals.css'

export const metadata = {
  title: {
    default: 'Coin Keeper',
    template: '%s | Coin Keeper',
  },
  description: 'O guardião das suas finanças pessoais',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    description: 'O guardião das suas finanças pessoais',
    title: 'Coin Keeper',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
