import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ALCHEMY_KEY: str(),
  VITE_BACKEND: str(),
})
