/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');

const Container = CompLibrary.Container;

const CWD = process.cwd();

const siteConfig = require(`${CWD}/siteConfig.js`);
const versions = require(`${CWD}/versions.json`);

function Versions() {
  const latestVersion = versions[0];
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${
    siteConfig.projectName
    }`;
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer versionsContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Thinkwise Platform Documentation</h1>
          </header>
          <p>Select your Thinkwise Platform version.</p>
          <h3 id="latest">Latest version</h3>
          <p>
            <a href="docs/sf/sf_general.html">{latestVersion}</a>
          </p>
          <h3 id="archive">Previous versions</h3>
          {versions.map(
            version =>
              version !== latestVersion && (
                <p key={version}>
                  <a href={`docs/${version}/sf/sf_general.html`}>{version}</a>
                </p>
              ),
          )}
          <h3 id="rc">Next version</h3>
          <p>
            <a href="docs/next/sf/sf_general.html">next</a>
          </p>
        </div>
      </Container>
    </div>
  );
}

module.exports = Versions;
