import "../css/Home3D.css";

import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../redux/selectors/languageSelector";
import { setLanguage } from "../redux/slices/languageSlice";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#2a2a2a",
    color: "#fff",
    border: state.isFocused ? "2px solid transparent" : "2px solid transparent",
    borderRadius: "4px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0)",
    "&:hover": {
      border: "2px solid transparent",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#000" : "#fff",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
  menuList: (provided) => ({
    ...provided,
    borderRadius: "4px",
  }),
  option: (provided, state) => ({
    ...provided,
    borderRadius: "4px",
    color: "#fff",
    backgroundColor: state.isSelected
      ? "#000"
      : state.isFocused
      ? "#333"
      : "#2a2a2a",
    "&:active": {
      backgroundColor: "#333",
      color: "#fff",
    },
  }),
};

const LanguageSwitcher = ({ openingDirection }) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const selectedLanguage = useSelector(selectLanguage);

  const languageOptions = [
    {
      value: "fr",
      label: (
        <span className="span-language">
          <ReactCountryFlag countryCode="FR" className="flag" svg />{" "}
          <span className="language">{t("languages.french")} </span>
        </span>
      ),
    },
    {
      value: "en",
      label: (
        <span className="span-language">
          <ReactCountryFlag countryCode="GB" className="flag" svg />{" "}
          <span className="language">{t("languages.english")}</span>{" "}
        </span>
      ),
    },
  ];

  const changeLanguage = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
    dispatch(setLanguage(selectedOption.value));
  };

  return (
    <Select
      className="language-switcher"
      value={languageOptions.find((option) =>
        !!selectedLanguage
          ? option.value === selectedLanguage
          : option.value === i18n.language.split("-")[0]
      )}
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
