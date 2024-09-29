import "../css/AlertCustom.css";

import Swal from "sweetalert2";

// Fonction personnalisée pour afficher une alerte
const showAlertCustom = (title, text, icon) => {
  document.body.style.overflowY = "hidden";

  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "OK",
    background: "rgba(26, 26, 26, 0.6)",
    color: "white",
    customClass: {
      title: "alert-title",
      popup: "alert-content",
      confirmButton: "alert-action",
    },
    allowOutsideClick: false,
  }).then(() => {
    document.body.style.overflowY = "auto";
  });
  return (
    <div
      style={{
        backdropFilter: "blur(5px)",
      }}
    />
  );
};

export default showAlertCustom;
