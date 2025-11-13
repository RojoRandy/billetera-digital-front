import FormularioConsultaBilletera from "../components/billetera/FormularioConsultaBilletera"
import FormularioRecargarSaldo from "../components/billetera/FormularioRecargarSaldo"
import SaldoBilletera from "../components/billetera/SaldoBilletera"
import { useBilleteraStore } from "../stores/billetera.store"
import { useClienteStore } from "../stores/cliente.store"

const Billetera = () => {

  const { billetera, limpiarBilletera } = useBilleteraStore()
  const { cliente, limpiarCliente } = useClienteStore()

  const handleSalir = () => {
    limpiarBilletera()
    limpiarCliente()
  }

  return (
    <main className="bg-white shadow-xl border border-slate-200 rounded-lg p-4">
      <h1 className="font-semibold text-xl text-center border-b-2 border-emerald-500 py-2">Billetera</h1>

      {
        !billetera || !cliente
        ? <FormularioConsultaBilletera />
        :
        (
          <div className="flex flex-col gap-4">
            <SaldoBilletera
              documento={billetera.documento}
              nombres={cliente.nombres}
              celular={billetera.celular}
              cantidad={billetera.cantidad}
            />
            <div className="border border-emerald-500" />
            <FormularioRecargarSaldo />

            <button
              className="border border-emerald-500 rounded-lg py-2 text-emerald-500 cursor-pointer hover:bg-emerald-500/20"
              onClick={handleSalir}
            >
              Salir
            </button>
          </div>
        )
      }
      

    </main>
  )
}

export default Billetera
