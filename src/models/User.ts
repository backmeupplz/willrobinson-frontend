import { Address } from 'wagmi'

export default interface User {
  address: string
  active: boolean
  paidUntil: Date
  paymentAddress: Address
}
