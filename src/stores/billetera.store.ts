import { create } from "zustand";
import type { Billetera, ConsultaSaldoRequest, RecargarSaldoRequest } from "../types/billetera.type";
import { ConsultarSaldoAction } from "../actions/billetera/consultar-saldo.action";
import { RecargarSaldoAction } from "../actions/billetera/recargar-saldo.action";
import type { ApiResponse } from "../shared/api-response";


export type BilleteraState = {
  billetera?: Billetera,
  limpiarBilletera: () => void
  consultarSaldo: (consulta: ConsultaSaldoRequest) => Promise<ApiResponse<Billetera>>
  recargarSaldo: (request: RecargarSaldoRequest) => Promise<ApiResponse<Billetera>>
}

export const useBilleteraStore = create<BilleteraState>((set) => ({
  billetera: undefined,
  limpiarBilletera: ()=> {
    set({
      billetera: undefined
    })
  },
  consultarSaldo: async (consulta: ConsultaSaldoRequest) => {
    const response = await ConsultarSaldoAction(consulta);

    if (response.success) {
      set({
        billetera: response.data
      })
    }

    return response;
  },
  recargarSaldo: async (request: RecargarSaldoRequest) => {
    const response = await RecargarSaldoAction(request);

    if (response.success) {
      set({
        billetera: response.data
      })
    }

    return response;
  }
}))