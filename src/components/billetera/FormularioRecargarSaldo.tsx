import { useState, type ChangeEvent } from "react"
import { useBilleteraStore } from "../../stores/billetera.store"

const FormularioRecargarSaldo = () => {

  const { billetera, recargarSaldo } = useBilleteraStore()

  const [cantidad, setCantidad] = useState(0)
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCantidad(e.target.valueAsNumber)
  }

  const handleSubmit = async () => {
    setError('')
    
    if (isNaN(cantidad)) {
      setError('Ingresa un monto a recargar')
      return
    }

    if (cantidad <= 0) {
      setError('El monto debe ser mayor a cero')
      return
    }

    await recargarSaldo({
      documento: billetera?.documento!,
      celular: billetera?.celular!,
      cantidad: cantidad,
    })

    setCantidad(0)
  }

  return (
    <>
      <h2 className='text-xl font-bold text-center text-emerald-500'>
        Realiza una recarga
      </h2>
      <div className="grid grid-cols-1 gap-2">
        <label 
          htmlFor="cantidad"
          className="px-2"
        >
          Monto a Recargar:
        </label>
        <input
          id="cantidad" 
          type="number" 
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="1000"
          min={0}
          value={cantidad}
          onChange={handleChange}
        />
        {
          error &&
          (<p className="text-sm text-red-500">{error}</p>)
        }
      </div>

      <button
        className="bg-emerald-500 p-2 w-full text-white cursor-pointer rounded-lg hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
        onClick={handleSubmit}
      >
        Recargar
      </button>
    </>
  )
}

export default FormularioRecargarSaldo
