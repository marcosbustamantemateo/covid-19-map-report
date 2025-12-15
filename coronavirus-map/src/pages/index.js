import React, { Component } from "react";
import Helmet from "react-helmet";
import L from "leaflet";
import { navigate } from "gatsby";
import { withTranslation } from "react-i18next";

import Layout from "components/Layout";
import Map from "components/Map";

import _mapServices from "./../data/map-services";

const LOCATION = {
  lat: 40,
  lng: 4,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

let selectedCountriesGlobal = [];
let compareModeGlobal = false;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountries: [],
      compareMode: false,
    };
  }

  toggleCompareMode = () => {
    compareModeGlobal = !compareModeGlobal;
    this.setState((prevState) => ({
      compareMode: compareModeGlobal,
      selectedCountries: compareModeGlobal ? prevState.selectedCountries : [],
    }));
    if (!compareModeGlobal) {
      selectedCountriesGlobal = [];
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  };

  updateSelectedCountries = (countries) => {
    this.setState({ selectedCountries: countries });
  };

  goToComparison = () => {
    if (this.state.selectedCountries.length > 0) {
      const params = this.state.selectedCountries
        .map((c) => `country=${encodeURIComponent(c)}`)
        .join("&");
      console.log("Navigating to:", `/details/?${params}`);
      console.log("Selected countries:", this.state.selectedCountries);
      if (typeof window !== "undefined") {
        window.location.href = `/details/?${params}`;
      }
    }
  };

  clearSelection = () => {
    selectedCountriesGlobal = [];
    this.setState({ selectedCountries: [] });
    // Reload map to clear visual selection
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  mapEffect = ({ leafletElement: map } = {}) => {
    const updateParentState = this.updateSelectedCountries;
    const { t } = this.props;

    async function setupMap() {
      if (!map) return;
      const data = await _mapServices.fetchCountries().then((data0) => data0);
      const hasData = Array.isArray(data) && data.length > 0;
      if (!hasData) return;

      const geoJson = {
        type: "FeatureCollection",
        features: data.map((country = {}) => {
          const { countryInfo = {} } = country;
          const { lat, long: lng, flag } = countryInfo;
          return {
            type: "Feature",
            properties: {
              ...country,
              flag,
            },
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
          };
        }),
      };

      let idArray = [];
      const geoJsonLayers = new L.GeoJSON(geoJson, {
        pointToLayer: (feature = {}, latlng) => {
          const { properties = {} } = feature;
          const { countryInfo } = properties;
          const { _id } = countryInfo;
          let updatedFormatted;
          let isClicked = false;
          idArray.push(_id);

          const { country, updated, cases, deaths, recovered, tests, flag } =
            properties;

          let casesDots = `${cases}`,
            casesString = `${cases}`,
            deathsDots = `${deaths}`,
            recoveredDots = `${recovered}`,
            testsDots = `${tests}`;

          if (cases > 1000) {
            casesString = `${casesString.slice(0, -3)}k+`;
            casesDots = cases
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          }

          if (deaths > 1000) {
            deathsDots = deaths
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

          if (updated) {
            updatedFormatted = new Date(updated).toLocaleString();
          }

          const isSelected = selectedCountriesGlobal.includes(country);
          const selectedClass = isSelected ? " selected-marker" : "";

          const cardInformation = `
            <span id="${_id}" class="icon-marker-tooltip close">
              <img src="${flag}" alt="${t(
            "map.flag"
          )} ${country}" style="width:100%;" /><h2>${country}</h2>
              <ul>
                <li><strong>${t(
                  "map.confirmed"
                )}:</strong> <b style="color:orange;">${casesDots}</b></li>
                <li><strong>${t(
                  "map.deaths"
                )}:</strong> <b style="color:red;">${deathsDots}</b></li>
                <li><strong>${t(
                  "map.recovered"
                )}:</strong> <b style="color:lightgreen;">${recoveredDots}</b></li>
                <li><strong>${t(
                  "map.tests"
                )}:</strong> <b style="color:lightblue;">${testsDots}</b></li>
                <li><strong>${t(
                  "map.lastUpdate"
                )}:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
        `;

          const html = `
            <span id="marker-${_id}" class="icon-marker${selectedClass}" tabindex="1">
              ${cardInformation}
              ${casesString}
            </span>
          `;

          const marker = L.marker(latlng, {
            icon: L.divIcon({
              className: "icon",
              html,
            }),
            riseOnHover: true,
          });
          marker.on({
            mouseover: function () {
              if (!isClicked) {
                document.getElementById(_id).className =
                  "icon-marker-tooltip open";
              }
            },
            mouseout: function () {
              if (!isClicked) {
                document.getElementById(_id).className =
                  "icon-marker-tooltip close";
              }
            },
            click: function () {
              idArray.forEach((item) => {
                if (item === _id) {
                  isClicked = true;
                  document.getElementById(_id).className =
                    "icon-marker-tooltip open";
                } else {
                  document.getElementById(item).className =
                    "icon-marker-tooltip close";
                }
              });

              // Only allow selection when compareMode is active
              if (compareModeGlobal) {
                const countryName = country;
                const index = selectedCountriesGlobal.indexOf(countryName);
                const markerElement = document.getElementById(`marker-${_id}`);

                if (index === -1) {
                  selectedCountriesGlobal.push(countryName);
                  if (markerElement) {
                    markerElement.className = "icon-marker selected-marker";
                  }
                } else {
                  selectedCountriesGlobal.splice(index, 1);
                  if (markerElement) {
                    markerElement.className = "icon-marker";
                  }
                }
                updateParentState([...selectedCountriesGlobal]);
              }
            },
          });
          map.on({
            click: function () {
              isClicked = false;
              document.getElementById(_id).className =
                "icon-marker-tooltip close";
            },
            popupclose: function () {
              isClicked = false;
              document.getElementById(_id).className =
                "icon-marker-tooltip close";
            },
          });
          return marker;
        },
      });
      geoJsonLayers.setStyle({
        color: "#ff2d00",
        fillColor: "#010101",
        opacity: 1,
        weight: 100,
      });
      geoJsonLayers.addTo(map);
    }

    setupMap();
  };

  render() {
    const { selectedCountries } = this.state;
    const { t } = this.props;

    const mapSettings = {
      center: CENTER,
      defaultBaseMap: "OpenStreetMap",
      zoom: DEFAULT_ZOOM,
      mapEffect: this.mapEffect,
    };

    return (
      <Layout pageName="home">
        <Helmet
          meta={[
            {
              name: "description",
              content: t("home.description"),
            },
            {
              name: "keywords",
              content: t("home.keywords"),
            },
          ]}
        >
          <html lang={this.props.i18n.language || "es"} />
          <title>{t("home.title")}</title>
        </Helmet>
        <Map {...mapSettings} />

        <div className="floating-comparison-panel">
          <div className="panel-content">
            {!this.state.compareMode ? (
              <button className="btn-compare" onClick={this.toggleCompareMode}>
                {t("home.compareCountries")}
              </button>
            ) : (
              <>
                <div className="panel-header">
                  <span className="selection-count">
                    {selectedCountries.length} {t("home.selected")}
                  </span>
                  <button
                    className="btn-clear-small"
                    onClick={this.clearSelection}
                    title={t("home.clearSelection")}
                  >
                    ✕
                  </button>
                </div>
                {selectedCountries.length > 1 && (
                  <button className="btn-confirm" onClick={this.goToComparison}>
                    {t("home.confirmComparison")}
                  </button>
                )}
                <button className="btn-cancel" onClick={this.toggleCompareMode}>
                  {t("home.cancel")}
                </button>
              </>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default withTranslation()(IndexPage);
