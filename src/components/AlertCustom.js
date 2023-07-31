import "../css/AlertCustom.css";

import Swal from 'sweetalert2';

// Fonction personnalisée pour afficher une alerte
const showAlertCustom = (title, text, icon) => {
    Swal.fire({
        // width: "400px",
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'OK',
        background: "#1A1A1A",
        color: "white",
        confirmButtonColor: '#47CDD6',
        backdrop: 'rgba(71, 205, 214, 0.1)',
        customClass: {
            title: 'alert-title',
        }
    });
}

export default showAlertCustom;