import { useAuthStore } from '@/store/auth/auth'

export function LoginForm() {
  const login = useAuthStore.getState().login

  return (
    <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full mt-8 sm:mt-0 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Bem vindo de volta!</h2>
          <p className="mt-2 text-sm text-gray-500">Acesse sua conta para continuar</p>
        </div>
        <div>
          <button
            onClick={login}
            className="w-full flex justify-center bg-gradient-to-r from-emerald-500 to-emerald-600  hover:bg-gradient-to-l hover:from-emerald-500 hover:to-emerald-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
          >
            Logar com Google
          </button>
        </div>
      </div>
    </div>
  )
}
