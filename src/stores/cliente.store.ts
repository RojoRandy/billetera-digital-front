import { create } from "zustand"
import type { Cliente } from "../types/cliente.type"
import type { ApiResponse } from "../shared/api-response"
import { ConsultarClienteAction } from "../actions/clientes/consultar-cliente.action"


export type ClienteState = {
  cliente?: Cliente,
  limpiarCliente: () => void
  consultarCliente: (documento: string) => Promise<ApiResponse<Cliente>>
}

export const useClienteStore = create<ClienteState>((set) => ({
  cliente: undefined,
  limpiarCliente: () => {
    set({cliente: undefined})
  },
  consultarCliente: async (documento: string) => {
    const response = await ConsultarClienteAction(documento)

    if (response.success) {
      set({
        cliente: response.data
      })
    }

    return response
  }
}))