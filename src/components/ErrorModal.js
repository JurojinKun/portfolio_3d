import '../css/ErrorModal.css';

import React from 'react';

const ErrorModal = ({ error, resetErrorBoundary }) => {
  
    if (error.message.includes("Cannot read properties of null (reading 'indexOf')" && error.stack && error.stack.includes("react-three-fiber"))) {
      return (
        <div className="error-modal">
          <div className="error-modal-content">
            <h3>Une erreur est survenue</h3>
            <p>Si vous avez un bloqueur, veuillez essayer de désactiver et rafraîchir la page</p>
          </div>
        </div>
      );
    }
  
    // Pour d'autres types d'erreurs, vous pouvez avoir une gestion différente
    return (
      <div className="error-modal">
        <div className="error-modal-content">
          <h3>Une erreur est survenue</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

export default ErrorModal;