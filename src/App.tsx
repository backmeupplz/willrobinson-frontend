import { getVerificationMessage } from 'helpers/api'
import { useAccount } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useSetAtom } from 'jotai'
import Description from 'components/Description'
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
