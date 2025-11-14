import ConfirmarCompra from "../components/compras/ConfirmarCompra"
import FormularioCompra from "../components/compras/FormularioCompra"
import { useCompraStore } from "../stores/compra.store"

const Compras = () => {

  const { idSesion } = useCompraStore()

  return (
    <main className="bg-white shadow-xl border border-slate-200 rounded-lg p-4">
      <h1 className="font-semibold text-xl text-center border-b-2 border-emerald-500 py-2">Compras</h1>

      {
        idSesion === ''
        ? <FormularioCompra />
        : <ConfirmarCompra />
      }

    </main>
  )
}

export default Compras
