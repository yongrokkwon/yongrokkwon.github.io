const config = require('./src/config');

module.exports = {
  flags: {
    PARALLEL_QUERY_RUNNING: false,
  },
  pathPrefix: '/',
  siteMetadata: {
    title: '권용록 | Software Engineer',
    description:
      '모바일 중심 7년차 소프트웨어 엔지니어. TADA, 태그리스 페이 등 대규모 서비스 개발 경험을 바탕으로 백엔드·인프라까지 아우릅니다.',
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
        name: '권용록 | Software Engineer',
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
