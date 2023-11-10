import { useAccount, useSignMessage } from 'wagmi'
import { useAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import getVerificationMessage from 'helpers/getVerificationMessage'
import signatureAtom from 'atoms/signatureAtom'

export default function () {
  const [signature, setSignature] = useAtom(signatureAtom)
  const { address } = useAccount()
  const {
    data: signMessageData,
    error,
    isLoading,
    signMessage,
  } = useSignMessage()

  useEffect(() => {
    if (signature) {
      return
    } else if (signMessageData) {
      setSignature(signMessageData)
    } else if (error) {
      console.error(error)
      setSignature(null)
    }
  }, [signature, setSignature, signMessageData, error])

  return (
    <div>
      {signature && (
        <div>
          <p>
            Now you need to approve a signer so that I can like all casts on
            your behalf 👇👇👇
          </p>
        </div>
      )}
      {!signature && (
        <div>
          <p>Please, sign a message to login 👇👇👇</p>
          <button
            class="btn btn-primary"
            disabled={isLoading}
            onClick={() => {
              if (!address) {
                setSignature(null)
              } else {
                signMessage({
                  message: getVerificationMessage(address),
                })
              }
            }}
          >
            Sign message to login
          </button>
        </div>
      )}
    </div>
  )
}
