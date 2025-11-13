
export type Billetera = {
  documento: string
  celular: string
  cantidad: number
  createdAt?: Date
}

export type ConsultaSaldoRequest = {
  documento: string
  celular: string
}

export type RecargarSaldoRequest = {
  documento: string
  celular: string
  cantidad: number
}