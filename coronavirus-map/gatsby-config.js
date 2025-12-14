module.exports = {
  plugins: [
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    'gatsby-plugin-react-leaflet',
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `COVID-19 REPORTS`,
    //     short_name: `COVIDREPORTS`,
    //     description: '',
    //     lang: '',
    //     start_url: `/`,
    //     background_color: `#f7f0eb`,
    //     theme_color: `#a2466c`,
    //     display: `standalone`,
    //     icon: `src/assets/images/coronavirus.png`
    //   }
    // },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/details/*`],
      },
    }
    
  ],
};
