import React from "react";
import StarryBackground from "../components/StarryBackground";

const ContactMe = () => {
    return (
        <div style={{
            display: "flex",
            width: "100%",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <StarryBackground gradientTopLeft={false} gradientBottomRight={true} />
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h2 style={{ color: "white" }}>Contact me</h2>
                <p style={{ color: "white" }}>Content contact me...</p>
            </div>
        </div>
    );
}

export default ContactMe;