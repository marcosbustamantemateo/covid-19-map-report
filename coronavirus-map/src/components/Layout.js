import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

import "assets/stylesheets/application.scss";

import Header from "components/Header";
import Footer from "components/Footer";

const Layout = ({ children, pageName }) => {
  let className = "";

  if (pageName) {
    className = `${className} page-${pageName}`;
  }

  useEffect(() => {
    // Cargar idioma guardado en localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Helmet bodyAttributes={{ class: className }}>
        <title>COVID-19 REPORTS WORLD MAP</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </I18nextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageName: PropTypes.string,
};

export default Layout;
