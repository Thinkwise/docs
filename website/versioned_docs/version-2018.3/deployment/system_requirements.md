---
title: System requirements
id: version-2018.3-system_requirements
original_id: system_requirements
---

When you install the Thinkwise Platform there are a number of hardware requirements and guidelines for the
various components. These requirements and guidelines are described here. Software requirements are listed in the Thinkwise [Lifecycle policy](../kb/lifecycle_policy).

The performance of Thinkwise applications is, of course, dependent on the hardware but to a considerable extent also on the design of your application. Tips about performance tuning your applications can be found [here](../kb/performance).

If you have any additional questions regarding the installation please contact your Thinkwise representative.

## Cloud hosting

It is possible to host the Thinkwise Platform and end products in a cloud environment and access it from a Windows, Web or Mobile user interface, using cloud providers that offer (Windows) Virtual Machines.

Dedicated SQL Server cloud solutions, such as Windows Azure SQL Database, are also supported as long as the required features are available. These solutions often offer a stripped-down version of SQL Server, without support, for example, for Integration Services, CLR procedures, Full Text Search and Profiling.

## Database management systems

The Thinkwise Platform supports the following database management systems:

- SQL Server
- IBM i DB2 (AS400)
- Oracle Database

The Software Factory development environment and the Intelligent Application Manager are delivered on SQL Server. If you do not have an SQL Server environment then such an environment must be set up.

The supported versions of the database management systems are described [here](../kb/lifecycle_policy#database-management-systems).

### SQL Server editions

All editions of SQL Server, including the free Express edition, are supported. Be aware however that there are differences in the supported features regarding, for example, scheduling and database mail. A requirement for the development environment is that the Full-Text Search feature is supported and installed.

An overview of the different editions and supported features can be found here:

- <http://msdn.microsoft.com/en-us/library/cc645993.aspx>

Hardware and Software Requirements for Installing SQL Server are listed here:

- <http://msdn.microsoft.com/en-us/library/ms143506.aspx>

## Indicium Application Tier

The Thinkwise Indicium Application Tier is a .NET Core application. The preferred deployment method is using a Microsoft Internet Information Services application server. The minimum requirements with regard to the application server depend on the expected load that the Application Tier must be able to handle, for example:

- The number of concurrent users
- The size and nature of the application
- The amount of data in the application
- Organizational requirements regarding performance

The minimum hardware requirements are as follows:

|            | Minimum requirement |
| ---------- | ------------------- |
| Processor  | 2 GHz dual core     |
| Memory     | 4 GB RAM            |
| Disk space | 500 MB free         |

## Thinkwise User Interfaces

Thinkwise Graphical User Interfaces (GUIs) are available for desktop, web and mobile devices. The Software Factory development environment requires the Windows GUI.

### Windows Desktop GUI

The Windows GUI is a desktop client and requires the Microsoft .NET Framework. Minimum hardware requirements for de Windows GUI are:

|            | Minimum requirements  |
| ---------- | --------------------- |
| Processor  | 1 GHz                 |
| Memory     | 2 GB RAM              |
| Disk space | 200 MB free           |
| Monitor    | 1600 x 900 resolution |

The Windows GUI is compatible with 32 and 64-bit environments.

#### Terminal Services and Virtualisation

The Windows GUI is also suitable for use via Remote Desktop Services or in combination with Desktop (VDI) or Application Virtualization, such as:

- Microsoft App-V
- Microsoft Remote Desktop Services (RDS)
- Citrix XenDesktop
- Citrix XenApp
- VMWare View
- VMWare ThinApp

Depending on the amount of data and the use of the application the Windows GUI requires between 30 and 100 megabytes (MB) RAM memory per user.

For more information about RDS server requirements, see:

- <http://www.ceservices.com/sites/default/files/resources/docs-protected/CES_RemoteDesktops_1.pdf>

### Web GUI

The ASP.NET Web GUI uses a Microsoft Internet Information Services web server and can be used in all common browsers.

The table below provides an overview of the minimum hardware requirements to run the Web GUI. To give a well-founded recommendation, your specific situation must be analysed first. A load test of your current web environment may be required.

The following factors affect the system requirements:

- The number of concurrent users
- The size and nature of the application
- The amount of data in the application
- Organizational requirements regarding performance

Minimum hardware requirements:

|            | Minimum requirements |
| ---------- | -------------------- |
| Processor  | 2 GHz dual core      |
| Memory     | 4 GB RAM             |
| Disk space | 500 MB free          |

Depending on the amount of data and the use of the application the Web GUI requires a basic minimum of between 100
and 200 MB RAM plus between 2 and 20 MB per user.

In addition to the above information you should also take into account the provision of a web address to make the Web GUI via Internet. You can find more documentation about this [here](iis).

### Mobile GUI

The Thinkwise Mobile GUI makes use of the PhoneGap/Cordova platform and is therefore suitable for use on all major mobile operating systems.

The minimum hardware requirements are very much dependent on the application, but a minimum of 1 GB RAM is adviced.

## Reporting

The Thinkwise Platform supports various reporting solutions for creating integrated reports. Some of these solutions require addional report designer licenses and runtime components to be installed.

| Reporting solution  |       Designer        | Requires runtime |
| ------------------- | :-------------------: | :--------------: |
| DevExpress          | Provided by Thinkwise |        No        |
| Crystal Reports     |         Paid          |       Yes        |
| Microsoft Word      |         Word          |    Yes (Word)    |
| Aia Software ITP    |         Paid          |       Yes        |
| I-net Clear Reports |         Paid          |       Yes        |

## Drivers

Certain features of the Thinkwise Platform require additional drivers to be installed. Click on a link for more information.

- [IBM i DB2](db2)
- [Oracle Database](http://www.oracle.com/technetwork/topics/dotnet/downloads/index.html)
- [Crystal Reports](reporting)

## Exchange integration

Applications developed with the Thinkwise Platform can make use of the Thinkwise Exchange Connector to synchronize emails, appointments, tasks and contacts. Exchange 2010 or higher is required.

More information on the Exchange Connector can be found [here](../kb/exchange).

## Monitoring

The Thinkwise platform offers extensive options for monitoring the quality and continuity of Thinkwise
applications. In addition to this, however, it is _essential_ to also monitor the infrastructure, such as
network, servers and PCs, and mobile devices with an appropriate solution.

Microsoft System Center, PRTG, Zabbix or Nagios can, for example, be used to monitor the network and resources on servers.

For Mobile Device Management you can use, for example, Microsoft Intune, Citrix XenMobile, VMWare Airwatch or MobileIron.

## Remote access

Thinkwise wants to offer you optimal support. To achieve this it is necessary that Thinkwise can offer support remotely. There must therefore be a method available for remote login for authorised Thinkwise employees.

