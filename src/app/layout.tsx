import './globals.css'

export const metadata = {
  title: 'Coin Keeper',
  description: 'O guardião das suas finanças pessoais',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
