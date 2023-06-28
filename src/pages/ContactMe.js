import React from "react";
import StarryBackground from "../components/StarryBackground";

const ContactMe = () => {
    return (
        <>
        <StarryBackground gradientTopLeft={false} gradientBottomRight={true} />
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', /*paddingTop: '60px'*/ }}>
            <h2 style={{ color: "white" }}>Contact me</h2>
            <p style={{ color: "white" }}>Content contact me...</p>
        </div>
        </>
    );
}

export default ContactMe;