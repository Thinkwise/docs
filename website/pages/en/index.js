/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const siteConfig = require(`${process.cwd()}/siteConfig.js`);

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

class Index extends React.Component {
  render() {
    const language = this.props.language || 'en';
    //const pinnedUsersToShowcase = siteConfig.users.filter(user => user.pinned);

    return (
        <div className="mainContainer">
          <Container>
            <GridBlock
              align="center"
              contents={[
                {
                  content: 'A high level overview of the Thinkwise Platform.',
                  image: `${siteConfig.baseUrl}img/Indicium.jpg`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/platform_overview.html`,
                  imageAlt: 'Overview',
                  title: `[Overview](${siteConfig.baseUrl}docs/platform_overview.html)`,
                },
                {
                  content: `Learn how to create business applications with the Thinkwise Software Factory development environment.`,
                  image: `${siteConfig.baseUrl}img/SF.jpg`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/sf/sf_general.html`,
                  imageAlt: 'Thinkwise Software Factory',
                  title: `[Thinkwise Software Factory](${siteConfig.baseUrl}docs/sf/sf_general.html)`,
                },
                {
                  content: `Manage your applications, users and preferences with the Thinkwise Intelligent Application Manager.`,
                  image: `${siteConfig.baseUrl}img/IAM.jpg`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/iam/iam_general.html`,
                  imageAlt: 'Intelligent Application Manager',
                  title: `[Intelligent Application Manager](${siteConfig.baseUrl}docs/iam/iam_general.html)`,
                },
                {
                  content: 'Work with the OData API of the Thinkwise Indicium Application Tier.',
                  image: `${siteConfig.baseUrl}img/Indicium.jpg`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/indicium/indicium_general.html`,
                  imageAlt: 'Indicium Application Tier',
                  title: `[Indicium Application Tier](${siteConfig.baseUrl}docs/indicium/indicium_general.html)`,
                },
              ]}
              layout="fourColumn"
            />
            <br />
            <GridBlock
              align="center"
              contents={[
                {
                  content: `Deploying the Thinkwise Platform and applications.`,
                  image: `${siteConfig.baseUrl}img/Knowledge Base.jpg`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/kb/kb_general.html`,
                  imageAlt: 'Deployment',
                  title: `[Deployment](${siteConfig.baseUrl}docs/kb/kb_general.html)`,
                },
                {
                  content: `In-depth information on working with the Thinkwise Platform.`,
                  image: `${siteConfig.baseUrl}img/Knowledge Base.jpg`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/kb/kb_general.html`,
                  imageAlt: 'Knowledge Base',
                  title: `[Knowledge Base](${siteConfig.baseUrl}docs/kb/kb_general.html)`,
                },                
                {
                  content: `Learn about Thinkwise Platform releases and updates.`,
                  image: `${siteConfig.baseUrl}img/Knowledge Base.jpg`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/kb/kb_general.html`,
                  imageAlt: 'Releases',
                  title: `[Releases](${siteConfig.baseUrl}docs/kb/kb_general.html)`,
                },
                {
                  content: `The Thinkwise Platform Upcycler.`,
                  image: `${siteConfig.baseUrl}img/Learn.jpg`,
                  imageAlign: 'top',
                  imageLink: 'https://thinkwisesoftware.docebosaas.com/learn',
                  imageAlt: 'Upcycler',
                  title: `[Upcycler](https://thinkwisesoftware.docebosaas.com/learn)`,
                },
              ]}
              layout="fourColumn"
            />
<br />
            <GridBlock
              align="center"
              contents={[
                {
                  content: `In-depth information on working with the Thinkwise Platform.`,
                  image: `${siteConfig.baseUrl}img/Knowledge Base.jpg`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/kb/kb_general.html`,
                  imageAlt: 'Knowledge Base',
                  title: `[Knowledge Base](${siteConfig.baseUrl}docs/kb/kb_general.html)`,
                },
                {
                  content: `Become even better with Thinkwise. Follow online courses to learn all about the Thinkwise Platform.`,
                  image: `${siteConfig.baseUrl}img/Learn.jpg`,
                  imageAlign: 'top',
                  imageLink: 'https://thinkwisesoftware.docebosaas.com/learn',
                  imageAlt: 'Learn',
                  title: `[Learn](https://thinkwisesoftware.docebosaas.com/learn)`,
                },
                {
                  content: `Ask a question, submit your idea or get inspired by our blogs in the Thinkwise Community.`, //Need more help? Join our community!`,
                  image: `${siteConfig.baseUrl}img/Community.jpg`,
                  imageAlign: 'top',
                  imageLink: 'https://community.thinkwisesoftware.com',
                  imageAlt: 'Community',
                  title: `[Community](https://community.thinkwisesoftware.com/)`,
                },
              ]}
              layout="fourColumn"
            />        
          </Container>  
            <Container background="light" padding={['top', 'bottom']}>
              <GridBlock
                align="left"
                contents={[
                  {
                    content: `Ask a question, submit your idea or get inspired by our blogs in the Thinkwise Community.`, 
                    image: `${siteConfig.baseUrl}img/Community.jpg`,
                    imageAlign: 'right',
                    imageLink: 'https://community.thinkwisesoftware.com',
                    imageAlt: 'Community',
                    title: `[Community](https://community.thinkwisesoftware.com/)`,
                  },
                ]}
                layout="twoColumn"
              /> 
          </Container>
            <Container padding={['top', 'bottom']}>
              <GridBlock
                align="left"
                contents={[
                  {
                    content: `Become even better with Thinkwise. Follow online courses to learn all about the Thinkwise Platform.`,
                    image: `${siteConfig.baseUrl}img/Learn.jpg`,
                    imageAlign: 'left',
                    imageLink: 'https://thinkwisesoftware.docebosaas.com/learn',
                    imageAlt: 'Learn',
                    title: `[Learn](https://thinkwisesoftware.docebosaas.com/learn)`,
                  },
                ]}
                layout="twoColumn"
              />            
            </Container>
        </div>
    );
  }
}

module.exports = Index;