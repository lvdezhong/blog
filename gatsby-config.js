module.exports = {
  siteMetadata: {
    title: 'blog',
    description: `前端、React、Typescript`,
    author: 'ldz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-code-notes',
      options: {
        contentPath: 'notes',
        basePath: '/',
        showThemeInfo: false,
        showDescriptionInSidebar: true,
        showDate: true,
        // gitRepoContentPath: 'https://github.com/mrmartineau/gatsby-starter-code-notes/tree/master/notes',
        // openSearch: {
        //   siteShortName: `My Code Notes`,
        //   siteUrl: 'https://my-website.com',
        //   siteTags: 'code',
        //   siteContact: 'https://twitter.com/???',
        //   siteDescription:
        //     'Code Notes',
        // },
      },
    },
  ],
}
