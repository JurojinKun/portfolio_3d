import "../css/AlertCustom.css";

import Swal from 'sweetalert2';

// Fonction personnalisée pour afficher une alerte
const showAlertCustom = (title, text, icon) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'OK',
        background: "#1A1A1A",
        color: "white",
        confirmButtonColor: '#47CDD6',
        customClass: {
            title: 'alert-title',
            popup: 'alert-content',
            confirmButton: 'alert-action'
        }
    });
    return (
        <div style={{
            backdropFilter: 'blur(5px)',
        }}/>
    );
}

export default showAlertCustom;