
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}