---
title: Configuration
---

Some aspects of the Thinkwise Reporting service can be edited by modifying a configuration file.

This file is located in the service's installation directory and is called:

* ReportingService.exe.config for the Windows service version.
* ReportingConsole.exe.config for the standalone console application version.

The table below shows which options are available and what they do.

Configuration option | Default value | Description
---|---|---
Interval | 10000 | The interval between calls to [rpt_get_reports](architecture#rpt_get_reports) from the service in milliseconds.
ConcurrencyLevel | 5 | The amount of background workers used to process reports. The poller is also included in this value so the default value spawns a poller and 4 background workers.
GetReportQueue | [rpt_get_reports](architecture#rpt_get_reports) | The name of the procedure on the database that returns which reports should be processed.
UpdateReportQueueStatus | [rpt_set_report](architecture#rpt_set_report) | The name of the procedure on the database that is used to update the status of a processed report.
GetReportParameters | [rpt_get_parmtrs](architecture#rpt_get_parmtrs) | The name of the procedure on the database that is used to get any parameter values to use while processing a report.
SSRSReportServer | | The URL to a SSRS server when using server SSRS reports.
RelativePathRoot | The location of the executable. | Which absolute path to use as the root for relative report file paths returned by [rpt_get_reports](architecture#rpt_get_reports).

## ConnectionStrings
This section of the config contains the connection details that the service should use when connecting with the database that contains the required [procedures](architecture#stored-procedure-specifications).

By default this section contains a template for use with a SQL Server database.
Below are some example configurations.

```xml
<add name="Connection with Windows authentication"
    connectionString="
                     Data Source=exampleserver\instance;
                     Initial Catalog=MY_APP_DB;
                     Integrated Security=True;
                     Persist Security Info=True"
    providerName="System.Data.SqlClient"/>
```

```xml
<add name="Connection with user/password authentication"
    connectionString="
                     Data Source=exampleserver\instance;
                     Initial Catalog=MY_APP_DB;
                     User Id=example;
                     Password=passwordofuser;
                     Persist Security Info=True"
    providerName="System.Data.SqlClient"/>
```

Connections to multiple databases can be added this way as long as the name of the connections are unique.
However, keep in mind that multiple reporting services polling the same database is not supported.
