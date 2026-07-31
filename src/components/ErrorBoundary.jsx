import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
            <h1 className="text-2xl font-bold text-slate-800">Something went wrong</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Kurdana Health hit an unexpected error. Try refreshing the page. If you opened{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">index.html</code> directly,
              run <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">npm run dev</code> instead.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 rounded-2xl bg-gradient-to-r from-pastel-pink to-pastel-blue px-6 py-3 text-sm font-semibold text-slate-800"
            >
              Reload page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
