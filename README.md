## Thinkwise Platform Documentation

This project contains all platform related documentation, a knowledge base and information (blog posts) on new releases.

## Build status

[![Build status](../assets/Documentation-CI.svg)](https://dev.azure.com/thinkwise/Documentation/_build/latest?definitionId=57)

## Code style

Please use the [vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint) extension.

[![js-standard-style](../assets/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d7374616e646172642d627269676874677265656e2e7376673f7374796c653d666c6174.svg)]()

## Framework

Built with [Docusaurus](https://docusaurus.io/).

## Installation

For detailed requirements and instructions, see the [Docusaurus docs](https://docusaurus.io/docs/en/installation).

1. Install Docusaurus

   ```
   cd website
   npm install
   ```

2. Start the website

   ```
   npm start
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

Images are stored in the `/docs/assets` folder and referenced using a relative path, e.g. `..\assets\image.png`.

Use Visual Studio Code with the [vscode-markdown-paste-image](https://github.com/telesoho/vscode-markdown-paste-image) exension or [Typora](https://typora.io/) to auto copy images on paste.

![1538725116127](../assets/1538725116127.png)