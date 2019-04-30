---
title: IBM i DB2
id: version-2018.3-db2
original_id: db2
---

## Drivers

For applications running on an IBM i DB2 database, the correct drivers must be installed to be able to use the Windows GUI, Web GUI and Indicium application tier.
This concerns the *IBM i Access for Windows - .NET Data Provider*. The required version depends on the IBM i version used on the server, for example, 6.1 or 7.3.

Make sure the latest service packs are installed.
Service Packs can be found [here](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/IBM%20i%20Technology%20Updates/page/IBM%20i%20Access%20for%20Windows%20-%20Service%20Packs).

![](assets/deployment/fe29bbdd01abead14d6cce6b9e767dbf5c690267.png)
*Installing the IBM i Access .NET Data Provider*

## Ports

The database provider uses various network ports to connect with the database server. Ports **8470, 8471, 8475 and 8476**
must be available from the client. If these ports are not open, setting up a connection can take a very long time.

Additional information is available on the following website. An overview of all port numbers that are used by this
driver and what each port is used for can also be found here: <https://www-304.ibm.com/support/docview.wss?uid=nas8N1019667>.

Troubleshooting instructions are available here: <http://www-01.ibm.com/support/docview.wss?uid=nas8N1019611>

## Expired passwords

In order to be able to use the expired password functionality for IBM i DB2, it is necessary that service pack `SI44594_64a` or higher is
installed. You can download the latest service pack [here](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/IBM%20i%20Technology%20Updates/page/IBM%20i%20Access%20for%20Windows%20-%20Service%20Packs).

## Logging & Tracing

Logging and tracing DB2 connections can be enabled in the registry using the following keys (32/64 bit):

- `HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\IBM\Client Access\CurrentVersion\Common\ManagedProvider\Service`
- `HKEY_LOCAL_MACHINE\SOFTWARE \IBM\Client Access\CurrentVersion\Common\ManagedProvider\Service`

![](assets/deployment/5703f3171005d6ee0923ddcaac6fb5b659bb307b.png)

## Performance optimizations

The performance of database connections and SQL on DB2 for IBM i can be improved with the following settings:

1. Ports - Make sure the required [ports](#ports) are open.
1. Prestarted Jobs - Creating connections (jobs) takes a relatively long time on an IBM i.
   By using *Prestarted jobs* these connections are prepared in advance.
   Set up the IBM i so that enough prestarted jobs are always available. See .
1. Separate sub-system - Query plans remain valid as long as the environment variables (load, disk space, free memory) remain stable.
   Therefore, it is wise to place the QZDASOINIT tasks into a separate sub-system on the basis of, for example, an IP address.
1. Plan cache - Increase the plan cache with the `QQQOOOCACH` command so that query plans remain available sufficiently long enough in the cache.

More information on prestarted jobs, subsystems and the plan cache can be found [here](http://pic.dhe.ibm.com/infocenter/iseries/v7r1m0/index.jsp?topic=%2Fddp%2Frbal1usepsj.htm).

### Firewall
