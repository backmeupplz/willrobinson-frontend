import { useAtomValue } from 'jotai'
import verificationMessageAtom from 'atoms/verificationMessageAtom'

export default function ({
  isLoading,
  signMessage,
  address,
}: {
  isLoading: boolean
  signMessage: (params: { message: string }) => void
  address: string | null
}) {
  const verificationMessage = useAtomValue(verificationMessageAtom)
  return verificationMessage ? (
    <button
      class="btn btn-primary"
      disabled={isLoading}
      onClick={() => {
        if (!address) {
          return
        }
        signMessage({
          message: verificationMessage,
        })
      }}
    >
      Sign message to login
    </button>
  ) : null
}
