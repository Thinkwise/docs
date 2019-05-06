---
title: Example
---

The intent of this section is to provide a basic example of how to make a Software Factory application compatible with the reporting service.
The provided example should be considered a reference to help with implementing report service compatibility in ones own application instead of being the standard implementation.

The example uses an empty Software Factory project called REPORTING_SERVICE_APP which sole purpose is to only contain the basis needed to provide compatibility with the reporting service.

Two tables will be added to the project:

* **rpt_queue**, which holds the queue information that [rpt_get_reports](architecture#rpt_get_reports) requires for each report and a way for [rpt_set_report](architecture#rpt_set_report) to update the status.
* **rpt_parmtrs**, which holds the information about parameters values to use for a report to be retrieved by [rpt_get_parmtrs](architecture#rpt_get_parmtrs).

## Domains
Following that the tables need to contain all the information needed by the service's [subroutines](architecture#stored-procedure-specifications) domains must be added to adhere to those specifications.

The rpt_queue table is a combination of [rpt_get_reports](architecture#rpt_get_reports) and [rpt_set_report](architecture#rpt_set_report).

To keep things simple, a domain is added for each of the return columns expected by the service from [rpt_get_reports](architecture#rpt_get_reports).

![rpt_get_reports domains](assets/report_service/domain.png)
*Domains needed for rpt_get_reports.*

To keep track of the status for a record so it can be updated by [rpt_set_report](architecture#rpt_set_report), two more domains are needed.
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

Domains for the columns used in [rpt_get_parmtrs](architecture#rpt_get_parmtrs) could also be added but, since the input parameter is the id of a report, rpt_id can be used instead.
Because the other two columns (parmtr_id and parmtr_value) are supposed to be the same data type as rpt_id, this example will use that domain for those as well.

## Data model
After adding the domains, the tables and columns of the data model can be created.

The rpt_queue table is added with the following columns.

![rpt_queue columns](assets/report_service/data_model_rpt_queue.png)
*rpt_queue columns.*

Note that most of the column names match with the ones expected in the result set of [rpt_get_reports](architecture#rpt_get_reports).
This is done to make implementing said subroutine easier later in the example.

The columns *report_status* and *report_message* are used to store the data sent through [rpt_set_report](architecture#rpt_set_report) and to queue the record for processing.

The rpt_parmtrs table is added with the columns below and a foreign key to rpt_queue's report_id column.

![rpt_parmtrs columns](assets/report_service/data_model_rpt_parmtrs.png)
*rpt_parmtrs columns.*

Once again, both the names of both the parmtr_id and parmtr_value columns match with what is expected in the result set of [rpt_get_parmtrs](architecture#rpt_get_parmtrs) to make the eventual implementation easier.

The full data model now looks like the one below.

![full report queue data model](assets/report_service/data_model.png)
*Full report queue data model.*

## Subroutines
After the data model of the report queue has been defined, the [subroutines](architecture#stored-procedure-specifications) can be added and implemented.

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

Starting with the template for [rpt_get_reports](architecture#rpt_get_reports) which needs return a table.

Since the rpt_queue table in this example's data model mostly matches with what is expected to be returned through [rpt_get_reports](architecture#rpt_get_reports), the template can consist of a simple select statement that returns all records that have a report_status of 0.

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

The rpt_parmtrs table almost matches [rpt_get_parmtrs](architecture#rpt_get_parmtrs) completely.
Therefore the implementation can simply return all records where the report_id matches the @id input parameter.

```sql
select parmtr_id, parmtr_value
  from rpt_parmtrs
 where report_id = @id;
```

Lastly, the implementation of [rpt_set_report](architecture#rpt_set_report) is expected to update the processed report in queue so it does not get returned by [rpt_get_reports](architecture#rpt_get_reports) anymore.

Since the rpt_queue table has a report_status value for each record it can be used to control whether or not it should be considered queued or not.
So once again, the implementation of the template consists of a simple update statement that modifies the report record in rpt_queue.

```sql
update rpt_queue
   set report_status = @status,
       report_message = @message
 where report_id = @id;
```

After assigning the templates to their corresponding subroutines and generating the code, the end result looks like the examples below.

### rpt_get_reports
```sql
/* Drop stored procedure rpt_get_reports first. */

if exists (select 1 from sysobjects
           where name = 'rpt_get_reports' and type = 'P')
   drop procedure rpt_get_reports
go

create procedure rpt_get_reports
as
begin

  -- Do not count affected rows for performance
  SET NOCOUNT ON


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

### rpt_get_parmtrs
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

  -- Do not count affected rows for performance
  SET NOCOUNT ON


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

### rpt_set_report
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

  -- Do not count affected rows for performance
  SET NOCOUNT ON


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

## Testing
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

Next it is time to [configure](configuration.html) the service to connect to the deployed application database.
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