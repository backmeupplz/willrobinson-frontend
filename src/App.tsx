import { useAccount } from 'wagmi'
import { useAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import Description from 'components/Description'
import Login from 'components/Login'
import SignerUUID from 'components/SignerUUID'
import Support from 'components/Support'
import Title from 'components/Title'
import Wallet from 'components/Wallet'
import signatureAtom from 'atoms/signatureAtom'

function Main() {
  const { isConnected } = useAccount()
  const [, setSignature] = useAtom(signatureAtom)
  // Wipe signature on disconnect
  useEffect(() => {
    if (!isConnected) {
      setSignature(null)
    }
  }, [setSignature, isConnected])
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
