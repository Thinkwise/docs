---
title: Introduction
---

The Thinkwise Reporting Service is a Windows service (also available as a console application) that facilitates automatic printing and/or exporting to a file location of reports.
It currently supports the following report types:

* [SAP Crystal Reports 2013](../../deployment/reporting.html)
* SQL Server Reporting Services (SSRS)
* DevExpress Reports

> For Crystal Reports please apply the same installation rules as one would when using the Thinkwise GUIs and be sure to install the 64 Bit version of the runtime.
>
> The 32 Bit runtime does not work with the Thinkwise Reporting Service.

The service is built for .NET Framework 4.5 and is available as a Windows service (through an installer) or as a standalone console application.
Both of which can be downloaded from [TCP](https://office.thinkwisesoftware.com/tcp).

To support Crystal Reports reports the service was built against the 64 Bit version of the Crystal Reports runtime.
Because of this the service will only work on operating systems that support 64 Bit applications.
