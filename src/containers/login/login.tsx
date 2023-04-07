import { LoginForm } from './form/form'
import { LoginIntroduction } from './introduction/introduction'

export default function Login() {
  return (
    <div className="relative min-h-screen flex">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <LoginIntroduction />
        <LoginForm />
      </div>
    </div>
  )
}
