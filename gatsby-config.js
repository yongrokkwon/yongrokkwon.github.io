const config = require('./src/config');

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: '권용록 | Android Software Engineer',
    description:
      '권용록은 Android 앱을 개발하는 소프트웨어 엔지니어입니다. TADA, 전자처방전 등 다양한 앱을 개발한 경험이 있습니다.',
    siteUrl: 'https://yongrokkwon.github.io', // No trailing slash allowed!
    image: '/og.png', // Path to your image you placed in the 'static' folder
    twitterUsername: '', // TODO: Twitter 계정 추가 시 설정
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: '권용록 | Android Software Engineer',
        short_name: '권용록',
        start_url: '/',
        background_color: config.colors.darkNavy,
        theme_color: config.colors.navy,
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-QQR2RJ43R3'],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
  ],
};
