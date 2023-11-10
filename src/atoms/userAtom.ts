import { atom } from 'jotai'
import User from 'models/User'

export default atom<Promise<User> | null>(null)
