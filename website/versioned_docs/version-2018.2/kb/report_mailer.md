---
title: Report mailer
id: version-2018.2-report_mailer
original_id: report_mailer
---



Using the *TSFReportMailer* custom task, delivered with the Software Factory, it is possible to export reports and/or send emails from the Software Factory.

It is produced by creating a *GUI code* [task](../sf/tasks#gui-code) or [report](../sf/reports#gui-code). The Object name must be entered with *TSFReportMailer*. Use can be made of the following table for creating parameters.

## Parameters

An overview of the parameters that can be used:

| Parameter             | Default Value | Data type | Description                                                  |
| --------------------- | ------------- | --------- | ------------------------------------------------------------ |
| report_id             |               | string    | Name of the report                                           |
| export_file_spec      |               | string    | Export file name (for example to be filled from a default)   |
| export_file_extension | pdf           | string    | With this parameter, the file format can be selected of the report that will be generated. The parameter value is not case sensitive.<br>Possible values:<br>- rtf<br>- csv<br>- xml<br>- xls<br>- xls_data<br>- xlsx_data<br>- doc<br>- word_rtf<br>- pdf |
| overwrite_old         | false         | boolean   | Overwrites the file if it already exists and if this parameter is set to true. |
| send_mail             | true          | boolean   | Tries to send an email if this parameter is set to true .    |
| open_in_outlook       | false         | boolean   | Tries to open the email if this parameter is set to true .   |
| save_mail             | false         | boolean   | Tries to save the email in the Drafts folder if this parameter is set to true .<br>NOTE: If open_in_outlook is also set to true then this parameter will be ignored! |
| html                  | false         | boolean   | This parameter converts the format of the email to HTML if it is set to true. |
| priority              | 1             | integer   | This parameter indicates the urgency of the email.<br>Possible values:<br> 0 = low urgency<br/>1 = normal urgency<br/>2 high urgency. |
| e_mail                |               | string    | Email address to which the email must be sent. (The TSFReportMailer can be sent to multiple email addresses, which have to be separated by a semicolon.) |
| cc                    |               | string    | CC email address for the email. (The TSFReportMailer can be sent to multiple email addresses, which have to be separated by a semicolon.) |
| bcc                   |               | string    | BCC email address for the email. (The TSFReportMailer can be sent to multiple email addresses, which have to be separated by a semicolon.) |
| body                  |               | string    | If HTML tags are used for the actual message of the email, then the html parameter must be set to true. |
| subject               |               | string    | The subject of the email.                                    |
| use_signature         | false         | boolean   | If this parameter is set to true, the standard signature is used that is configured in Outlook. |
| signature_text        |               | string    | Set this parameter if you want to use a different signature text. |
| signature_image       |               | string    | Set the parameter if you want to use an image in the signature of the email. |
| account               |               | string    | Set this parameter if the email should be sent from a different account than the default account that is installed on the PC. |
| delete_file           | false         | boolean   | Set this parameter to true if the report, which is used as an attachment should be deleted after sending the email. |
| smtp_only             | false         | boolean   | Set this parameter to true if you just want to mail with SMTP and do not want to mail with Outlook. |
| smtp_username         |               | string    | User name of the SMTP.                                       |
| smtp_password         |               | string    | Password of the SMTP.                                        |
| smtp_host             |               | string    | Host address of the SMTP                                     |
| smtp_port             | 0             | integer   | The port to which the SMTP server listens. If this is not set, port 465 will be used for SSL, without SSL port 25 will be used |
| smtp_from_mail        |               | string    | Email address where the email comes from.                    |
| smtp_use_ssl          | false         | boolean   | Set this parameter to true if the SMTP server expects an SSL connection. |
| extra_attachments     |               | string    | This can be used to add extra attachments to the email. If more than one file is to be added, they must be separated by means of a semicolon.<br>For example: `C:/file1.txt;C:/file2.txt` |
| smtp_from_displayname |               | string    | With this parameter the display of the sender's name in an email can be modified. This parameter is optional. |

If no values are entered, these fields are considered to be empty text fields and will be treated as such in the GUI. Initially all parameters are optional, however, some of them are linked to each other.

## Reports

To generate a report in PDF format with the TSFReportMailer, at least the following parameters must be entered.

##### Mandatory

- report_id
- export_file_spec

##### Optional

- overwrite_old
- export_file_extension (default *pdf*)

## Email via Outlook

To send an email with Outlook via the TSFReportMailer, at least the following parameters must be entered and the parameter *send_mail* should be set to *true*, which is the default value.

##### Settings

- send_mail = true

##### Mandatory

- email

> This is not mandatory if the parameter *open_in_outlook* is set to *true*, the default value of this is *false*.

##### Optional

- smtp_only
- send_mail
- open_in_outlook
- save_mail
- html
- priority
- email
- cc
- bcc
- body
- subject
- use_signature
- signature_text
- signature_image
- account
- extra_attachments

## Email via SMTP

The TSFReportMailer tries as much as possible to revert to SMTP as it would otherwise become too much for the server. If this requires an alternative configuration, at least the mandatory parameters should be entered, otherwise the SMTP parameters will be ignored.

##### Settings

- send_mail = true
- smtp_only = true

##### Required fields

- smtp_username
- smtp_password
- smtp_host
- smtp_from_mail
- email

##### Optional fields

- smtp_port
- smtp_from_displayname
- smtp_use_ssl

It is also possible to specify (part of) the SMTP settings using parameters in the configuration file, so that these are the same for all users.