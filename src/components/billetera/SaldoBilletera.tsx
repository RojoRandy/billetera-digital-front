import { formatCurrency } from "../../lib/currency"

type SaldoBilleteraProps = {
  documento: string,
  nombres: string,
  celular: string,
  cantidad: number
}

const SaldoBilletera = ({ nombres, documento, celular, cantidad }: SaldoBilleteraProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg p-4 gap-4">
      <div className="space-y-2">
        <h2 className='text-xl font-bold text-center'>
          Bienvenido
        </h2>
        <h3 className="text-lg text-center text-emerald-500 uppercase"> {nombres}</h3>
        <p className="font-bold">Documento: <span className="font-normal">{documento}</span></p>
        <p className="font-bold">Celular: <span className="font-normal">{celular}</span></p>
      </div>
      <div className='bg-emerald-500 flex flex-col justify-center items-center rounded-md py-4'>
        <h2 className='text-3xl font-bold text-center text-white'>
          { formatCurrency(cantidad)}
        </h2>
        <h3 className="text-sm text-center">Saldo Disponible</h3>
      </div>
    </div>
  )
}

export default SaldoBilletera
