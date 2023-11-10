import { atom } from 'jotai'

export default atom<Promise<string> | null>(null)
