import { getVerificationMessage } from 'helpers/api'
import { useAccount } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useSetAtom } from 'jotai'
import Description from 'components/Description'
import Link from 'components/Link'
import Login from 'components/Login'
import SignerUUID from 'components/SignerUUID'
import Support from 'components/Support'
import Title from 'components/Title'
import Wallet from 'components/Wallet'
import addressAtom from 'atoms/addressAtom'
import signatureAtom from 'atoms/signatureAtom'
import signerAtom from 'atoms/signerAtom'
import verificationMessageAtom from 'atoms/verificationMessageAtom'

function Main() {
  const { isConnected, address } = useAccount()
  const setSignature = useSetAtom(signatureAtom)
  const setVerificationMessage = useSetAtom(verificationMessageAtom)
  const setAddress = useSetAtom(addressAtom)
  const setSigner = useSetAtom(signerAtom)
  // Wipe data on disconnect
  useEffect(() => {
    if (!isConnected) {
      setSignature(null)
      setAddress(null)
      setSigner(null)
      setVerificationMessage(null)
    }
  }, [setSignature, setAddress, setSigner, setVerificationMessage, isConnected])
  // Whenever address changes
  useEffect(() => {
    // Wipe data
    setSignature(null)
    setSigner(null)
    // Fetch new verification message on new address
    setVerificationMessage(address ? getVerificationMessage(address) : null)
    // Set address
    setAddress(address || null)
  }, [setVerificationMessage, setAddress, setSignature, setSigner, address])
  return (
    <div>
      <Title />
      <div role="alert" class="alert alert-error">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>
          Warning: Will Robinson bot was shut down! You will get penalized by
          the algorithm if you auto-like all casts.
        </span>
      </div>
      {!isConnected && <Description />}
      <Login />
      {isConnected && <SignerUUID />}
      <hr />
      <Support />
    </div>
  )
}

export default function () {
  return (
    <Wallet>
      <div className="container mx-auto max-w-prose p-10 prose">
        <Main />
      </div>
    </Wallet>
  )
}
