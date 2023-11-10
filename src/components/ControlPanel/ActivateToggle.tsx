import ActivateButton from 'components/ControlPanel/ActivateButton'
import SuspenseWithError from 'components/SuspenseWithError'

export default function () {
  return (
    <div>
      <h3>Control panel 🚀</h3>
      <p>
        The cost of my services is 20 USDC/day. Assuming that you have 20 USDC
        on the payment account above, you should be able to activate the liking
        with the button below (or turn it off by pressing the same button).
      </p>
      <p>
        20 USDC lasts you for a day. If your account is activated (i.e., not in
        the "off" state), the payment account has enough funds, and your 24
        hours are over, then I will withdraw another 20 USDC.
      </p>
      <p>
        If you stop your account and 24 hours are over, I will not attempt to
        withdraw any funds until you have enough funds <b>and</b> you activate
        your account again. The next 24 hours start when you activate your
        account.
      </p>
      <p>
        You can activate and stop your account as many times as you wish. You
        won't be able to activate your account with insufficient balance and
        when your "paid up to" date is in the past.
      </p>
      <SuspenseWithError errorText="Error fetching user details">
        <ActivateButton />
      </SuspenseWithError>
    </div>
  )
}
