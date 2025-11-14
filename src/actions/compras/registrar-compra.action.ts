import { billeteraApi } from "../../api/billetera-api";
import type { ApiResponse } from "../../shared/api-response";
import { generalException } from "../../shared/error/general.exception";
import type { Compra, CompraResponse } from "../../types/compra.type";


export const RegistrarCompraAction = async (compra: Compra): Promise<ApiResponse<CompraResponse>> => {
  try {
    const { data } = await billeteraApi.post<ApiResponse<any>>('compras', compra)

    return data
  } catch (error) {
    return generalException(error)
  }
}