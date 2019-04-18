---
title: Deployment package
---

Deployment packages provide a way to easily deploy applications created with the Thinkwise Platform to different locations, customers or tenants.
Deployment packages can be executed using the [Thinkwise Deployment Center](../kb/deployer), either using the graphical user interface (GUI) or the command line interface (CLI). The CLI can also be used together with deployment and release management tools like [Octopus Deploy](https://octopus.com) to automate deployments.

A deployment package for a project version can be created using the *Deployment package* screen.

Clicking the *Create deployment package* task will:

- generate the project version definition
- validate the project version definition
- generate the project version code for the full install and smart upgrade
- generate the synchronization script for IAM
- generate the manifest for the Thinkwise Deployment Center
- copy all assets used by the project version, like reports and icons

![](assets/sf/create_deployment_package.png)

> Creating a deployment package can take a while, so please be patient!

The *History* tab page shows a list of previously created deployment packages.