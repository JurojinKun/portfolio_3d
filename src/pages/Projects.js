import React from "react";

const Projects = () => {
    return (
        <div style={{
            display: "flex",
            width: "100%",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h2 style={{ color: "white" }}>Projects</h2>
                <p style={{ color: "white" }}>Content projects...</p>
            </div>
        </div>
    );
}

export default Projects;