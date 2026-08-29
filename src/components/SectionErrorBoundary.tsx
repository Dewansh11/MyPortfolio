import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  name: string
  children: ReactNode
}

interface State {
  error: Error | null
}

export default class SectionErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.name}]`, error, info.componentStack)
  }

  private retry = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <section className="w-full bg-red-50 px-6 py-12">
          <div className="mx-auto max-w-6xl rounded-xl border border-red-200 bg-white p-6">
            <p className="text-sm font-semibold text-red-700">
              {this.props.name} failed to render
            </p>
            <p className="mt-2 text-xs font-mono text-red-600">
              {this.state.error.message}
            </p>
            <button
              type="button"
              onClick={this.retry}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Retry section
            </button>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
