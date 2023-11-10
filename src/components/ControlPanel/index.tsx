import ActivateToggle from 'components/ControlPanel/ActivateToggle'
import Description from 'components/ControlPanel/Description'
import Test from 'components/ControlPanel/Test'
import UserDetails from 'components/ControlPanel/UserDetails'

export default function () {
  return (
    <div>
      <Description />
      <hr />
      <UserDetails />
      <hr />
      <ActivateToggle />
      <hr />
      <Test />
    </div>
  )
}
