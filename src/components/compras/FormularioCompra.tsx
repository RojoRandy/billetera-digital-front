import { useState, type ChangeEvent } from "react"
import type { Compra } from "../../types/compra.type"
import { useCompraStore } from "../../stores/compra.store"
import { toast } from "react-toastify"

const FormularioCompra = () => {

  const { registrarCompra } = useCompraStore()

  const initialState: Compra = {
    documento: '',
    total: 0
  }

  const [compra, setCompra] = useState<Compra>(initialState);
  const [error, setError] = useState<Record<string, string>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isNumber = ['total'].includes(e.target.id)

    setCompra({
      ...compra,
      [e.target.id]: isNumber ? +e.target.value: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!compra.documento) {
      setError({
        documento: 'Ingresar el documento del cliente'
      });
      return
    }

    if (isNaN(compra.total)) {
      setError({
        total: 'Ingresa el total de la compra'
      })
      return
    }

    if (compra.total <= 0) {
      setError({
        total: 'El total de la compra debe ser mayor a 0'
      })
      return
    }

    const response = await registrarCompra(compra)

    if(!response.success) {
      toast.error(response.message)
      return
    }

    toast.success('¡Compra registrada exitosamente!')
    setCompra(initialState)
  }

  return (
    <form
      className="flex flex-col gap-2 p-4"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-2">
        <label 
          htmlFor="documento"
          className="px-2"
        >
          Documento:
        </label>
        <input
          id="documento" 
          type="text" 
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="da91ed58-7810-4911-9889-1df00d480ebd"
          value={compra.documento}
          onChange={handleChange}
        />
        {
          error['documento'] &&
          (<p className="text-sm text-red-500">{error['documento']}</p>)
        }
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label 
          htmlFor="total"
          className="px-2"
        >
          Total Compra:
        </label>
        <input
          id="total" 
          type="number" 
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="1000"
          min={0}
          value={compra.total}
          onChange={handleChange}
        />
        {
          error['total'] &&
          (<p className="text-sm text-red-500">{error['total']}</p>)
        }
      </div>

      <div className="grid grid-cols-1 gap-2">
        <input 
          type="submit" 
          className="bg-emerald-500 p-2 w-full text-white cursor-pointer rounded-lg hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
          value='Registrar Compra'
        />
      </div>
    </form>
  )
}

export default FormularioCompra
