import "../css/Home3D.css";

import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '../redux/selectors/languageSelector';
import { setLanguage } from '../redux/slices/languageSlice';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#2a2a2a',
        color: '#fff',
        border: state.isFocused ? '2px solid #47CDD6' : '2px solid #2a2a2a',
        borderRadius: '4px',
        boxShadow: state.isFocused ? '0 0 0 1px #47CDD6' : 'none', // remove default blue box shadow and add custom one
        '&:hover': {
            border: '2px solid #47CDD6', // change border color on hover
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#fff',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'transparent',
    }),
    menuList: (provided) => ({
        ...provided,
        borderRadius: "4px",
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected || state.isFocused ? '#47CDD6' : '#fff',
        backgroundColor: state.isSelected ? '#1a1a1a' : state.isFocused ? '#333' : '#2a2a2a',
    })
};

const LanguageSwitcher = ({ openingDirection }) => {
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    const selectedLanguage = useSelector(selectLanguage);

    const languageOptions = [
        { value: 'fr', label: "🇫🇷 " + t("languages.french") },
        { value: 'en', label: "🇬🇧 " + t("languages.english") },
    ];

    const changeLanguage = (selectedOption) => {
        i18n.changeLanguage(selectedOption.value);
        console.log(selectedOption.value);
        dispatch(setLanguage(selectedOption.value));
    };

    return (
        <Select className='language-switcher'
            value={languageOptions.find(option => !!selectedLanguage ? option.value === selectedLanguage : option.value === i18n.language.split('-')[0])}
            options={languageOptions}
            onChange={changeLanguage}
            styles={customStyles}
            getOptionLabel={(option) => option.label}
            menuPlacement={openingDirection}
            isSearchable={false}
        />
    );
};

export default LanguageSwitcher;
