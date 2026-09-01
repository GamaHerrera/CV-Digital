import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LADRONES SYSTEM ERROR:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="noise-overlay"></div>
          <div className="error-content">
            <h1 className="error-title">SYSTEM FAILURE</h1>
            <p className="error-subtitle">ALGO SE ROMPIÓ EN EL CAMINO.</p>
            {import.meta.env.DEV && (
              <p className="error-details">{this.state.error?.toString()}</p>
            )}
            <button 
              className="btn-primary" 
              onClick={() => window.location.reload()}
            >
              REINICIAR SISTEMA
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
