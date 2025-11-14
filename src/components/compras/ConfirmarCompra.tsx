import { useState, type ChangeEvent } from 'react'
import { useCompraStore } from '../../stores/compra.store'
import { toast } from 'react-toastify'

const ConfirmarCompra = () => {

  const { confirmarCompra, limpiarSesion } = useCompraStore()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value)
  }

  const handleSubmit = async () => {
    setError('')
    
    if (!token) {
      setError('Ingresa un el código de confirmación')
      return
    }

    const response = await confirmarCompra(token)

    if (!response.success) {
      toast.error(response.message);
      return
    }
    toast.success('La compra se ha confirmado correctamente, ya puedes ver reflejado tu saldo actualizado');
    setToken('')
  }
  
  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold text-center text-emerald-500'>
        Confirmar Compra
      </h2>

      <p className='text-center text-lg'>Revisa tu correo para obtener el código de confirmación de la compra y proceder con el pago.</p>
      <div className="grid grid-cols-1 gap-2">
        <label 
          htmlFor="token"
          className="px-2"
        >
          Código de Confirmación:
        </label>
        <input
          id="token" 
          type="text" 
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="123456"
          minLength={6}
          maxLength={6}
          value={token}
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
        Confirmar Compra
      </button>

      <button
        className="w-full border border-emerald-500 rounded-lg py-2 text-emerald-500 cursor-pointer hover:bg-emerald-500/20"
        onClick={limpiarSesion}
      >
        Salir
      </button>
    </div>
  )
}

export default ConfirmarCompra
