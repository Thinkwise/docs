---
title: Lifecycle policy
---

The Thinkwise Lifecycle Policy provides consistent and predictable guidelines for the availability of support throughout the lifecycle of a product.

Thinkwise reserves the right to adjust this lifecycle policy if necessary. The availability of support is subject to technical and economic feasibility.

## Thinkwise Platform

Support for a version of the Thinkwise Platform ends **18 months** after the next release. The Thinkwise Software Factory and Intelligent Application Manager have a release cycle of approximately three to six months.

Critical hotfixes are provided for all supported versions. Non-critical hotfixes are provided for the current version only.

| **SF and IAM version** | **Lifecycle Start Date** | **Support End Date** |
| :--------------------: | :----------------------: | :------------------: |
|         2017.1         |         Jun-2017         |       Jul-2019       |
|         2018.1         |         Jan-2018         |       Nov-2019       |
|         2018.2         |         May-2018         |      _May-2020_      |
|         2018.3         |         Nov-2018         |      _Nov-2020_      |
|         2019.1         |         May-2019         |      _Mar-2021_      |
|         2019.2         |         Sep-2019         |      _Aug-2021_      |
|         2020.1         |         Feb-2020         |                      |

### Runtime components

The runtime components of the Thinkwise Platform (user interfaces and application tier) have a release cycle of two to four weeks. Every release is compatible with the supported Platform versions and technologies (see below) at the time of release.

Due to technical limitations, newly introduced features may deviate from this by only offering support for more recent versions and technologies.

## Supported technologies

### Database management systems

Support for a database management system version is provided for at least as long as the **mainstream** or **premier** support period as defined by the supplier of the database management system.

Thinkwise will inform its customers when a database management system version is no longer supported in due course.

#### Microsoft SQL Server

