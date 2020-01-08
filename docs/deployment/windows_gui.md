---
title: Windows
---

The Thinkwise Windows GUI is launched by double clicking the shortcut to the Windows GUI executable. 

![](assets/deployment/21bfe577d8191eedcea2e035a70a95cd1c3a3f21.png)
*Windows GUI shortcut*

If the GUI is started without a configuration file the dialogue as shown below will open. Here, the correct data must then be manually entered in order to start. 

![](assets/deployment/b59fa1fc0c1804130b8394c9297b9d4e65fd600f.png)
*Windows GUI logon dialog*

For convenience, it is possible to create a [configuration file (*.ini*)](../sf/configuration_file) which determines the default settings used. Launching with a specific configuration file can be done as follows:

- The configuration file can be dragged on the executable (*TSF_dotNET.exe* or *TSF_CS.exe*) icon; or
- A shortcut can be made to the executable, where the path to the configuration file is specified as the parameter:

![](assets/deployment/eef55a0e61c2573d3dc1b15fa1941815ffc7024f.png)
*Shortcut with a "default.ini" configuration file*

## ClickStart

With Thinkwise ClickStart, the Thinkwise user interface can be stored centrally in a network location and end users will only need a shortcut to the ClickStart executable\*. When starting the Thinkwise Windows GUI via ClickStart, it will be checked whether a local copy of the Thinkwise GUI is present and if it is the same as the version on the server. If that is not the case, then the local Thinkwise GUI will be updated. After that, the application will be started.

If a new version of the GUI has to be deployed, then it is only necessary to update the central version. All clients will automatically get the new version upon startup. The advantage of ClickStart is that the GUI can be replaced on the server even when it is in use. 

If ClickStart signals that a new version of the GUI is available, but the current version is in use, then a notification will show with the question of whether the user would like to launch the old version.

![](assets/deployment/935929896610eaed34cd522ba485d30d095c87b3.png)
*Current Windows GUI is in use*

### Configuration

When starting the ClickStart executable (TSF_CS.exe), the settings from the *clickstart.ini* configuration file will be loaded before the local user interface, if necessary, will be updated. In the ClickStart configuration file, the following settings, among others, can be specified:

| Parameter            | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| ProgramFilesLocation | Path to the local copy of the user interface. In this path, a variety of environment variables can be used:<br/><br/>`%APPDATA%` - Local Application Data directory, for example `C:\Users\[user]\AppData\Local`<br/>`%PROGRAMFILES%` - Program Files directory, for example `C:\Program Files`<br/>`%TEMP%` - Temporary directory<br/>`%SOURCEDIR%` - Directory name of the network location that the GUI is in. If this is, for example, `T:\GUI\Production`, then the variable has the value `Production`.<br/><br/>Default location: `%APPDATA%\Thinkwise Software\GUI\%SOURCEDIR%\` |
| Icon                 | The icon that is displayed in the top-left corner of the ClickStart window, for example, `image.ico` |
| Logo                 | The logo that is displayed in the top-right corner of the ClickStart window, for example, `image.svg` (100x50 pixels) |
| Title                | The title of the ClickStart window, for example, *Thinkwise ClickStart* |

For a complete overview of the available settings, see the *clickstart_sample.ini* file provided with the Windows user interface.

> The use of Clickstart is not recommended for terminal server (or virtual app) environments.
