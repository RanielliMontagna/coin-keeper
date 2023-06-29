import { Component, PropsWithChildren } from 'react';

import Error500 from 'containers/error500/error500';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<PropsWithChildren, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    //Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return <Error500 />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
