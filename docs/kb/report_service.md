---
title: Reporting service
---

## Introduction

The Thinkwise Reporting Service is a Windows service (also available as a console application) that facilitates automatic printing and/or exporting of reports to a file location.
It currently supports the following report types:

- [SAP Crystal Reports 2013](../deployment/reporting.html)
- SQL Server Reporting Services (SSRS)
- DevExpress Reports

> For Crystal Reports please apply the same installation rules as one would when using the Thinkwise GUIs and be sure to install the 64 bit version of the runtime.
>
> The 32 bit runtime does not work with the Thinkwise Reporting Service.

The service is built for .NET Framework 4.5 and is available as a Windows service (through an installer) or as a standalone console application.
Both of which can be downloaded from [TCP](https://office.thinkwisesoftware.com/tcp).

To support Crystal Reports reports the service was built against the 64 bit version of the Crystal Reports runtime.
Because of this the service will only work on operating systems that support 64 bit applications.

## Architecture

The Thinkwise Reporting Service is designed to query a database for reports that need to be generated and/or printed.
The database that is queried can be configured by modifying the connection string inside the service's config file.

> Most other things described in this section can also optionally be modified through the service's config file.
> See the [Configuration](#configuration) section for more details.

To communicate with a configured database the service calls a set of stored procedures that it expects are present.

The default names of these stored procedures are:

* [rpt_get_reports](#rpt_get_reports)
* [rpt_get_parmtrs](#rpt_get_parmtrs)
* [rpt_set_report](#rpt_set_report)

There is currently no base project available to add these procedures to a Software Factory application.
The mentioned stored procedures have to be added manually by using [subroutines](../sf/subroutines.html) in the targeted application's project.

The service periodically calls the *rpt_get_reports* procedure to retrieve the reports that need to be processed.
For each of the reports that were retrieved it then calls the *rpt_get_parmtrs* procedure to retrieve any parameter values that need to be used while generating the report. Lastly, when a report has either been successfully processed or an error occurred during processing, it calls the *rpt_set_report* procedure to notify the database of the result.

To enable parallel processing of reports the service starts a number of background workers.

These background workers also perform the calls to *rpt_get_parmtrs* and *rpt_set_report* for the service.

If an error occurs during a call to *rpt_set_report* the background worker is terminated.
This is done because an error inside *rpt_set_report* could mean that the failing or completed report has not been removed from the result set that is returned by *rpt_get_reports*, in which case the service might potentially be generating the same report indefinitely.

Instead of allowing this behaviour, a design choice was made to terminate the service itself if all background workers are stopped because in such a case there is a good chance that something is wrong with the implementation of the *rpt_set_report* procedure.

> Pointing two Thinkwise Reporting Service instances at the same database may result in unexpected behaviour.
> Please do not configure more than one service to use the same connection string.

### Stored procedure specifications

This section covers the specification to which implementations of the *rpt_get_reports*, *rpt_get_parmtrs* and *rpt_set_report* stored procedures must abide to correctly work with the Thinkwise Reporting Service.

> *rpt_get_reports* and *rpt_get_parmtrs* are required to return a table via a select statement.
>
> When adding these procedures as [subroutines](../sf/subroutines.html) one might notice that the *Return value* option will be automatically set to *None*.
> This option has no affect on the reporting service implementation, just add the select statement through a control template and the service will be able to use the returned data set.

#### rpt_get_reports

This stored procedure is called by the service to retrieve a set of reports it should process.
The procedure has no input parameters and must return a table using a select statement.

The returned table must adhere to the following structure:

> To maintain backwards compatibility with implementations for earlier versions of the service, some of these columns are considered optional.
> Failing to return values for these optional columns will trigger the service to log a warning stating which value it substituted the missing value with.

Column name | DataType | Description | Introduced in version | Backwards compatibillity value
---|---|---|---|---
ID | nvarchar | Should contain a unique id for a report.<br/><br/>**Note:** The column names are case sensitive so use **ID** and not **id**. | | |
report_file_spec | nvarchar | The path where the report file is located on disk. For SSRS server reports this should specify the relative url to the report on the report server. | | |
export_file_path | nvarchar | The path to the **directory** in which the generated report should be exported to after processing. | | |
export_file_name | nvarchar | The name that the exported report file should use **excluding the extension**. | | |
export_file_extension | nvarchar | The file extension to use when exporting the processed report file. <br/><br/> This value also controls the export type of the report. <br/> Valid values for this column depend on the type of report that is being processed. <br/><br/> **Crystal Reports:** pdf, doc, xls, csv, rtf, xml, txt, tab, word_rtf <br/><br/> **SSRS (Local):** pdf, doc, docx, xls, xlsx, tiff <br/><br/> **SSRS (Server):** pdf, doc, docx, xls, xlsx, tiff, csv, xml <br/><br/> **DevExpress:** pdf, rtf, xls, xlsx, docx, html, image (png) | | |
export_report | tinyint | Whether or not to export the report to disk after processing. <br/><br/> 0 = don't export, 1 = export. | | |
print_report | tinyint | Whether or not to print the report after processing. <br/><br/>  0 = don't print, 1 = print. | | |
printer_name | nvarchar | The full network path of the printer that should print the report. <br/><br/> E.g. a printer named CANON-HP-EPSON installed to server MYSERVER would likely have a network path of \\\\MYSERVER\\CANON-HP-EPSON. <br/><br/> If this column is left empty the default printer for the user running the service is used. | | |
printer_tray | nvarchar | The name of the paper source/tray on the selected printer to use while printing. | 3.2.0 | No value. <br/><br/> Not providing a value causes the service to use the default paper source/tray of the printer.
no_of_copies | int | The number of copies to print. | 1.2.0 | 1
report_type | nvarchar | The type of report that the current record contains. <br/><br/> Possible values are: <br/><br/> <ul><li>CR (for Crystal Reports)</li><li>SSSR_Local (for local SSRS reports)</li><li>SSRS (for server SSRS reports)</li><li>TR (for DevExpress reports, was briefly called Thinkwise reports at introduction)</li></ul>  | 2.0.0 | CR. <br/><br/> Since the reporting service was initially built to generate Crystal Reports reports that is the one which is used as the default.

#### rpt_get_parmtrs

This stored procedure is called for each row/record retrieved by [rpt_get_reports](#rpt_get_reports) to get the parameter values to use when processing the report.

The procedure is expected to have the following input parameter:

Parameter name | DataType | Description
---|---|---
id | nvarchar | The id of the report that parameter values are being requested for.

Using this input parameter the procedure should return a result set with the following table structure:

Column name | DataType | Description
---|---|---
parmtr_id | nvarchar | The id of the parameter in the report. <br/><br/> **IMPORTANT:** The value returned through this column must match the parameter name from the report *exactly*.
parmtr_value | nvarchar | The value to use for the parameter, as a string.

#### rpt_set_report

This stored procedure is called by the service after processing a report row to tell the application database whether or not it succeeded.

The procedure is expected to have the following input parameters:

Parameter name | DataType | Description
---|---|---
id | nvarchar | The id of the processed report row that has a status update.
message | nvarchar(max) | Contains additional information about what caused the status to be updated. E.g. an error message if the processing failed.
status | tinyint | A status code that represents the status of the processed report. <br/><br/> Possible values are: <ul><li>1 - (deprecated) The service is currently processing the report.</li><li>2 - Processing of the report has succeeded.</li><li>3 - Processing of the report has failed.</li></ul>

Unlike *rpt_get_reports* and *rpt_get_parmtrs* this procedure should not have any output.

It is however important to design your report queue (the returned result of *rpt_get_reports*) to not return reports that have been processed to avoid continually processing the same reports.

> Updating the status of a reports is seen as one of the most critical parts of the entire service process.
> Should enough errors occur inside the implementation of this procedure, the service will eventually stop entirely.
>
> If this happens the service must be started back up manually after the problem occuring inside the procedure has been fixed.

## Configuration

Some aspects of the Thinkwise Reporting service can be edited by modifying a configuration file.

This file is located in the service's installation directory and is called:

- `ReportingService.exe.config` for the Windows service version.
- `ReportingConsole.exe.config` for the standalone console application version.

The table below shows which options are available and what they do.

Configuration option | Default value | Description
---|---|---
Interval | 10000 | The interval between calls to [rpt_get_reports](#rpt_get_reports) from the service in milliseconds.
ConcurrencyLevel | 5 | The amount of background workers used to process reports. The poller is also included in this value so the default value spawns a poller and 4 background workers.
GetReportQueue | [rpt_get_reports](#rpt_get_reports) | The name of the procedure on the database that returns which reports should be processed.
UpdateReportQueueStatus | [rpt_set_report](#rpt_set_report) | The name of the procedure on the database that is used to update the status of a processed report.
GetReportParameters | [rpt_get_parmtrs](#rpt_get_parmtrs) | The name of the procedure on the database that is used to get any parameter values to use while processing a report.
SSRSReportServer | | The URL to a SSRS server when using server SSRS reports.
RelativePathRoot | The location of the executable. | Which absolute path to use as the root for relative report file paths returned by [rpt_get_reports](#rpt_get_reports).

### ConnectionStrings

This section of the config contains the connection details that the service should use when connecting with the database that contains the required [procedures](#stored-procedure-specifications).

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

## Logging/Debugging

The Thinkwise Reporting Service uses the [NLog](https://nlog-project.org/) framework for logging.
NLog can be configured by modifying the `NLog.config` file in the service's installation directory.

By default the service is configured to log warnings, errors and fatal errors to a file named `thinkwise.log`.
This should be enough to detect when something goes wrong in the service.

The standalone console application also has an extra logger configurated to output log statements at the Infomation level to the console window.

To enable logging at lower levels than warnings, open the `NLog.config` file and change the minlevel attribute of the following rule to the desired log level:

```xml
<logger name="*" minlevel="Warn" writeTo="logfile" />
```

NLog's log level values, going from most to least detailed, are as follows: Trace, Debug, Info, Warn, Error, Fatal.

For more advanced logging configuration, consult the [NLog documentation](https://github.com/nlog/nlog/wiki).

## Example

The intent of this section is to provide a basic example of how to make a Software Factory application compatible with the reporting service.
The provided example should be considered a reference to help with implementing report service compatibility in ones own application instead of being the standard implementation.

The example uses an empty Software Factory project called REPORTING_SERVICE_APP which sole purpose is to only contain the basis needed to provide compatibility with the reporting service.

Two tables will be added to the project:

* **rpt_queue**, which holds the queue information that [rpt_get_reports](#rpt_get_reports) requires for each report and a way for [rpt_set_report](#rpt_set_report) to update the status.
* **rpt_parmtrs**, which holds the information about parameters values to use for a report to be retrieved by [rpt_get_parmtrs](#rpt_get_parmtrs).

### Domains

Following that the tables need to contain all the information needed by the service's [subroutines](#stored-procedure-specifications) domains must be added to adhere to those specifications.

The rpt_queue table is a combination of [rpt_get_reports](#rpt_get_reports) and [rpt_set_report](#rpt_set_report).

To keep things simple, a domain is added for each of the return columns expected by the service from [rpt_get_reports](#rpt_get_reports).

![rpt_get_reports domains](assets/report_service/domain.png)
*Domains needed for rpt_get_reports.*

To keep track of the status for a record so it can be updated by [rpt_set_report](#rpt_set_report), two more domains are needed.
One to hold the current status value and another to show the message returned by the service.

![rpt_set_report domains](assets/report_service/domain_status.png)
*Domains needed for rpt_set_report.*

Domain elements are added to the rpt_status domain to represent the possible status values that the service uses.

![rpt_status domain elements](assets/report_service/domain_status_elements.png)
*Domain elements which represent the service's status values.*

Note that no element for the value 1 has been defined.
This is because it represents a deprecated queued/processing status.

The value to represent an ignored state is also not part the service's status values.
It is only used here so that when records are manually added in the application they will not immediately be queued by the service.

Domains for the columns used in [rpt_get_parmtrs](#rpt_get_parmtrs) could also be added but, since the input parameter is the id of a report, rpt_id can be used instead.
Because the other two columns (parmtr_id and parmtr_value) are supposed to be the same data type as rpt_id, this example will use that domain for those as well.

### Data model

After adding the domains, the tables and columns of the data model can be created.

The rpt_queue table is added with the following columns.

![rpt_queue columns](assets/report_service/data_model_rpt_queue.png)
*rpt_queue columns.*

Note that most of the column names match with the ones expected in the result set of [rpt_get_reports](#rpt_get_reports).
This is done to make implementing said subroutine easier later in the example.

The columns *report_status* and *report_message* are used to store the data sent through [rpt_set_report](#rpt_set_report) and to queue the record for processing.

The rpt_parmtrs table is added with the columns below and a foreign key to rpt_queue's report_id column.

![rpt_parmtrs columns](assets/report_service/data_model_rpt_parmtrs.png)
*rpt_parmtrs columns.*

Once again, both the names of both the parmtr_id and parmtr_value columns match with what is expected in the result set of [rpt_get_parmtrs](#rpt_get_parmtrs) to make the eventual implementation easier.

The full data model now looks like the one below.

![full report queue data model](assets/report_service/data_model.png)
*Full report queue data model.*

### Subroutines

After the data model of the report queue has been defined, the [subroutines](#stored-procedure-specifications) can be added and implemented.

First, the subroutine definitions need to be added to the project.

![rpt_get_reports subroutine](assets/report_service/subroutine_rpt_get_reports.png)
*Subroutine definition for rpt_get_reports.*

![rpt_get_parmtrs subroutine](assets/report_service/subroutine_rpt_get_parmtrs.png)
*Subroutine definition for rpt_get_parmtrs.*

![rpt_set_report subroutine](assets/report_service/subroutine_rpt_set_report.png)
*Subroutine definition for rpt_set_report.*

> Note that the return value of the subroutine type 'Procedure' is always set to None even though rpt_get_reports and rpt_get_parmtrs are supposed to return a table.
> This setting has no effect on the way the report service processes these procedures so leaving it on None is OK.

After adding the subroutine definitions a control procedure is added for each of them.

![subroutine control procedures](assets/report_service/control_procs.png)
*Subroutine control procedures.*

Next, a template is added as the implementation for each subroutine.

Starting with the template for [rpt_get_reports](#rpt_get_reports) which needs return a table.

Since the rpt_queue table in this example's data model mostly matches with what is expected to be returned through [rpt_get_reports](#rpt_get_reports), the template can consist of a simple select statement that returns all records that have a report_status of 0.

```sql
select report_id as ID,
       report_type,
       report_file_spec,
       export_report,
       export_file_path,
       export_file_name,
       export_file_extension,
       print_report,
       printer_name,
       printer_tray,
       no_of_copies
  from rpt_queue
 where report_status = 0;
```

> This example uses a dedicated column to store the value for report_type.
> In practice this should almost never be needed since most applications only use one type of reporting technology.
> In those cases it might be more practical to hard code the value of the report_type column in the template. 

The rpt_parmtrs table almost matches [rpt_get_parmtrs](#rpt_get_parmtrs) completely.
Therefore the implementation can simply return all records where the report_id matches the @id input parameter.

```sql
select parmtr_id, parmtr_value
  from rpt_parmtrs
 where report_id = @id;
```

Lastly, the implementation of [rpt_set_report](#rpt_set_report) is expected to update the processed report in queue so it does not get returned by [rpt_get_reports](#rpt_get_reports) anymore.

Since the rpt_queue table has a report_status value for each record it can be used to control whether or not it should be considered queued or not.
So once again, the implementation of the template consists of a simple update statement that modifies the report record in rpt_queue.

```sql
update rpt_queue
   set report_status = @status,
       report_message = @message
 where report_id = @id;
```

After assigning the templates to their corresponding subroutines and generating the code, the end result looks like the examples below.

#### rpt_get_reports

```sql
/* Drop stored procedure rpt_get_reports first. */

if exists (select 1 from sysobjects
           where name = 'rpt_get_reports' and type = 'P')
   drop procedure rpt_get_reports
go

create procedure rpt_get_reports
as
begin

    --control_proc_id:     proc_rpt_get_reports
    --template_id:         proc_rpt_get_reports
    --prog_object_item_id: proc_rpt_get_reports
    --template_desc:       
    
    select report_id as ID,
           report_type,
           report_file_spec,
           export_report,
           export_file_path,
           export_file_name,
           export_file_extension,
           print_report,
           printer_name,
           printer_tray,
           no_of_copies
      from rpt_queue
     where report_status = 0;

end
go

grant execute on rpt_get_reports to public
go
```

#### rpt_get_parmtrs

```sql
/* Drop stored procedure rpt_get_parmtrs first. */

if exists (select 1 from sysobjects
           where name = 'rpt_get_parmtrs' and type = 'P')
   drop procedure rpt_get_parmtrs
go

create procedure rpt_get_parmtrs
(
   @id   rpt_id   
)
as
begin

    --control_proc_id:     proc_rpt_get_parmtrs
    --template_id:         proc_rpt_get_parmtrs
    --prog_object_item_id: proc_rpt_get_parmtrs
    --template_desc:       
    
    select parmtr_id, parmtr_value
      from rpt_parmtrs
     where report_id = @id;

end
go

grant execute on rpt_get_parmtrs to public
go
```

#### rpt_set_report

```sql
/* Drop stored procedure rpt_set_report first. */

if exists (select 1 from sysobjects
           where name = 'rpt_set_report' and type = 'P')
   drop procedure rpt_set_report
go

create procedure rpt_set_report
(
   @id        rpt_id               ,
   @message   rpt_status_message   ,
   @status    rpt_status           
)
as
begin

    --control_proc_id:     proc_rpt_set_report
    --template_id:         proc_rpt_set_report
    --prog_object_item_id: proc_rpt_set_report
    --template_desc:       
    
    update rpt_queue
       set report_status = @status,
           report_message = @message
     where report_id = @id;

end
go

grant execute on rpt_set_report to public
go
```

### Testing

Now that all subroutines have been implemented it is time to test if the application works with the reporting service.

To aid in this, the example will use a report built using Crystal Reports that selects a record from the report queue itself.
To select the right record in the queue table, the report contains a parameter called *report_id*.

The example has added the rpt_queue table to a menu so that records can be added to the queue by using, for example, the Windows GUI.

![example report record](assets/report_service/example_report_queue_record.png)
*Adding a record to the queue to help with testing.*

> This record is set-up to export the Crystal Reports rpt file at 'D:\\Software_Fabriek\\Reports\example.rpt' to a PDF file that is saved to 'D:\\ReportingTest\\example_report.pdf'.
> Printing the report is being skipped.

Because the report needs a parameter value for report_id, that is also added through the detail tab.

![example report record parameter](assets/report_service/example_report_queue_record_parameter.png)
*Adding the report_id parameter.*

After adding the test record one could optionally simulate the calls that the reporting service executes before installing/configuring it.

![simulated procedure calls](assets/report_service/simulated.png)
*Simulating the procedure calls made by the service.*

Next it is time to [configure](#configuration) the service to connect to the deployed application database.
This example will use the standalone console application version of the service for this to make it easier to show the logging output.

Since the example implementation uses the default values for the subroutine names, the only thing that needs to be configured is the connection string to the application database.

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <!-- Sets the polling interval (ms). -->
    <add key="Interval" value="10000"/>
    <!-- Sets amount of reports that can created simultaneously. (TOO MANY MAY DEPLETE THE THREADPOOL) -->
    <add key="ConcurrencyLevel" value="5"/>
    <!--The name of the stored procedure which gets the reports. -->
    <add key="GetReportQueue" value="rpt_get_reports"/>
    <!--The name of the stored procedure which sets the report status. -->
    <add key="UpdateReportQueueStatus" value="rpt_set_report"/>
    <!--The name of the stored procedure which gets the report parameters for the report. -->
    <add key="GetReportParameters" value="rpt_get_parmtrs"/>
    <!--The absolute Url to the SSRS report server.-->
    <!--<add key="SSRSReportServer" value=""/>-->
    <!--The root path to use as the root when locating report files with a relative path. This defaults to the current directory/location of the .exe-->
    <!--<add key="RelativePathRoot" value=""/>-->
  </appSettings>
  <connectionStrings>
    <clear/>
    <add name="REPORTING_SERVICE_APP"
        connectionString="
                         Data Source=.\sql2016;
                         Initial Catalog=REPORTING_SERVICE_APP;
                         Integrated Security=True;
                         Persist Security Info=True"
        providerName="System.Data.SqlClient"/>
  </connectionStrings>
  <startup>
    <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.5"/>
  </startup>
</configuration>
```

The above configuration will try to connect to a SQL Server database called REPORTING_SERVICE_APP on a local server instance called sql2016 using Windows authentication.

All that is left is to start up the service and see if it works.

![reporting service console output](assets/report_service/console_output.png)
*Output from the Reporting service console.*

As shown in the output, the example_report record gets retrieved after it has been queued in the database.
The parameters for the example_report record are then retrieved.
Next it gets generated/exported in PDF format and saved to disk.
Once exporting is done the service signals that printing of the report is being skipped.
Lastly the service updates the status of the example_report record with status code 2 to signal that it was succesfully processed.
