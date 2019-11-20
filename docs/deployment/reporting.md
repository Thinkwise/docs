---
title: Crystal Reports
---

To use Crystal Reports in the Windows GUI, Web GUI or Indicium application tier, the Crystal Reports drivers must be installed on the client or web server.
This concerns Crystal Reports Runtime 13 with service pack 21 or up for the right OS. With both, the support for the ASP.NET Web components
must be installed.

The latest Crystal Reports Runtime Engine (32/64 Bit) can be downloaded [here](https://www.crystalreports.com/crvs/confirm/) or using these direct links to version 13.0.25:

- [SAP Crystal Reports Runtime 13.0.25 (32 Bit)](http://downloads.businessobjects.com/akdlm/cr4vs2010/CRforVS_redist_install_32bit_13_0_25.zip)
- [SAP Crystal Reports Runtime 13.0.25 (64 Bit)](http://downloads.businessobjects.com/akdlm/cr4vs2010/CRforVS_redist_install_64bit_13_0_25.zip)

For the Web GUI, the Crystal Reports installation creates a new directory to IIS with the name `aspnet_client`. This directory contains
the resources (HTML, JavaScript and CSS) which the Web GUI needs for the preview of reports. If the application is not
deployed in the IIS default website, then the `aspnet_client` directory can be copied to the corresponding website.

If the browser in which the preview is opened cannot access the `aspnet_client` folder, then a blank preview dialogue will open.
The unsuccessful request and what this refers to can be traced in the *Network* tab of the browsers *Developer Tools (F12)*. 
The unsuccessful request is colored red and refers to `/aspnet_client/...`

Check on the web server why this request gives no result. The folder within `aspnet_client\system_web` possibly contains an
incorrect version number and may have to be renamed.

> If the report file is stored on a network location, then UNC paths must be used. For example: `//everest/data`
> instead of `S:\`.

## Previous versions

Versions of the Thinkwise Windows and Web user interfaces *before 2019.2.15*, the Indicium application tier *before 2019.2.5* and the Thinkwise Reporting service *before 4.0* require
service pack **21** of the Crystel Reports Runtime Engine, due to Crystal Reports [compatibility issues](https://wiki.scn.sap.com/wiki/display/BOBJ/Crystal+Reports%2C+Developer+for+Visual+Studio+Downloads).

Downloads are available for [32 Bit](http://downloads.businessobjects.com/akdlm/cr4vs2010/CRforVS_redist_install_32bit_13_0_20.zip) and [64 Bit](http://downloads.businessobjects.com/akdlm/cr4vs2010/CRforVS_redist_install_64bit_13_0_20.zip).

