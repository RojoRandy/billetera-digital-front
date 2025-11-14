import { create } from "zustand"
import type { Compra, CompraResponse } from "../types/compra.type"
import { RegistrarCompraAction } from "../actions/compras/registrar-compra.action"
import { ConfirmarCompraAction } from "../actions/compras/confimar-compra.action"
import type { ApiResponse } from "../shared/api-response"

export type CompraStore = {
  idSesion: string,
  limpiarSesion: () => void
  registrarCompra: (compra:Compra) => Promise<ApiResponse<CompraResponse>>
  confirmarCompra: (token: string) => Promise<ApiResponse<boolean>>
}

export const useCompraStore = create<CompraStore>((set, get) => ({
  idSesion: '',
  limpiarSesion: () => {
    set({
      idSesion: ''
    })
  },
  registrarCompra: async (compra:Compra): Promise<ApiResponse<CompraResponse>> => {
    const response = await RegistrarCompraAction(compra);
    console.log(response);
    
    if (response.success) {
      set({
        idSesion: response.data.idSesion
      })
    }

    return response
  },
  confirmarCompra: async (token: string): Promise<ApiResponse<boolean>> => {
    const idSesion = get().idSesion
    const response = await ConfirmarCompraAction(idSesion, token);

    if (response.success) {
      set({
        idSesion: ''
      })
    }

    return response
  }
}))