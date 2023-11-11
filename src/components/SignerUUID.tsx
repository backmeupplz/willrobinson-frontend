import { getSigner } from 'helpers/api'
import { useAccount, useSignMessage } from 'wagmi'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import ControlPanel from 'components/ControlPanel'
import QRCodes from 'components/QRCodes'
import SignButton from 'components/SignButton'
import SignerStatusEnum from 'models/SignerStatusEnum'
import SuspenseWithError from 'components/SuspenseWithError'
import signatureAtom from 'atoms/signatureAtom'
import signerAtom from 'atoms/signerAtom'

function SignerRequest() {
  const [signer, setSigner] = useAtom(signerAtom)
  const { address } = useAccount()
  const signature = useAtomValue(signatureAtom)

  return signer?.signerStatus === SignerStatusEnum.Approved ? (
    <ControlPanel />
  ) : signer && address && signature ? (
    <div>
      <p>
        Now you need to approve the signer so that I can like all casts on your
        behalf (don't worry, you'll have to manually activate it with a button)
        👇👇👇
      </p>
      <QRCodes />
      <p>
        When you're done approving the signer, press the button below to refresh
        its status 👇👇👇
      </p>
      <button
        class="btn btn-primary"
        onClick={() => {
          setSigner(getSigner(address, signature))
        }}
      >
        Refresh signer
      </button>
    </div>
  ) : null
}

export default function () {
  const [signature, setSignature] = useAtom(signatureAtom)
  const setSigner = useSetAtom(signerAtom)
  const { address } = useAccount()
  const {
    data: signMessageData,
    error,
    isLoading,
    signMessage,
  } = useSignMessage()

  useEffect(() => {
    if (signature && address) {
      setSigner(getSigner(address, signature))
      return
    } else if (signMessageData) {
      setSignature(signMessageData)
    } else if (error) {
      console.error(error)
      setSignature(null)
    }
  }, [signature, setSignature, signMessageData, error, setSigner, address])
  return address ? (
    <div>
      {signature && (
        <SuspenseWithError errorText="Error fetching signer">
          <SignerRequest />
        </SuspenseWithError>
      )}
      {!signature && (
        <div>
          <p>Please, sign a message to login 👇👇👇</p>
          <SuspenseWithError errorText="Error fetching verification message">
            <SignButton
              isLoading={isLoading}
              signMessage={signMessage}
              address={address}
            />
          </SuspenseWithError>
        </div>
      )}
    </div>
  ) : null
}
