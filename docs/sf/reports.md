---
title: Reports
---

Reports have a similar structure to tasks but instead of starting a task, a report is printed, previewed or exported. The reports themselves can be created with a reporting tool, such as DevExpress Reports, Crystal Reports, i-net Clear Reports, SQL Server Reporting Services (SSRS) or Word.

![](assets/sf/report.png)
*Reports screen*

The structure of reports is analogous to that of tasks. Parameters are defined for a report, and look-up functionality is provided through references.

![](assets/sf/image200.png)
*Example report pop-up*

## Creating a report

The basic data for a report can be entered in the settings, such as the type of report that is used. The following types are supported by the Software Factory.

- Crystal Reports
- DevExpress Reports
- SQL Server Reports
- i-net Clear Reports
- Windows command
- GUI code
- Microsoft Word

#### Crystal Reports

A report in Crystal Reports can make use of views, but SQL queries can also be specified in the report. CR reports can be developed with the Crystal Reports Designer or with Visual Studio.

#### DevExpress Reports

DevExpress Reports can display any styled and formatted text, such as RTF and HTML, from your end product. The DevExpress Report Designer is free of charge and can be downloaded from TCP.

#### Windows command

The same as for [tasks](tasks#windows-command) but with the name of the parameter in the *File specification* field. For example, to link in an existing pdf as a report.

![](assets/sf/image201.png)
*General settings when creating a report*

#### GUI code

This option allows *custom tasks*, such as the [TSFReportMailer](../kb/report_mailer), to be linked in as a report. The name of the custom task should be entered in the *File specification* field.

#### Microsoft Word

To generate reports in Word, a macro and a template have to be created in Word. Word does not work in web and is not always reliable because of the macros.

##### Create a template

- Open Microsoft Word

- Go to the *Mailing Lists* tab

- Click *Select Addresses*

- Click *Use existing list*

- Click *New source*

- Select *Microsoft SQL Server* and click Next

- Enter the server name and logon credentials and click Next

- Select the correct database

- Select the correct table and click Next

- Save the file anywhere on your system and click Finish

- Set up the document with the desired merge fields

- Click the *Start Mail Merge* button

- Click *Normal Word Document*

##### Create a macro:

- Go to the *View* tab

- Click *Macros*

- Select your document under *View Macros*

- Type the text field under *macro name* TSFReport_+ your report_id

- Select the correct document the Macro has to be linked to:

![](assets/sf/image202.png)
*Available options of macros in a drop down list*

- Click on the *Create* button
  - The Visual Basic editor will open.

- Copy and paste the macro code as displayed on the next page to the Visual Basic editor.

- Modify the macro with respect to the following points

  - strFolder
  
  - strQuery

- Close the Visual Basic editor by pressing the X button.

- Save the Word document to your system, choose a file type: *Word Macro-Enabled Template (.dotm)*.

- Place the file in the designated folder on the server.

- Create the report in the Software Factory.

Macro code:

```vb
Dim strODCFile As String
Dim strConnection As String
Dim strQuery As String
' Use your folder name...
strFolder = C:\\your_folder\\Reports\\
' Use your .odc name...
strODCFile = strFolder & thinkwise.odc
' Build the connection string
' You may well need more here, but I am following
' your ADO connection string
strConnection = Environ(TSFTOWORD_CONN)
' Build the Query string
strQuery = SELECT \ FROM your_table where  + Environ(TSFTOWORD_SQL)
' Open the data source
With ActiveDocument.MailMerge
'.MainDocumentType = wdNotAMergeDocument
.MainDocumentType = wdFormLetters
.OpenDataSource _
Name:=strODCFile, _
Connection:=strConnection, _
SQLStatement:=strQuery
'ActiveDocument.ResetFormFields
End With
ActiveWindow.Visible = False
ActiveDocument.MailMerge.Execute
Application.Quit (False)
```

#### SSRS

SSRS stands for SQL Server Reporting Services and is a (server-based) report generation system of Microsoft SQL Server. Reports can be drawn up with this system so that information from tables from one or more databases can be presented in an orderly fashion.

Reports are described in the Report Definition Language (RDL). This is a file format that is built up in XML. RDL reports can be created with the SQL Server Report Builder application.

There are two ways to deploy the RDL files:

- Locally on the client computer

- Server side on a server on which SQL Server Reporting Services is installed

Depending on the environment in which the reports are generated, these can be exported in various formats.

##### SSRS (Local)

Local reports work in the same way as other report types, such as Crystal Reports. The report is generated on the basis of the RDL file that is specified for the report in the file specification field, for which use is made of the end application database connection. This means that the connection string that is specified as Datasource for any Data Sets is ignored in the RDL file.

![](assets/sf/image203.png)
*Specify SSRS (local) file specification*

##### SSRS (Server)

In this variant, the reports are generated on a report server. The relative path to the report on the server must be specified in the file specification field. The location of the report server has to be passed on to the GUI via the INI parameter `ssrsreportserver`.

The report server can run in *native mode* or *SharePoint*. Native mode is the default for this. These default models have been tested by Thinkwise (though those for SharePoint have not yet been tested) in the current release. For now, it is therefore expected that the report server be in native mode.

Reports that are generated on a report server use the connection string that is assigned for each Datasource to retrieve the Data Seta. Ensure that the reports that are used in a test environment have the correct connection string when this is rolled out to the live environment.

![](assets/sf/image204.png)
*Specify SSRS (Server) file specification*

Local SSRS reports in an SF application support the following report (export) actions:

##### Installation

To use reports that are created for SSRS using the Thinkwise Software Factory with a GUI version 2017.1.11 or lower, the following software must be installed on the computer of the user for the Windows GUI or the webserver on which the ASP GUI runs:

- Microsoft SQL Server CLR Types (SQLSysClrTypes.msi)
    <https://www.microsoft.com/en-us/download/details.aspx?id=42295>

- Microsoft Report Viewer 2015 Runtime
    <https://www.microsoft.com/en-us/download/details.aspx?id=45496>

The SQLSysClrTypes installer needs to be implemented before the report viewer runtime is run. If the computer on which the work is done contains its own SQL Server instance, the CLR types can be omitted.

The above is not necessary when use is made of a GUI with version 2017.1.12 or higher. With these versions, the runtime for SSRS is included as default with the GUI itself.

##### Oracle and DB2

Reports made with SSRS can also retrieve data from Oracle and DB2 databases, provided that the correct software is available for this on the system on which the report is generated.

For Oracle connections, the Oracle Client needs to be present on the system.

> When using the Oracle Client together with the Microsoft SQL Server Report Builder, it is necessary to have the 32 bit version of the Oracle Client installed. The 64 bit version will unfortunately not work because the report Builder itself is a 32 bit application. Use can be made of the 64 bit Oracle Client for end applications.

Connections to DB2 databases are created in SSRS via OLE DB. The ADO.NET bindings, which can be installed via the IBM Client Access, are required for this.

##### Report Builder

The Microsoft SQL Server Report Builder software to develop reports can be downloaded from this page:

- <https://www.microsoft.com/en-us/download/details.aspx?id=42301>

| Component       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Built-in Fields | A number of pre-defined calculated fields, such as the current page number or the user that has called the report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Parameters      | Parameters within the report that can be used when retrieving a Data Set or the calculation of an expression.<br>Depending on the type of connection that is used, this is generated by the Report Builder or has to be added manually.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Images          | Illustrations that can be used within the report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Data sources    | A Data source describes a connection to a database. A connection string can even be typed in or one can be built via a dialogue. Furthermore, for example, a login method can be selected to be used when setting up the connection.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Data Sets       | A Data Set contains the resulting set of a query or stored procedure on a Data source.<br>These can be used, for instance, to fill tables and graphs within the report.<br>When using a stored procedure, parameters are automatically added to the report for both SQL Server and Oracle and DB2 connections.<br>For a query within the Data Set itself, a parameter name with the correct prefix ("@"/":") can be indicated with SQL Server and Oracle connections. During the testing of the query, the Report Builder will automatically add these parameters to the report.<br>With DB2, use is made of an OLE DB connection. Therefore, the user has to mark parameters in the query with a question mark. This then has to be assigned to a parameter within the report on the Parameters screen of the Data Set. |


A report consists of the following basic components:

## Report parameters

Creating report parameters works in the same way as creating task parameters. An additional feature for reports is to link parameters to properties of the report (for instance the *action*, *printer* and *export location*).

![](assets/sf/image205.png)
*Example of report parameters*

By linking a report parameter to a report property, these properties can be used in defaults and layouts and also be placed on the right location in the correct group.

A choice can be made from the following properties within Windows:

| Property           | Description                                                                                                                                                                                                          | Datatype |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Action             | The default action for the report, e.g., print preview or export to PDF. The default value for this parameter is the value as specified in the model. An overview of possible values is available [below](#actions). | Integer  |
| File specification | The report file to use. Set this value to open a different or user specified report.                                                                                                                                 | String   |
| Printer name       | The printer name to use.                                                                                                                                                                                             | String   |
| Paper tray name    | The paper tray name to use.                                                                                                                                                                                          | String   |
| Number of copies   | The number of copies to be printed.                                                                                                                                                                                  | Integer  |
| Export location    | The location where the exported file is saved.                                                                                                                                                                       | String   |
| Compress           | Indictes whether the exported file has to be compressed or not.                                                                                                                                                      | Boolean  |
| Open after export  | Indicates whether the file has to be opened after export.                                                                                                                                                            | Boolean  |

The web GUI only supports the *Action* and *Compress* properties.

If a report does not have any property parameters, then all properties will be displayed at the top of the parameter dialog. For each property parameter modeled in the sf, the default parameter at the top is removed and the parameter is added as a normal parameter in the form. This way it can be manipulated with a default and/or layout procedure, but also a default value can be set for the parameter.

### Actions

The table below lists the available actions and their corresponding value.
Note that not all actions are available for all report types.
More information on the different export formats for Crystal Reports can be found [here](https://help.sap.com/viewer/0d6684e153174710b8b2eb114bb7f843/SP21/en-US/45b016cb6e041014910aba7db0e91070.html).

| Action                             | Value |
| ---------------------------------- | :---: |
| Print preview                      |   1   |
| Print                              |   2   |
| Export to PDF                      |   3   |
| Export to RTF                      |   4   |
| Export to XML                      |   5   |
| Export to CSV                      |   6   |
| Export to Excel                    |  12   |
| Export to Word                     |  13   |
| Export to TIFF                     |  14   |
| Export to HTML                     |  15   |
| Export to PNG                      |  16   |
| Export to Excel - data only        |   9   |
| Export to Excel 2003               |   7   |
| Export to Excel 2003 - data only   |   8   |
| Export to Word 2003                |  10   |
| Export to Word 2003 - editable RTF |  11   |

## Report look-ups

A report reference defines the look-up table of a particular parameter.

The underlying column comparison (Report reference columns) is created automatically.

## Conditional formatting

Just as with columns, the task parameters can be given a background color or a different font. Since a task does not have a grid, this will only be applied to form parameters.

## Table reports

The report can be linked to one or more tables. The report is displayed in the context menu for these tables. Columns in the table can also be linked to parameters of the report. The value of the field of the active record is passed on to the parameter as a default value.

### Grouping of reports

Reports within a table can be grouped together to display them logically. Both the groups and the reports within a group can be sorted sequentially. This works in the same way as grouping tasks.

## Menu

A report can be included in several menus. If a report is linked to a table, it appears in the ribbon and the context menu of this table. A report can also be included in the menu. In this way, the user can print the report directly without having to first open a window.

## Printing a report

When the report is fully defined within the Software Factory, a preview can be viewed on the screen in the user interface.

![](assets/sf/image207.png)
*Example of a report preview*

### Await result

Reports can take a while to process. There are four options to give instructions about what to do with these reports.

1. Yes - The user has to wait for the result and a progress indicator is shown.
2. Yes (no progress indicator) - The user has to wait for the result (the GUI freezes and hourglass is shown).
3. No - The action is executed in the background and the user can continue working.
4. Optional - The user has to wait (option 1) but has the possibility to continue the action in the background (option 3).

For Web, this means that the long-term actions no longer cause a request timeout from IIS. (Default after 90 seconds)

The display parameter can be used to distinguish between multiple instances of a report in the async action dialog.