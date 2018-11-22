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
                  content: `Learn how to create business applications with the Thinkwise Software Factory development environment.`,
                  image: `${siteConfig.baseUrl}img/SF.png`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/sf/sf_general.html`,
                  imageAlt: 'Thinkwise Software Factory',
                  title: 'Thinkwise Software Factory',
                  //title: `[Thinkwise Software Factory](${siteConfig.baseUrl}docs/sf/sf_general.html)`,
                },
                {
                  content: `Manage your applications, users and preferences with the Thinkwise Intelligent Application Manager.`,
                  image: `${siteConfig.baseUrl}img/IAM2.png`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/iam/iam_general.html`,
                  imageAlt: 'Intelligent Application Manager',
                  title: 'Intelligent Application Manager',
                  //title: `[Intelligent Application Manager](${siteConfig.baseUrl}docs/iam/iam_general.html')`,
                },
                {
                  content: 'Work with the OData API of the Thinkwise Indicium Application Tier.',
                  image: `${siteConfig.baseUrl}img/Indicium.png`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/indicium/indicium_general.html`,
                  imageAlt: 'Indicium Application Tier',
                  title: 'Indicium Application Tier',
                  //title: `[Indicium Application Tier](${siteConfig.baseUrl}docs/indicium/indicium_general.html)`,
                },
              ]}
              layout="threeColumn"
            />
            <br />
            <br />
            <GridBlock
              align="center"
              contents={[
                {
                  content: `In-depth information on working with the Thinkwise Platform.`,
                  image: `${siteConfig.baseUrl}img/Knowledge Base.png`,
                  imageAlign: 'top',
                  imageLink: `${siteConfig.baseUrl}docs/kb/kb_general.html`,
                  imageAlt: 'Knowledge Base',
                  title: 'Knowledge Base',
                  //title: `[Knowledge Base](${siteConfig.baseUrl}docs/kb/kb_general.html)`,
                },
                {
                  content: `Become even better with Thinkwise. Follow online courses to learn all about the Thinkwise Platform.`,
                  image: `${siteConfig.baseUrl}img/Learn.png`,
                  imageAlign: 'top',
                  imageLink: 'https://thinkwisesoftware.docebosaas.com/learn',
                  imageAlt: 'Learn',
                  title: 'Learn',
                  //title: `[Learn](https://thinkwisesoftware.docebosaas.com/learn)`,
                },
                {
                  content: `Coming soon!`, //Need more help? Join our community!`,
                  image: `${siteConfig.baseUrl}img/Community.png`,
                  imageAlign: 'top',
                  //imageLink: 'https://www.thinkwisesoftware.com',
                  imageAlt: 'Community',
                  title: 'Community',
                  //title: `[Community](https://www.thinkwisesoftware.com/)`,
                },
              ]}
              layout="threeColumn"
            />
          </Container>
        </div>
    );
  }
}

module.exports = Index;