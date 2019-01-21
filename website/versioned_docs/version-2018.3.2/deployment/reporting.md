---
title: Crystal Reports
id: version-2018.3.2-reporting
original_id: reporting
---

To use Crystal Reports in the Windows GUI, Web GUI or Indicium application tier, the Crystal Reports drivers must be installed on the client or web server. 
This concerns Crystal Reports Runtime 13 with service pack 20 for the right OS. With both, the support for the ASP.NET Web components
must be installed.

> Service Pack 21 and up are currently [incompatible](https://wiki.scn.sap.com/wiki/display/BOBJ/Crystal+Reports%2C+Developer+for+Visual+Studio+Downloads) with the Thinkwise user interfaces.

- [SAP Crystal Reports Runtime 13.0.20 (32 Bit)](http://downloads.businessobjects.com/akdlm/cr4vs2010/CRforVS_redist_install_32bit_13_0_20.zip)
- [SAP Crystal Reports Runtime 13.0.20 (64 Bit)](http://downloads.businessobjects.com/akdlm/cr4vs2010/CRforVS_redist_install_64bit_13_0_20.zip)

(Source: <https://www.crystalreports.com/crvs/confirm/>)

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
