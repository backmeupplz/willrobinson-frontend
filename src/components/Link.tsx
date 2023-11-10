import { PropsWithChildren } from 'preact/compat'

export default function ({
  children,
  url,
}: PropsWithChildren & { url: string }) {
  return (
    <a href={url} target="_blank">
      {children}
    </a>
  )
}
