---
title: Configuration file (.ini)
---

The Windows and Web user interfaces need a configuration file \(settings.ini\) to be able to connect to the Software Factory or Intelligent Application Manager.

The connection parameters in the configuration file determine which Software Factory or Intelligent Application Database database is used to load the application model.

## Connection parameters

| Parameter                                             | Description                                                  | Options                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **MetaSource**                                        | Meta model source                                            | SF<br>**IAM**                                                |
| **RDBMS**                                             | Relational database management system of the end product      | SQLServer<br>iSeries (*IBM i*)<br>Indicium<br>Oracle<br>Mock |
| **Server**                                            | Name or IP address of the end product server, including the instance name |                                                              |
| **Database**                                          | Database or schema name of the SF or IAM                     |                                                              |
| **Authentication**                                    | Authentication to use                                        | MSWindows - Integrated security for SQL Server <br>RDBMS - Database username and password <br>Kerberos - Integrated security for IBM i and SQL Server |
| Configuration<br>*(optional)*                         | The runtime or global configuration to use                   | Name of the runtime configuration. <br>Default: *default* configuration |
| Project<br>*(SF only)*                                | To start a specific project                                  |                                                              |
| ProjectVersion<br>*(SF only)*                         | To start a specific project version.                         | Default: latest version                                      |
| <a name="execution-mode"></a>Language<br>*(optional)* | Language to use for the login form and splash screen         | en, nl ([ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1)) <br>en-GB, nl-NL ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1)/[ISO 3166](http://en.wikipedia.org/wiki/ISO_3166)) <br>eng, nld ([ISO 639-2](http://en.wikipedia.org/wiki/ISO_639-2)) <br>Default: system language |
| ExecutionMode<br>*(optional)*                         | Set to Developer to enable debug options                     | **Enduser** <br>Developer                                    |
| User *(optional)*                                     | Default username                                             |                                                              |

## Examples

### IAM 
```ini
MetaSource     = IAM
RDBMS          = iSeries
Server         = db2.thinkwisesoftware.com
Database       = IAM_PROD
Authentication = Kerberos
```

### SF 
```ini
MetaSource     = SF
RDBMS          = SQLServer
Server         = sqlserver.thinkwisesoftware.com\sql2018
Database       = SF_DEV
Authentication = MSWindows

Project        = MyProject
ProjectVersion = 1.20

Configuration  = test_environment
ExecutionMode  = Developer
```

## Other parameters

| Parameter                     | Description                                                  | Options                                                      |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| AllowResetPassword            | Users with RDBMS login are allowed to reset their password. <br> A link "Forgot password" is shown in the login page. After clicking, a new page is shown where the user can fill in the new password and a code is sent by email. | Yes<br>**No**                                                |
| AlternativeUserName           |                                                              |                                                              |
| ApplicationIcon               | Icon in the Windows task bar.                                |                                                              |
| ApplicationLoginBackground    | Background image for the login page. <br>Full path on disk. Use UNC path when it is on a network location. |                                                              |
| ApplicationLoginBlocked       | Block users to log in to the application and show a message to the user on the login page. | Yes<br>**No**                                                |
| ApplicationLoginLogo          | Logo on the login page<br>Full path on disk. Use UNC path when it is on a network location. Shown at 190x95px. |                                                              |
| ApplicationTitle              | Title on the login page                                      |                                                              |
| BrowserIcon                   | Icon in browser tab header                                   |                                                              |
| CSVLogging                    | Write query logging to csv file. Requires ExecutionMode *Developer* and subdirectory *Logs* to exist in the GUI folder. |                                                              |
| LoginCaptchaNoise             | Enable Captcha field on the login page to fill in before you can login. | **None** - No captcha<br>Low - Case insensitive, low noise level, three chars and no chars and numbers that look alike.<br/>Medium - Low with medium noise level and four chars<br/>High - Medium with high noise level and  five chars<br/>Extreme - Case sensitive, maximal noise level, five chars and all chars and numbers |
| LoginIamDomainUser            | Enable/disable link on login page                            | Yes<br>**No**                                                |
| LogOffUrl                     | Url to go after logoff.                                   |                                                              |
| LogToFile                     | Write logging to file. Only when executionmode is 'Developer'. Requires subdirectory 'Logs' to exist in the GUI folder. | Yes<br>**No**                                                |
| NoAsyncReportPreload          | Don't preload Crystal Reports when starting (if this crashes the user interface) |                                                              |
| ResetPasswordCaptchaNoise     | Noise level for the Captcha field on the Reset password page. | See LoginCaptchaNoise parameter.                             |
| ShowLoginInfo                 | Database info on login page and splashscreen                 | **Yes**<br>No                                                |
| ShowPasswordStrengthIndicator | Configure whether the GUI shows password strength indicators when the user inserts a new password. | **Yes**<br>No                                                |
| ShowSplash                    | Show the splash screen                                       | **Yes**<br>No                                                |
| SmtpEnableSSL                 | SMTP settings for password reset emails                      |                                                              |
| SmtpFrom                      | From email address                                           |                                                              |
| SmtpFromDisplayName           | From display name                                            |                                                              |
| SmtpPassword                  | Password                                                     |                                                              |
| SmtpPort                      | Port                                                         |                                                              |
| SmtpServer                    | Server                                                       |                                                              |
| SmtpUser                      | Username                                                     |                                                              |
| TwilioAccountAuthToken        |                                                              |                                                              |
| TwilioAccountSid              |                                                              |                                                              |
| TwilioFromNumber              |                                                              |                                                              |
| TwoFactorEmailMessageService  |                                                              |                                                              |
| TwoFactorSmsMessageService    |                                                              |                                                              |
| XFrameOptions                 | Configure the [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) response header | deny<br>**sameorigin**<br>allow-from [site]                  |

