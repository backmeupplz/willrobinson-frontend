import SignerStatusEnum from 'models/SignerStatusEnum'

export default interface Signer {
  signerFID: string | undefined
  signerPublicKey: string
  signerStatus: SignerStatusEnum
  iosUrl: string
  androidUrl: string
}
