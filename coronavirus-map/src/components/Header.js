import React from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";

import Container from "components/Container";
import LanguageSelector from "components/LanguageSelector";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeEurope } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header>
      <Container type="content">
        <p>{t("header.title")}</p>

        <LanguageSelector />

        <input type="checkbox" id="overlay-input" />
        <label htmlFor="overlay-input" id="overlay-button">
          <span></span>
        </label>
        <div id="overlay">
          <ul>
            <Link to="/">
              <li>
                <FontAwesomeIcon icon={faGlobeEurope} /> {t("header.worldMap")}
              </li>
            </Link>
            <Link to="/details/">
              <li>
                <FontAwesomeIcon icon={faInfoCircle} /> {t("header.details")}
              </li>
            </Link>
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default Header;
