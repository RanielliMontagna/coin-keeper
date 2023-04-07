import './introduction.module.css'

export function LoginIntroduction() {
  return (
    <div
      className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1637169797848-12431f1d355c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGNhc2h8ZW58MHx8MHx8&w=1000&q=80)',
      }}
    >
      <div className="absolute bg-gradient-to-b from-emerald-600 to-emerald-500 opacity-75 inset-0 z-0"></div>
      <div className="w-full  max-w-md z-10">
        <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Coinkeeper</div>
        <div className="sm:text-md xl:text-lg text-gray-200 font-normal">
          Gerencie suas economias com facilidade e proteja seu dinheiro com Coin Keeper, o
          aplicativo de controle financeiro que ajuda você a manter suas finanças em ordem.
          <br /> Com Coin Keeper, você pode controlar seus gastos, economizar dinheiro e atingir
          seus objetivos financeiros com mais facilidade.
        </div>
      </div>
      <ul className="circles">
        {new Array(10).fill(0).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  )
}
