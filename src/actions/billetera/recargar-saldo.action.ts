import { billeteraApi } from "../../api/billetera-api";
import type { ApiResponse } from "../../shared/api-response";
import { generalException } from "../../shared/error/general.exception";
import type { Billetera, RecargarSaldoRequest } from "../../types/billetera.type";

export const RecargarSaldoAction = async (request: RecargarSaldoRequest): Promise<ApiResponse<Billetera>> => {
  try {
    const { data } = await billeteraApi.patch<ApiResponse<Billetera>>('billeteras/recargar-saldo', request);

    return data
  } catch (error) {
      return generalException(error)
  }
}