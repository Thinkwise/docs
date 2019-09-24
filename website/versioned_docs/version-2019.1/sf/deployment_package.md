---
title: Deployment package
id: version-2019.1-deployment_package
original_id: deployment_package
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

Only assets within the project version folder are copied. Assets outside this folder can't be deployed correctly by the Deployment Center.

> Please note that creating a deployment package can take a while.

![](assets/sf/create_deployment_package.png)

The *History* tab page shows a list of previously created deployment packages.