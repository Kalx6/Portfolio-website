import { Component } from "react";

// Catches errors thrown while rendering its children, so one broken
// widget can't take the whole page down with it.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Component crashed:", error, info.componentStack);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
