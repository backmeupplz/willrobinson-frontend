import {
  Address,
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { getUser } from 'helpers/api'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import QRCode from 'react-qr-code'
import SuspenseWithError from 'components/SuspenseWithError'
import signatureAtom from 'atoms/signatureAtom'
import userAtom from 'atoms/userAtom'

function Balance({ address }: { address: Address }) {
  const { isLoading, data, error } = useBalance({
    address,
    token: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    watch: true,
  })
  return error || !data ? (
    <p>Error loading balance</p>
  ) : isLoading ? (
    <p>Loading balance...</p>
  ) : (
    <p>
      Balance: {Number(data.value) / 1000000} {data.symbol}
    </p>
  )
}

function UserDetails() {
  const [user, setUser] = useAtom(userAtom)
  if (!user) return null
  const signature = useAtomValue(signatureAtom)
  const { address } = useAccount()

  const { config } = usePrepareContractWrite({
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    abi: [
      {
        constant: false,
        inputs: [
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'transfer',
    args: [user.paymentAddress, 20000000],
  })
  const { write: sendTransaction } = useContractWrite(config)
  return user ? (
    <div>
      <p>Actively liking: {user.active ? 'yes' : 'no'}</p>
      {user.paidUntil && (
        <p>Paid until: {new Date(user.paidUntil).toLocaleString()}</p>
      )}
      <p>
        Payment address: <span class="break-words">{user.paymentAddress}</span>
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
            Send 20 USDC
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
