import React from "react";
import { useTranslation } from "react-i18next";

import Layout from "components/Layout";
import Container from "components/Container";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Container type="content" className="text-center">
        <h1>{t("notFound.title")}</h1>
        <p>{t("notFound.message")}</p>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
