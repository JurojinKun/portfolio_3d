//fonts app
function fontTitleNormal(fontSize, color) {
    return {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '400',
        fontSize: fontSize,
        color: color
    };
}

function fontTitleBold(fontSize, color) {
    return {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '700',
        fontSize: fontSize,
        color: color
    }
};

function fontTitleExtraBold(fontSize, color) {
    return {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '800',
        fontSize: fontSize,
        color: color
    }
};

function fontBodyNormal(fontSize, color) {
    return {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '400',
        fontSize: fontSize,
        color: color
    };
}

function fontBodyBold(fontSize, color) {
    return {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '700',
        fontSize: fontSize,
        color: color
    }
};

function fontBodyExtraBold(fontSize, color) {
    return {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '800',
        fontSize: fontSize,
        color: color
    }
};

export { fontTitleNormal, fontTitleBold, fontTitleExtraBold, fontBodyNormal, fontBodyBold, fontBodyExtraBold };