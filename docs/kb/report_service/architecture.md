---
title: Architecture
---

The Thinkwise Reporting Service is designed to query a database for reports that need to be generated and/or printed.
The database that is queried can be configured by modifying the connection string inside the service's config file.

> Most other things described in this section can also optionally be modified through the service's config file.
> See the [Configuration](configuration.html) section for more details.

To communicate with a configured database the service calls a set of stored procedures that it expects are present.

The default names of these stored procedures are:

* rpt_get_reports
* rpt_get_parmtrs
* rpt_set_report

There is currently no base project available to add these procedures to a Software Factory application.
The mentioned stored procedures have to be added manually by using [subroutines](../../sf/subroutines.html) in the targeted application's project.

The service periodically calls the *rpt_get_reports* procedure to retrieve the reports that need to be processed.
For each of the reports that were retrieved it then calls the *rpt_get_parmtrs* procedure to retrieve any parameter values that need to be used while generating the report. Lastly, when a report has either been successfully processed or an error occurred during processing, it calls the *rpt_set_report* procedure to notify the database of the result.

To enable parallel processing of reports the service starts a number of background workers.

These background workers also perform the calls to *rpt_get_parmtrs* and *rpt_set_report* for the service.

If an error occurs during a call to *rpt_set_report* the background worker is terminated.
This is done because an error inside *rpt_set_report* could mean that the failing or completed report has not been removed from the result set is returned by *rpt_get_reports*, in which case the service might potentially be generating the same report indefinitely.

Instead of allowing this behaviour, a design choice was made to terminate the service itself if all background workers are stopped because in such a case there is a good chance that something is wrong with the implementation of the *rpt_set_report* procedure.

> Pointing two Thinkwise Reporting Service instances at the same database may result in unexpected behaviour.
> Please do not configure more than one service to use the same connection string.

## Stored procedure specifications
This section covers the specification to which implementations of the rpt_get_reports, rpt_get_parmtrs and rpt_set_report stored procedures must abide to correctly work with the Thinkwise Reporting Service.

> *rpt_get_reports* and *rpt_get_parmtrs* are required to return a table via a select statement. <br/><br/>
> When adding these procedures as [subroutines](../../sf/subroutines.html) one might notice that the *Return value* option will be automatically set to *None*.
> This option has no affect on the reporting service implementation, just add the select statement through a control template and the service will be able to use the returned data set.

### rpt_get_reports
This stored procedure is called by the service to retrieve a set of reports it should process.
The procedure has no input parameters and must return a table using a select statement.

The returned table must adhere to the following structure:

> To maintain backwards compatibility with implementations for earlier versions of the service, some of these columns are considered optional.
> Failing to return values for these optional columns will trigger the service to log a warning stating which value it substituted the missing value with.

Column name | DataType | Description | Introduced in version | Backwards compatibillity value
---|---|---|---|---
ID | nvarchar | Should contain a unique id for a report. | | |
report_file_spec | nvarchar | The path where the report file is located on disk. For SSRS server reports this should specify the relative url to the report on the report server. | | |
export_file_path | nvarchar | The path to the **directory** in which the generated report should be exported to after processing. | | |
export_file_name | nvarchar | The name of that the exported report file should use **excluding the extension**. | | |
export_file_extension | nvarchar | The file extension to use when exporting the processed report file. <br/><br/> This value also controls the export type of the report. <br/> Valid values for this column depend on the type of report that is being processed. <br/><br/> **Crystal Reports:** pdf, doc, xls, csv, rtf, xml, txt, tab, word_rtf <br/><br/> **SSRS (Local):** pdf, doc, docx, xls, xlsx, tiff <br/><br/> **SSRS (Server):** pdf, doc, docx, xls, xlsx, tiff, csv, xml <br/><br/> **DevExpress:** pdf, rtf, xls, xlsx, docx, html, image (png) | | |
export_report | tinyint | Whether or not to export the report to disk after processing. <br/><br/> 0 = don't export, 1 = export. | | |
print_report | tinyint | Whether or not to print the report after processing. <br/><br/>  0 = don't print, 1 = print. | | |
printer_name | nvarchar | The full network path of the printer that should print the report. <br/><br/> E.g. a printer named CANON-HP-EPSON installed to server MYSERVER would likely have a network path of \\\\MYSERVER\\CANON-HP-EPSON. <br/><br/> If this column is left empty the default printer for the user running the service is used. | | |
printer_tray | nvarchar | The name of the paper source/tray on the selected printer to use while printing. | 3.2.0 | No value. <br/><br/> Not providing a value causes the service to use the default paper source/tray of the printer.
no_of_copies | int | The number of copies to print. | 1.2.0 | 1
report_type | nvarchar | Which type of report that the current record contains. <br/><br/> Possible values are: <br/><br/> <ul><li>CR (for Crystal Reports)</li><li>SSSR_Local (for local SSRS reports)</li><li>SSRS (for server SSRS reports)</li><li>TR (for DevExpress reports, was briefly called Thinkwise reports at introduction)</li></ul>  | 2.0.0 | CR. <br/><br/> Since the reporting service was initially built to generate Crystal Reports reports that is the one which is used as the default.

### rpt_get_parmtrs
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

### rpt_set_report
This stored procedure is called by the service after processing a report row to tell the application database whether or not it succeeded.

The procedure is expected to have the following input parameters:

Parameter name | DataType | Description
---|---|---
id | nvarchar | The id of the processed report row that has a status update.
message | nvarchar(max) | Contains additional information about what caused the status to be updated. E.g. an error message if the processing failed.
status | tinyint | A status code that represents the status of the processed report. <br/><br/> Possible values are: <ul><li>1 - (deprecated) The service is currently processing the report.</li><li>2 - Processing of the report has succeeded.</li><li>3 - Processing of the report has failed.</li></ul>

Unlike *rpt_get_reports* and *rpt_get_parmtrs* this procedure should not have any output.

It is however important to design your report queue (the returned result of *rpt_get_reports*) to not return reports that have been processed to avoid continually processing the same reports.

> **Updating the status of a reports is seen as one of the most critical parts of the entire service process.**<br/><br/>
> **Should enough errors occur inside the implementation of this procedure, the service will eventually stop entirely.**<br/><br/>
> **If this happens the service must be started back up manually after the problem occuring inside the procedure has been fixed.**
