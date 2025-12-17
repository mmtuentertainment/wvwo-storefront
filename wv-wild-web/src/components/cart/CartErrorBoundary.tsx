import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class CartErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Cart] Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800 max-w-sm shadow-lg">
          <p className="font-display font-bold">Cart temporarily unavailable</p>
          <p className="text-sm mt-1 font-body">Please refresh the page or call us at (304) 649-5765.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm underline hover:no-underline"
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
