import Link from 'components/Link'

export default function () {
  return (
    <div>
      <p>Welcome to the dungeon ⚣⚣⚣</p>
      <p>
        You signed the message and approved the signer. Now I can like on your
        behalf. The only thing left is to give me 20 USDC. Hey, $20 is $20.
      </p>
      <p>
        Below you will find your user details and the Ethereum address that you
        need to send{' '}
        <Link url="https://www.circle.com/en/usdc-multichain/ethereum">
          USDC
        </Link>{' '}
        to pay for the service. Then I will like <b>all</b> new casts on your
        behalf at random times after they are casted.
      </p>
    </div>
  )
}
