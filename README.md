## Thinkwise Platform Documentation

This project contains all platform related documentation, a knowledge base and information (blog posts) on new releases.
<https://docs.thinkwisesoftware.com/>

## Build status

[![Build Status](https://dev.azure.com/thinkwise/Documentation/_apis/build/status/GitHub?branchName=master)](https://dev.azure.com/thinkwise/Documentation/_build/latest?definitionId=92&branchName=master)

[![Netlify Status](https://api.netlify.com/api/v1/badges/2c420caa-76fe-4666-8584-c3258d07a869/deploy-status)](https://app.netlify.com/sites/thinkwise-docs/deploys)

## Code style

Please use the [vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint) extension.

## Framework

Built with [Docusaurus](https://docusaurus.io/).

## Installation

For detailed requirements and instructions, see the [Docusaurus docs](https://docusaurus.io/docs/en/installation).

1. Install Docusaurus

   ```sh
   yarn install
   ```

2. Start the website

   ```sh
   yarn start
   ```

## Guidelines

See the [markdownlint rules](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md). Some overrides are defined in the `.markdownlint.json` configuration file.

### New pages

New pages need to be registered in `sidebars.json`.

Start every page with a [YAML front matter](http://assemble.io/docs/YAML-front-matter.html) title definition. This title is displayed in the sidebar and at the top of the page.

```yaml
---
title: Title of the page 
---
```

Start with level two `##` heading and always increment headings by one level.

### Images

Images are stored in the `/docs/assets` folder and must be referenced like this: `assets/image.png`. Don't use relative paths like `../assets/image.png` as this breaks the versioning.

See the [Docusaurus documentation](https://docusaurus.io/docs/en/doc-markdown#linking-to-images-and-other-assets) for more information.

### Preview changes

To preview changes, select the _Next_ version from the versions page.
A netlify preview is automatically created for every pull request.
