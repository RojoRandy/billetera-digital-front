import { useState, type ChangeEvent } from "react"
import type { Cliente } from "../../types/cliente.type"
import { RegistrarClienteAction } from "../../actions/clientes/registrar-cliente.action"
import { toast } from "react-toastify"

const FormularioCliente = () => {

  const initialState: Cliente = {
    documento: '',
    nombres: '',
    email: '',
    celular: ''
  }

  const [cliente, setCliente] = useState<Cliente>(initialState)

  const esClienteValido = () => {
    const {documento, nombres, email, celular} = cliente;

    return (
      documento.trim() !== '' && 
      nombres.trim() !== '' && 
      email.trim() !== '' && 
      celular.trim() !== ''
    )
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCliente({
      ...cliente,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await RegistrarClienteAction(cliente)

    if (!response.success) {
      toast.error(response.message)
      return
    }

    toast.success('¡El Cliente se ha registrado correctamente!')
    setCliente(initialState)
  }

  return (
    <form
      className="space-y-4 p-4"
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
          value={cliente.documento}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label 
          htmlFor="nombres"
          className="px-2"
        >
          Nombres:
        </label>
        <input
          id="nombres" 
          type="text" 
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="John Doe"
          value={cliente.nombres}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label 
          htmlFor="email"
          className="px-2"
        >
          Email:
        </label>
        <input
          id="email" 
          type="email" 
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="tu_correo@gmail.com"
          value={cliente.email}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label 
          htmlFor="celular"
          className="px-2"
        >
          Celular:
        </label>
        <input
          id="celular" 
          type="text" 
          className="border border-slate-300 p-2 rounded-lg"
          minLength={10}
          maxLength={10}
          placeholder="1122334455"
          value={cliente.celular}
          onChange={handleChange}
        />
      </div>

      <input 
        type="submit" 
        className="bg-emerald-500 p-2 w-full text-white cursor-pointer rounded-lg hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
        value='Registrar Cliente'
        disabled={!esClienteValido()}
      />
      
    </form>
  )
}

export default FormularioCliente
