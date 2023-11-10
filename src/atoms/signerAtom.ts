import { atom } from 'jotai'
import Signer from 'models/Signer'

export default atom<Promise<Signer> | null>(null)
