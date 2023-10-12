import '../css/ErrorModal.css';

import React from 'react';

const ErrorModal = ({ error }) => {
    
    var language = window.navigator.language || window.navigator.userLanguage;

    if (error.message.includes("Cannot read properties of null (reading 'indexOf')") && error.stack && error.stack.includes("react-three-fiber")) {
        return (
            <div className="error-modal">
                <div className="error-modal-content">
                    <h3>{language.startsWith("fr") ? "Une erreur est survenue" : "An error has occurred"}</h3>
                    <p>{language.startsWith("fr") ? "Si vous avez un bloqueur sur votre navigateur, veuillez essayer de le désactiver et rafraîchir la page" : "If you have a blocker on your browser, please try to deactivate it and refresh the page"}</p>
                </div>
            </div>
        );
    }

    // Pour d'autres types d'erreurs, vous pouvez avoir une gestion différente
    return (
        <div className="error-modal">
            <div className="error-modal-content">
                <h3>{language.startsWith("fr") ? "Une erreur est survenue" : "An error has occurred"}</h3>
                <p>{error.message}</p>
            </div>
        </div>
    );
}

export default ErrorModal;