(Source: [Microsoft Lifecycle Policy](https://support.microsoft.com/en-us/hub/4095338/microsoft-lifecycle-policy))

| **SQL Server version** | **Lifecycle Start Date** | **Support End Date** | Thinkwise<br>Support End Date |
| :--------------------: | :----------------------: | :------------------: | :---------------------------: |
|        2008 R2         |         Jul-2010         |       Jul-2014       |           Oct-2018            |
|          2012          |         May-2012         |       Jul-2017       |          Jan-2020\*           |
|          2014          |         Jun-2014         |       Jul-2019       |          Jan-2020\*           |
|          2016          |         Jun-2016         |       Jul-2021       |                               |
|          2017          |         Sep-2017         |       Oct-2022       |                               |
|          2019          |         Aug-2019         |       Jul-2025       |                               |

> \* This currently only applies to the Software Factory development environment.
> For end products, including the Thinkwise Intelligent Application Manager, SQL Server 2012 and 2014 support ends **June 2020**.
>
> More information can be found [here](https://community.thinkwisesoftware.com/blogs-21/end-of-sql-server-2012-2014-support-820).

#### DB2 for IBM i

(Source: [IBM Software Lifecycle](https://www-01.ibm.com/software/support/lifecycleapp/PLCSearch.wss?q=%22ibm+i%22))

| **DB2 for IBM i version** | **Lifecycle Start Date** | **Support End Date** | Thinkwise<br>Support End Date |
| :-----------------------: | :----------------------: | :------------------: | :---------------------------: |
|            7.1            |         Apr-2010         |       Apr-2018       |                               |
|            7.2            |         May-2014         |                      |                               |
|            7.3            |         Apr-2016         |                      |                               |

#### Oracle Database

(Source: [Oracle Lifetime Support](http://www.oracle.com/us/support/library/lsp-tech-chart-069290.pdf))

| **Oracle Database version** | **Lifecycle Start Date** | **Support End Date** | Thinkwise<br>Support End Date |
| :-------------------------: | :----------------------: | :------------------: | :---------------------------: |
|           12c R1            |         Jul-2013         |       Jul-2018       |                               |
|           12c R2            |         Sep-2016         |       Mar-2022       |                               |
|             18c             |         Feb-2018         |                      |                               |
|             19c             |         Apr-2019         |                      |                               |

### .NET Framework

Support for a version of the .NET Framework, required by the Thinkwise Windows, Web user interfaces and the Indicium Application Tier, ends at least **18 months** after the next .NET Framework release.

Thinkwise will inform its customers when a .NET Framework version is no longer supported in due course.

(Source: [Microsoft Lifecycle Policy](https://support.microsoft.com/en-us/hub/4095338/microsoft-lifecycle-policy))

| **.NET Framework version** | **Lifecycle Start Date** | **Support End Date** | Thinkwise<br>Support End Date |
| :------------------------: | :----------------------: | :------------------: | :---------------------------: |
|            4.5             |         Sep-2012         |       Jan-2017       |           Oct-2018            |
|            4.6             |         Jul-2015         |       Oct-2018       |           Oct-2018            |
|            4.7             |         Apr-2017         |                      |                               |

### Internet Information Services

Support for an Internet Information Services version is available at least as long as Microsoft provides **mainstream** support for that version.

Thinkwise will inform its customers when an Internet Information Services version is no longer supported in due course.

(Source: [Microsoft Lifecycle Policy](https://support.microsoft.com/en-us/hub/4095338/microsoft-lifecycle-policy))

| **IIS (Windows Server) version** | **Lifecycle Start Date** | **Support End Date** | Thinkwise<br>Support End Date |
| :------------------------------: | :----------------------: | :------------------: | :---------------------------: |
|          7.0 (2008 SP2)          |         Apr-2009         |       Jan-2015       |           Oct-2018            |
|        7.5 (2008 R2 SP1)         |         Feb-2011         |       Jan-2015       |           Oct-2018            |
|            8.0 (2012)            |         Oct-2012         |       Oct-2018       |              \*               |
|          8.5 (2012 R2)           |         Nov-2013         |       Oct-2018       |              \*               |
|           10.0 (2016)            |         Oct-2016         |       Nov-2022       |                               |

> \* We strongly advice IIS 10.0 due to the [support](https://docs.microsoft.com/en-us/iis/get-started/whats-new-in-iis-10/http2-on-iis) for HTTP/2.

### Browsers

#### Thinkwise Web User Interface

The Thinkwise Web user interface supports browser versions with a **market share of 2%** or more.

(Source: [StatCounter Global Stats](http://gs.statcounter.com/browser-version-partially-combined-market-share/desktop/worldwide/#monthly-202002-202002-bar))

| **Browser version** |
| :-----------------: |
|       Chrome        |
|     Firefox 5+      |
|      Safari 13      |
|       Edge 18       |
|       IE 11.0       |
|      Opera 15+      |

> The [Chromium-based](https://www.microsoft.com/en-us/edge) Edge browser is also supported.

#### Thinkwise Universal User Interface

The Thinkwise Universal user interface is currently in Beta and supports the following browsers:

| **Browser version** |
| :-----------------: |
|       Chrome        |
|     Firefox 5+      |
|      Safari 13      |
|      Edge 79+       |

> Only the [Chromium-based](https://www.microsoft.com/en-us/edge) Edge browser is supported.

### Mobile Operating Systems

The Thinkwise Mobile user interface supports the latest versions of iOS and Android and previous versions with a **market share of 4%** or more
for the respective operating systems in either Europe or North America.

(Source: StatCounter Mobile OS Market Share for iOS in
[North America](https://gs.statcounter.com/ios-version-market-share/mobile-tablet/north-america/#monthly-202002-202002-bar)
and [Europe](https://gs.statcounter.com/android-version-market-share/mobile-tablet/north-america/#monthly-202002-202002-bar)
and Android in
[North America](https://gs.statcounter.com/android-version-market-share/mobile-tablet/north-america/#monthly-202002-202002-bar)
and [Europe](https://gs.statcounter.com/android-version-market-share/mobile-tablet/europe/#monthly-202002-202002-bar).)

| **Mobile OS version** |
| :-------------------: |
|       iOS 13.3        |
|       iOS 12.4        |
|     Android 10.0      |
|      Android 9.0      |
|      Android 8.1      |
|      Android 8.0      |
|      Android 7.1      |
|      Android 7.0      |
|      Android 6.0      |
|      Android 5.1      |

