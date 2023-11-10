import Signer from 'models/Signer'
import User from 'models/User'
import env from 'helpers/env'

export async function getVerificationMessage(address: string) {
  return (
    (await (
      await fetch(`${env.VITE_BACKEND}/verification/${address}`)
    ).json()) as {
      verificationMessage: string
    }
  ).verificationMessage
}

export async function getSigner(address: string, signature: string) {
  return (await (
    await fetch(`${env.VITE_BACKEND}/signer`, {
      headers: {
        address,
        signature,
      },
    })
  ).json()) as Signer
}

export async function getUser(address: string, signature: string) {
  return (await (
    await fetch(`${env.VITE_BACKEND}/user`, {
      headers: {
        address,
        signature,
      },
    })
  ).json()) as User
}

export async function activate(
  address: string,
  signature: string,
  activate: boolean
) {
  return (await (
    await fetch(`${env.VITE_BACKEND}/user/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        address,
        signature,
      },
      body: JSON.stringify({ activate }),
    })
  ).json()) as {
    active: boolean
  }
}
