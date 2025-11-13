import { billeteraApi } from "../../api/billetera-api";
import type { ApiResponse } from "../../shared/api-response";
import { generalException } from "../../shared/error/general.exception";
import type { Cliente } from "../../types/cliente.type";

export const ConsultarClienteAction = async (documento: string): Promise<ApiResponse<Cliente>> => {
  try {
    const { data } = await billeteraApi.get<ApiResponse<Cliente>>(`clientes?documento=${documento}`)

    return data
  } catch (error) {
    return generalException(error)
  }
}