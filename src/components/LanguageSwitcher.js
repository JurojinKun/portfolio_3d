import React, { useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#2a2a2a',
        color: '#fff',
        border: state.isFocused ? '2px solid #47CDD6' : '2px solid #2a2a2a',
        borderRadius: '4px',
        marginRight: '100px',
        boxShadow: state.isFocused ? '0 0 0 1px #47CDD6' : 'none', // remove default blue box shadow and add custom one
        '&:hover': {
            border: '2px solid #47CDD6', // change border color on hover
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#fff',
        fontWeight: 'bold'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'transparent',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '0',
        marginRight: '100px',
        borderRadius: "4px",
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected || state.isFocused ? '#47CDD6' : '#fff',
        backgroundColor: state.isSelected ? '#1a1a1a' : state.isFocused ? '#333' : '#2a2a2a',
        fontWeight: 'bold'
    })
};

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const languageOptions = [
        { value: 'fr', label: "🇫🇷 " + t("languages.french") },
        { value: 'en', label: "🇬🇧 " + t("languages.english") },
    ];

    const changeLanguage = (selectedOption) => {
        setSelectedLanguage(selectedOption.value);
        i18n.changeLanguage(selectedOption.value);
    };

    return (
        <Select
            value={languageOptions.find(option => option.value === selectedLanguage)}
            options={languageOptions}
            onChange={changeLanguage}
            styles={customStyles}
            getOptionLabel={(option) => option.label}
            menuPlacement="auto"
        />
    );
};

export default LanguageSwitcher;
