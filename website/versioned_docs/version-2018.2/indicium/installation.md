---
title: Installation
id: version-2018.2-installation
original_id: installation
---

Indicium is a .NET Core application which means that it is capable of hosting itself with a built-in web server. However, for security and management reasons, we do not recommend exposing the built-in web server in production environments. Instead, we recommend hosting Indicium behind an IIS proxy, since IIS is rich in features and offers great management tools. This chapter will explain how Indicium can be integrated in an IIS proxy.

## Prerequisites

There are a couple of prerequisites that need to be met before Indicium can be installed on IIS. This chapter will describe all of the necessary steps.

### .NET Framework

Indicium is built with version 4.6.1 of the .NET Framework. As such, this is the minimum version of the .NET Framework that needs to be installed on the web server. If the web server has a lower version of the .NET Framework, or none at all, then use the following link to install the latest version of the .NET Framework: [https://www.microsoft.com/net/download/thank-you/net472](https://www.microsoft.com/net/download/thank-you/net472)

### .NET Core Windows Server Hosting Module

To facilitate the integration of Indicium in IIS, it is necessary to install Microsoft’s .NET Core Windows Server Hosting Module on the web server. This module enables IIS to take control of starting and stopping Indicium, amongst other things. To check if the module has already been installed, open *Modules* on a website in the IIS Manager.

![AspNetCoreModule](assets/indicium/image%20%285%29.png)

If the module has not been installed yet, then use this link to install it: [https://www.microsoft.com/net/download/thank-you/dotnet-runtime-2.1.2-windows-hosting-bundle-installer](https://www.microsoft.com/net/download/thank-you/dotnet-runtime-2.1.2-windows-hosting-bundle-installer)

### URL Rewrite Module

Finally, it is necessary to install Microsoft’s URL Rewrite Module for IIS. URL rewriting is a feature that is not available in IIS by default, though it is necessary to facilitate the integration of Indicium. The availability of this module can also be checked in the IIS Manager, much like the previous module.

![RewriteModule](assets/indicium/image%20%288%29.png)

If the URL Rewrite module has not been installed yet, then use the link below to install it: [https://www.iis.net/downloads/microsoft/url-rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)

## Creating an Application Pool

As stated earlier, Indicium is capable of hosting itself and IIS is merely used as a proxy to expose Indicium to the network and/or the internet. As such, all the heavy lifting is performed by Indicium’s own web server and the Application Pool in IIS does not even need to initialize a .NET runtime. Because of this, it is wise to select *No Managed Code* when creating an Application Pool for Indicium, as it will positively affect the start up time.

![Add Application Pool](assets/indicium/image%20%289%29.png)

After creating the Application Pool, it is necessary to open the settings of the Application Pool and configure an Identity which has sufficient permissions to read/write from/to all the relevant disk locations. What these disk locations are depends on where the application stores its images and other files, and to which locations the application can upload files.

![Advanced Settings](assets/indicium/image%20%286%29.png)

## Creating the Web Application

Copy the Indicium binaries and other files to the desired location on the web server. Typically, this location will be something like C:\inetpub\wwwroot\indicium. Next, open the appsettings.json file with a text editor \(as Administrator\) to configure the connection to the IAM database.

Indicium handles authentication and authorization internally and will perform all database traffic with a single user, the Database Pool User. If you do not want the Database Pool User to be the same as the Application Pool user in IIS, then you can choose to override it by means of the PoolUserName and PoolPassword properties in the appsettings.json file.

The Database Pool User needs to be configured as a **Main administrator** in the Intelligent Application Manager. Furthermore, it needs to be assigned **All rights** for all applications that need to be accessible through Indicium. The users connecting to Indicium \(the End Users\) do not have to be Main administrators and can be given selective permissions to the applications as you see fit. Furthermore, End Users do not require any physical permissions on the database, unless they use RDBMS authentication in which case they only need to be able to open a connection to the database.

> Double quotes \( " \) and backslashes \( \\ \)  in the appsettings.json file, for instance in usernames or the server address, need to be escaped by an extra backslash. 
> For example: `server\instance` should be `server\\instance`.

![Appsettings.json](assets/indicium/image%20%2810%29.png)

Finally, create a new Web Application in the IIS Manager and choose an alias, the created Application Pool and the physical path to Indicium.

![Add Application](assets/indicium/image%20%281%29.png)

The Web Application will attempt to listen on port 80 by default. If this port is already in use, then it is necessary to choose another port.

When done, the Web Application can be started. Open a browser and navigate to [https://server/indicium/api](https://server/indicium/api) to verify that Indicium is running and configured correctly.

![Check if Indicium is running](assets/indicium/image%20%287%29.png)

If you do not get a result like the image above, then please refer to [Troubleshooting ](#troubleshooting-issues) below for steps to resolve your problem.

## Enable changing and resetting passwords

As of version 2018.2.1, Indicium supports changing and resetting passwords for users with IAM authentication. However, for resetting passwords to work, Indicium needs to be able to send emails to users, which requires some additional configuration.

To enable the reset password feature, add the following template to the appsettings.json file and fill it out.

![Email settings template](assets/indicium/image%20%284%29.png)

> The reset password feature also requires the email address of users to be configured in IAM.

## Starting a Mobile GUI against Indicium

Now that the server has been configured, you can start a Mobile GUI against it \(provided that the targeted IAM database contains applications that are available for Mobile\).

If you want to target an IAM meta source, then set the meta server URL to the root of the IAM application. In other words, take the root URL of Indicium, add /api to it and then add the ID or the alias of the IAM application to it. As of version 2018.1 of IAM, the default alias of the IAM application is *iam*, but it is best to double-check this by querying the gui_appl table.

![Mobile GUI IAM meta source](assets/indicium/image%20%2811%29.png)

Targeting an SF meta source works the same but you need to specify the root URL of the SF application as the meta server URL. Additionally, you will need to specify the project, project version and, if applicable, the runtime configuration.

![Mobile GUI SF meta source](assets/indicium/image.png)

## Troubleshooting issues

### Startup errors

If the root URL of Indicium \(e.g. [https://server/indicium/](https://server/indicium/)\) gives an error, then it will most likely state “An error occurred while starting the application” and/or show error code 502.21. With version 2.0.6+ of the AspNetCoreModule for IIS, the error page should include the cause of the error, which is typically informative enough to point you in the right direction. If not, then please follow the steps below in their stated order.

#### JSON

Ensure that the JSON in the appsettings.json is valid. The most common mistakes are forgetting to **escape backslashes**, either in the server address or the pool username, or forgetting **a comma after a property** which is not the last one.

![Invalid JSON](assets/indicium/image%20%282%29.png)

If you want to be certain that the JSON is valid, then you can use this website to validate it (though it would be wise to clear any sensitive information first): [https://jsonlint.com](https://jsonlint.com/)

#### Connection

Ensure that the information in the appsettings.json is correct. Double-check the server address and the database, and ensure that the Database Pool User has access to the configured IAM database. Also, ensure that the pool user is a user in IAM, that its authentication method is correct and that the user is a Main administrator in IAM.

Furthermore, the permissions for this user should be applied to the IAM database as well. See [Creating the Web Application](#creating-the-web-application) for more information.

#### Prerequisites 

Double-check if the server has met the prerequisites mentioned in [Prerequisites](#prerequisites). Missing either of these would also cause this start up error.

#### Log files

Gather the log files in the Logs folder in the root of Indicium and send them to your point of contact at Thinkwise to receive further assistance.

### 401 - Unauthorized

If you are getting "401 - Unauthorized" results for a user \(i.e., if the browser keeps prompting you to log in\) and you are certain that the specified credentials are correct, then please check if the authentication method of the user is set correctly. In particular, when using domain credentials, the authentication method should be Windows, not RDBMS.

### 402 - Application not found

If an application URL \(e.g., [https://server/indicium/api/myAppl](https://server/indicium/api/myAppl)\) gives the result “402 - Application not found” and you are certain that the URL is correct, please ensure that both the Database Pool User and the user that you are using to log in as have access to the application in IAM. Note that the Database Pool User also requires permissions on the database itself.

## Running Indicium in Development mode

By default, Indicium will run in Production mode. In this mode, Indicium will limit the amount of information it sends to clients when database errors occur for security reasons.

As of version 2018.2.3, Indicium will also send the translatable database errors, such as primary key violations, to the client. These database errors were previously restricted to Development mode. This change should make it much less necessary to run Indicium in Development mode.

Production mode does not influence the amount of information that is logged to disk when errors occur. Indicium will always log all errors, whether related to the database or not, to the Logs folder in the root of Indicium.

If you want to run Indicium in Development mode, then you need to make the following changes to the Web.config file in the root of Indicium:

![Configuring Development mode in the Web.config file](assets/indicium/image%20%283%29.png)

> As convenient as it may seem to always run all instances of Indicium in Development mode, please do not do this. 
> Only run Indicium in Development mode when you are actually developing and debugging problems or if Indicium is only accessible by trustworthy users.
