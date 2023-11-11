import {
  Address,
  useAccount,
  useBalance,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { getUser } from 'helpers/api'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import Link from 'components/Link'
import QRCode from 'react-qr-code'
import SuspenseWithError from 'components/SuspenseWithError'
import cost from 'helpers/cost'
import signatureAtom from 'atoms/signatureAtom'
import userAtom from 'atoms/userAtom'

function Balance({ address }: { address: Address }) {
  const { isLoading, data, error } = useBalance({
    address,
    watch: true,
    formatUnits: 'ether',
  })
  return error || !data ? (
    <p>Error loading balance</p>
  ) : isLoading ? (
    <p>Loading balance...</p>
  ) : (
    <p>
      Balance: {formatEther(data.value)} {data.symbol}
    </p>
  )
}

function UserDetails() {
  const [user, setUser] = useAtom(userAtom)
  if (!user) return null
  const signature = useAtomValue(signatureAtom)
  const { address } = useAccount()

  const { config } = usePrepareSendTransaction({
    to: user.paymentAddress,
    value: parseEther('0.01'),
  })
  const { sendTransaction } = useSendTransaction(config)
  return user ? (
    <div>
      <p>Actively liking: {user.active ? 'yes' : 'no'}</p>
      {user.paidUntil && (
        <p>Paid until: {new Date(user.paidUntil).toLocaleString()}</p>
      )}
      <p>
        Payment address:{' '}
        <span class="break-words">
          <Link url={`https://etherscan.io/address/${user.paymentAddress}`}>
            {user.paymentAddress}
          </Link>
        </span>
      </p>
      <Balance address={user.paymentAddress} />
      <QRCode value={user.paymentAddress} />
      <p>🙏 this is the same address but as a QR code for your convenience.</p>
      {address && signature && (
        <div class="flex gap-4">
          <button
            class="btn"
            onClick={() => setUser(getUser(address, signature))}
          >
            Refresh
          </button>
          <button
            class="btn btn-primary"
            onClick={() => {
              sendTransaction?.()
            }}
          >
            Send {cost} ETH
          </button>
        </div>
      )}
    </div>
  ) : null
}

export default function () {
  const signature = useAtomValue(signatureAtom)
  const setUser = useSetAtom(userAtom)
  const { address } = useAccount()

  useEffect(() => {
    if (!address || !signature) return
    setUser(getUser(address, signature))
  }, [address, signature, setUser])

  return (
    <div>
      <h3>User details</h3>
      <SuspenseWithError errorText="Error fetching user details">
        <UserDetails />
      </SuspenseWithError>
    </div>
  )
}
