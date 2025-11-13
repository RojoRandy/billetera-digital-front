import { billeteraApi } from "../../api/billetera-api";
import type { ApiResponse } from "../../shared/api-response";
import { generalException } from "../../shared/error/general.exception";
import type { Billetera, ConsultaSaldoRequest } from "../../types/billetera.type";


export const ConsultarSaldoAction = async (consulta: ConsultaSaldoRequest): Promise<ApiResponse<Billetera>> => {
  try {
    const { documento, celular } = consulta;
    const { data } = await billeteraApi.get<ApiResponse<Billetera>>(`billeteras/consultar-saldo?documento=${documento}&celular=${celular}`)

    return data
  } catch (error) {
    return generalException(error)
  }
}