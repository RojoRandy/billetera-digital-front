import { billeteraApi } from "../../api/billetera-api";
import type { ApiResponse } from "../../shared/api-response";
import { generalException } from "../../shared/error/general.exception";


export const ConfirmarCompraAction = async (idSesion: string, token: string): Promise<ApiResponse<boolean>> => {
  try {
    const { data } = await billeteraApi.patch<ApiResponse<any>>('compras/confirmar', {
      idSesion,
      token
    })

    return data
  } catch (error) {
    return generalException(error)
  }
}