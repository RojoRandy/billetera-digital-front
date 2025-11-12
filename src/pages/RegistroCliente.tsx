import FormularioCliente from "../components/clientes/FormularioCliente"

const RegistroCliente = () => {
  return (
    <main className="bg-white shadow-xl border border-slate-200 rounded-lg p-4">
      <h1 className="font-semibold text-xl">Registro de Cliente</h1>

      <FormularioCliente />
    </main>
  )
}

export default RegistroCliente

