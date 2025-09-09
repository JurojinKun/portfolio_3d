import '../css/ErrorModal.css';

import astroHelp from '../assets/astro_help.png';

const ErrorModal = ({ error }) => {

    var language = window.navigator.language || window.navigator.userLanguage;

    if (error.message.includes("Cannot read properties of null (reading 'indexOf')") && error.stack && (error.stack.includes("at new Zf") || error.stack.includes("at Te") || error.stack.includes("at new e") || error.stack.includes("at react-three-fiber"))) {
        return (
            <div className="error-modal">
                <img src={astroHelp} alt='Error modal' className="img-astro-help" />
                <div className="error-modal-content">
                    <h3>{language.startsWith("fr") ? "Une erreur est survenue" : "An error has occurred"}</h3>
                    <p>{language.startsWith("fr") ? "Si tu as un bloqueur sur ton navigateur, essaye de le désactiver et de rafraîchir la page" : "If you have a blocker on your browser, please try to deactivate it and refresh the page"}</p>
                </div>
            </div>
        );
    }

    // Pour d'autres types d'erreurs, vous pouvez avoir une gestion différente
    return (
        <div className="error-modal">
            <img src={astroHelp} alt='Error modal' className="img-astro-help" />
            <div className="error-modal-content">
                <h3>{language.startsWith("fr") ? "Une erreur est survenue" : "An error has occurred"}</h3>
                <p>{error.message}</p>
            </div>
        </div>
    );
}

export default ErrorModal;