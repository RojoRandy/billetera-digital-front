import { billeteraApi } from "../../api/billetera-api";
import type { ApiResponse } from "../../shared/api-response";
import { generalException } from "../../shared/error/general.exception";
import type { Cliente } from "../../types/cliente.type";


export const RegistrarClienteAction = async (cliente: Cliente): Promise<ApiResponse<any>> => {
  try {
    const { data } = await billeteraApi.post<ApiResponse<any>>('clientes', cliente)

    return data
  } catch (error) {
    return generalException(error)
  }
}