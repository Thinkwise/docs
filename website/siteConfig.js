/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/thinkwise.svg'.
    image: '/img/thinkwise.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Thinkwise Docs' /* title for your website */,
  tagline: 'Documentation',
  url: 'https://www.thinkwisesoftware.com' /* your website url */,
  baseUrl: '/',
  //baseUrl: '/docs/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'Thinkwise Docs',
  organizationName: 'Thinkwise',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'platform_overview', label: 'Overview'},
    {doc: 'sf/sf_general', label: 'SF'},
    {doc: 'iam/iam_general', label: 'IAM'},
    {doc: 'indicium/indicium_general', label: 'Indicium'},
    // {doc: 'deployment/deployment_general', label: 'Deployment'},
    // {doc: 'kb/kb_general', label: 'Knowledge base'},
    //{page: 'help', label: 'Help'}
    {blog: true, label: 'Releases'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/thinkwhite.png',
  footerIcon: 'img/thinkwise.svg',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    primaryColor: '#23A8E0',
    secondaryColor: '#2268A4',
  },

  stylesheets: [
    "https://fonts.googleapis.com/css?family=Montserrat:400,400i,600"
  ],  

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' + new Date().getFullYear() + ' Thinkwise',

  rights:
    'No rights can be derived from the contents of this website.',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'monokai-sublime',
    defaultLang: 'sql'
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js',
    'https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js',
    '//embeddable-widgets.insided.com/thinkwise-en.insided-conversational.js'
    ],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  // ogImage: 'img/docusaurus.png',
  // twitterImage: 'img/docusaurus.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',

  algolia: {
    apiKey: '80fc82eb19522b03c3400dd67daefaa3',
    indexName: 'thinkwise',
    algoliaOptions: {   
      facetFilters: [ "version:VERSION" ] 
    },
    placeholder: ' '
  },

  blogSidebarTitle: { 
    default: 'Recent updates', 
    all: 'All updates' 
  },

  editUrl: 'https://github.com/Thinkwise/docs/blob/master/docs/',
    
  enableUpdateTime: false,
  cleanUrl: false, // Setting this to True breaks relative urls like ../assets/sf/image.png
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
  
  // Google analytics
  gaTrackingId: 'UA-131222061-1',
  gaGtag: true,
  
  // Collapsible categories
  docsSideNavCollapsible: true  
};

module.exports = siteConfig;
