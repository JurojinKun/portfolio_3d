import React from "react";
import StarryBackground from "../components/StarryBackground";

const AboutMe = () => {
    return (
        <>
            <StarryBackground gradientTopLeft={true} gradientBottomRight={false} />
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', /*paddingTop: '60px'*/ }}>
                <h2 style={{ color: "white" }}>About me</h2>
                <p style={{ color: "white" }}>Content about me...</p>
            </div>
        </>
    );
}

export default AboutMe;