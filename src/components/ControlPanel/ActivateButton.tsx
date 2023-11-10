import { activate, getUser } from 'helpers/api'
import { useAccount } from 'wagmi'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'preact/hooks'
import signatureAtom from 'atoms/signatureAtom'
import userAtom from 'atoms/userAtom'

export default function () {
  const [user, setUser] = useAtom(userAtom)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>("WTF YOU DON'T HABE MONEYS")
  const { address } = useAccount()
  const signature = useAtomValue(signatureAtom)
  return user && address && signature ? (
    <div class="flex flex-col gap-4">
      <button
        class="btn btn-primary"
        onClick={async () => {
          setError(null)
          try {
            setLoading(true)
            await activate(address, signature, !user.active)
            setUser(getUser(address, signature))
          } catch (error) {
            console.error(error)
            setError(error instanceof Error ? error.message : String(error))
          } finally {
            setLoading(false)
          }
        }}
        disabled={loading}
      >
        {loading && '🤔 '}
        {user?.active ? 'Stop!' : 'Activate!'}
      </button>
      {error && (
        <div class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span>{error}</span>
        </div>
      )}
    </div>
  ) : null
}
