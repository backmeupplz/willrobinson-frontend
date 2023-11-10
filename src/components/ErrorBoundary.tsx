import { Component } from 'react'
import Link from 'components/Link'

export default class extends Component<{
  fallbackText: string
}> {
  state: {
    hasError: boolean
    error?: Error
  } = { hasError: false }
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    }
  }
  render() {
    if (this.state.hasError) {
      console.error(this.state.error)
      return (
        <p>
          {this.props.fallbackText}: {this.state.error?.message} (consider
          pinging <Link url="https://warpcast.com/borodutch">@borodutch</Link>)
        </p>
      )
    }
    return this.props.children
  }
}
