import { useAtomValue } from 'jotai'
import Link from 'components/Link'
import QRCode from 'react-qr-code'
import signerAtom from 'atoms/signerAtom'

export default function () {
  const signer = useAtomValue(signerAtom)
  return !signer ? null : (
    <div>
      <h3>iOS</h3>
      <QRCode value={signer.iosUrl} />
      <p>
        Scan the QR code or manually open{' '}
        <Link url={signer.iosUrl}>the URL</Link>.
      </p>
      <h3>Android</h3>
      <QRCode value={signer.androidUrl} />
      <p>
        Scan the QR code or manually open{' '}
        <Link url={signer.androidUrl}>the URL</Link>.
      </p>
    </div>
  )
}
