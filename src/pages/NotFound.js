import React from "react";

const NotFound = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: '#02020D',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                color: 'white',
                textAlign: "center",
                fontSize: 23,
                fontWeight: "bold"
            }}>
                URL not found
            </div>
        </div>
    );
}

export default NotFound;