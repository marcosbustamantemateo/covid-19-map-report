import React, { Component } from "react";
import Helmet from "react-helmet";

import Layout from "components/Layout";

import _mapServices from "./../data/map-services";

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataCountries: [],
      datacountriesSearch: [],
      typeOrder: "DESC",
      order: "cases",
      textSearch: "",
    };
  }

  handleSetDataCountries = (data, order, orderProperty) => {
    if (data != null) {
      if (order === "DESC") {
        this.setState({
          dataCountries:
            this.state.textSearch === null || this.state.textSearch === ""
              ? orderProperty === null
                ? data.sort((a, b) => b[this.state.order] - a[this.state.order])
                : data.sort((a, b) => b[orderProperty] - a[orderProperty])
              : this.state.dataCountries,
          datacountriesSearch:
            orderProperty === null
              ? data.sort((a, b) => b[this.state.order] - a[this.state.order])
              : data.sort((a, b) => b[orderProperty] - a[orderProperty]),
        });
      } else if (order === "ASC") {
        this.setState({
          dataCountries:
            this.state.textSearch === null || this.state.textSearch === ""
              ? orderProperty === null
                ? data.sort((a, b) => b[this.state.order] - a[this.state.order])
                : data.sort((a, b) => b[orderProperty] - a[orderProperty])
              : this.state.dataCountries,
          datacountriesSearch: data.sort(
            (a, b) => a[orderProperty] - b[orderProperty]
          ),
        });
      }
    }
  };

  fetchCountries = async () => {
    const data = await _mapServices.fetchCountries().then((data) => data);
    this.handleSetDataCountries(data, "DESC", null);
  };

  renderCardsCountries = (dataCountries) => {
    return Array.isArray(dataCountries) || dataCountries.length !== 0 ? (
      <div>
        {this.state.textSearch === null ||
        this.state.textSearch === "" ? null : (
          <h2>
            {dataCountries.length === 0 ? "No se" : "Se"}{" "}
            {dataCountries.length === 1 ? "ha" : "han"} encontrado{" "}
            {dataCountries.length === 1
              ? "un resultado"
              : dataCountries.length === 0
              ? " resultados"
              : dataCountries.length + " resultados"}
          </h2>
        )}

        {dataCountries.map((country, index) => {
          const {
            cases,
            casesPerOneMillion,
            deaths,
            deathsPerOneMillion,
            critical,
            recovered,
            tests,
            testsPerOneMillion,
            updated,
            countryInfo = {},
          } = country;

          let casesDots = cases,
            casesPerOneMillionDots = casesPerOneMillion,
            deathsDots = deaths,
            deathsPerOneMillionDots = deathsPerOneMillion,
            criticalDots = critical,
            recoveredDots = recovered,
            testsDots = tests,
            testsPerOneMillionDots = testsPerOneMillion,
            updatedFormatted;

          if (cases > 1000) {
            casesDots = cases
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }
          if (casesPerOneMillion > 1000) {
            casesPerOneMillionDots = casesPerOneMillion
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }
          if (deaths > 1000) {
            deathsDots = deaths
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }
          if (deathsPerOneMillion > 1000) {
            deathsPerOneMillionDots = deathsPerOneMillion
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }
          if (recovered > 1000) {
            recoveredDots = recovered
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }
          if (tests > 1000) {
            testsDots = tests
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }
          if (testsPerOneMillion > 1000) {
            testsPerOneMillionDots = testsPerOneMillion
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }
          if (critical > 1000) {
            criticalDots = critical
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }
          if (updated) {
            updatedFormatted = new Date(updated).toLocaleString();
          }

          return (
            <div key={index} className="country-card">
              <img
                src={countryInfo.flag}
                alt="flag"
                className="img-flag-card"
              />
              <h4>{index + 1 + ". " + country.country.toUpperCase()}</h4>
              <div className="country-info">
                <strong>CONFIRMED:</strong>{" "}
                <b className="stat-confirmed">{casesDots}</b> <br></br>
                <strong>CONFIRMED/MILLION:</strong>{" "}
                <b className="stat-confirmed">{casesPerOneMillionDots}</b>{" "}
                <br></br>
                <strong>DEATHS: </strong>{" "}
                <b className="stat-deaths">{deathsDots}</b> <br></br>
                <strong>DEATHS/MILLION:</strong>{" "}
                <b className="stat-deaths"> {deathsPerOneMillionDots}</b>{" "}
                <br></br>
                <strong>CRITICALS:</strong>{" "}
                <b className="stat-deaths"> {criticalDots}</b> <br></br>
                <strong>RECOVERED:</strong>{" "}
                <b className="stat-recovered"> {recoveredDots}</b> <br></br>
                <strong>TESTS:</strong>{" "}
                <b className="stat-tests"> {testsDots}</b> <br></br>
                <strong>TESTS/MILLION:</strong>{" "}
                <b className="stat-tests"> {testsPerOneMillionDots}</b>{" "}
                <br></br>
                <strong>LAST UPDATE:</strong> <b> {updatedFormatted}</b>{" "}
                <br></br>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <p>Loading...</p>
    );
  };

  handleOrderBy = (event, type) => {
    const orderProperty = document.getElementById("order").value;
    this.handleSetDataCountries(
      this.state.textSearch === null || this.state.textSearch === ""
        ? this.state.dataCountries
        : this.state.datacountriesSearch,
      type,
      orderProperty
    );
  };

  handleTypeOrder = () => {
    const { typeOrder } = this.state;
    let type;
    if (typeOrder === "DESC") {
      type = "ASC";
      this.setState({ typeOrder: type });
    } else {
      type = "DESC";
      this.setState({ typeOrder: type });
    }

    this.handleOrderBy(null, type);
  };

  handleTextSearch = (event) => {
    this.setState({ textSearch: event.target.value });
    if (
      event.target.value.trim() === null ||
      event.target.value.trim() === ""
    ) {
      this.setState({ dataCountries: this.state.dataCountries });
    }
    this.setState({
      datacountriesSearch: this.state.dataCountries.filter((a) =>
        a.country.toUpperCase().includes(event.target.value.toUpperCase())
      ),
    });
  };

  componentDidMount() {
    this.fetchCountries();
  }

  render() {
    const {
      dataCountries,
      datacountriesSearch,
      typeOrder,
      textSearch,
    } = this.state;

    return (
      <Layout pageName="statistics">
        <Helmet>
          <title>COVID-19 REPORTS - Details</title>
        </Helmet>
        <div className="text-center">
          <h1>Details</h1>
          <div className="filtering">
            <label htmlFor="order">Order By</label>
            <select
              id="order"
              onChange={(event) => this.handleOrderBy(event, typeOrder)}
            >
              <option value="cases">Confirmed</option>
              <option value="casesPerOneMillion">Confirmed/million</option>
              <option value="deaths">Deaths</option>
              <option value="deathsPerOneMillion">Deaths/million</option>
              <option value="critical">Criticals</option>
              <option value="recovered">Recovered</option>
              <option value="tests">Tests</option>
              <option value="testsPerOneMillion">Tests/million</option>
            </select>
            <button onClick={this.handleTypeOrder}>{typeOrder}</button>
            <br></br>
            <label htmlFor="search">Search</label>
            <input type="text" id="search" onChange={this.handleTextSearch} />
          </div>
          {textSearch === null || textSearch === ""
            ? this.renderCardsCountries(dataCountries)
            : this.renderCardsCountries(datacountriesSearch)}
        </div>
      </Layout>
    );
  }
}

export default Details;
