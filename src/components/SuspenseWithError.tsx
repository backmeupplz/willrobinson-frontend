import { ComponentChildren } from 'preact'
import { PropsWithChildren, Suspense } from 'react'
import ErrorBoundary from 'components/ErrorBoundary'

export default function ({
  errorText,
  children,
  fallback,
}: PropsWithChildren & { errorText: string; fallback?: ComponentChildren }) {
  return (
    <ErrorBoundary fallbackText={errorText}>
      <Suspense fallback={fallback || <p>Loading...</p>}>{children}</Suspense>
    </ErrorBoundary>
  )
}
