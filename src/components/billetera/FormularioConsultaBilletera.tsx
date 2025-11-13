import { useState, type ChangeEvent } from "react"
import { useBilleteraStore } from "../../stores/billetera.store";
import type { ConsultaSaldoRequest } from "../../types/billetera.type";
import { toast } from "react-toastify";
import { useClienteStore } from "../../stores/cliente.store";

const FormularioConsultaBilletera = () => {

  const { consultarSaldo } = useBilleteraStore()
  const { consultarCliente } = useClienteStore()

  const initialState: ConsultaSaldoRequest = {
    documento: '',
    celular: ''
  }

  const [consulta, setConsulta] = useState<ConsultaSaldoRequest>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConsulta({
      ...consulta,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const [ saldoResponse, clienteResponse ] = await Promise.allSettled([
      consultarSaldo(consulta),
      consultarCliente(consulta.documento)
    ])

    if (saldoResponse.status !== 'fulfilled') {
      toast.error('No se pudo obtener el saldo del cliente')
    } else {
      if (!saldoResponse.value.success) {
        toast.error(saldoResponse.value.message)
        return
      }
    }

    if (clienteResponse.status !== 'fulfilled') {
      toast.error('No se pudo obtener la información del cliente')
    } else {
      if (!clienteResponse.value.success) {
        toast.error(clienteResponse.value.message)
        return
      }
    }
  }


  return (
    <form
      className="grid grid-cols-3 gap-2 p-4"
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
          value={consulta.documento}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label 
          htmlFor="celular"
          className="px-2"
        >Celular:</label>
        <input
          id="celular" 
          type="text" 
          className="border border-slate-300 p-2 rounded-lg"
          minLength={10}
          maxLength={10}
          placeholder="1122334455"
          value={consulta.celular}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <input 
          type="submit" 
          className="bg-emerald-500 p-2 w-full text-white cursor-pointer rounded-lg hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
          value='Consultar Billetera'
        />
      </div>
    </form>
  )
}

export default FormularioConsultaBilletera
