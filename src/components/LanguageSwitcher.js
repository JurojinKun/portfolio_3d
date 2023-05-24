import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <select onChange={changeLanguage} defaultValue={i18n.language} style={{
            marginRight: 100
        }}>
            <option value="fr">Français</option>
            <option value="en">English</option>
        </select>
    );
};

export default LanguageSwitcher;