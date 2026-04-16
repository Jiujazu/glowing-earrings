"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class CourseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <p className="text-2xl mb-2">😵</p>
            <p className="font-heading font-bold text-lg text-[var(--course-text)] mb-2">
              Hier ist etwas schiefgelaufen.
            </p>
            <p className="text-sm text-[var(--course-text-muted)]">
              Versuch die Seite neu zu laden.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
