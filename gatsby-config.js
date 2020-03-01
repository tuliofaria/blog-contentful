module.exports = {
  plugins: [
    'gatsby-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'g1ecbu0htf91',
        accessToken: '0OnSqoRx81vzRSC63TWcdsFmWtGT4biPxY3HQ76cpX0',
        downloadLocal: true
      }
    }
  ]
}
