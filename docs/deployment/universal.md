---
title: Universal GUI
---

The Universal GUI is the latest Thinkwise user interface, capable of providing a state-of-the-art user experience on Mobile, Desktop and Web.

> This document focuses on the current Beta version of the Universal GUI. Capabilities, deployment guidelines and requirements will change as development continues.

## Set-up

The Universal GUI beta version is deployed as a web application.
It is a [Progressive Web App (PWA)](https://ymedialabs.com/progressive-web-apps), which means it can be installed to the users device by supported platforms and browsers, acting just like a native desktop or mobile app.

The Universal GUI can be downloaded like any other Thinkwise user interface from the Thinkwise Community Portal.

### Requirements

There are a few prerequisites to be able to run the Universal GUI.

The Universal GUI uses a dedicated version of Indicium. Make sure to download and install **Indicium Universal**.

The easiest way to run the Universal GUI is to deploy it on the same server as Indicium. Browser security prohibits the Universal GUI from interacting with an Indicium on a different server by default. If required, Indicium settings can be configured to support this scenario.

The Universal GUI only supports 2019.1 and future versions of the Thinkwise Platform. Ensure you have the **latest hotfixes** applied and the latest version of Indicium installed.

Applying further hotfixes or installing a subsequent version of Indicium might require an updated version of the Universal GUI as well.

The latest Beta version of the Universal GUI, along with the latest version of Indicium Universal and the most recently published hotfixes can be found in the Thinkwise Community Portal.

### Deployment

The Universal GUI is a web application using static files. Besides the HTTP server, no further application process is running.

Indicium is mandatory to use the Universal GUI and most Indicium installations are currently deployed on IIS. Deployment of the Universal GUI on IIS is shown as an example. Any webserver capable of serving static files can be used to deploy the Universal GUI.

The unzipped Universal GUI folder can be placed next to Indicium. A common location for the Universal GUI would be in the `inetpub\wwwroot` folder.

![](assets/deployment/universal-alpha-install.png)
*Location of the Universal GUI on an IIS server, next to Indicium*

the Universal GUI folder should __not__ be converted to an application, as it is a static website. No application pool is required.

> Be careful when deploying two the Universal GUI instances on the same server. When two the Universal GUI instances are accessible on the same (sub)domain, browsers will share the cache containing the Indicium URL, platform and application between the two Universal GUI instances.

IIS is not configured by default to serve certain types of static content. Configure the MIME Types of the server to serve the following types:

| Extension  | MIME Type         |
|:-----------|:------------------|
| .json      | application/json  |
| .woff2     | font/woff2        |

![](assets/deployment/universal-mime-types.png)
*The .json extension configured to be served by IIS*

If this is not configured properly, the application will not have the correct fonts and will not load the correct configuration.

### Accessing the Universal GUI

The Universal GUI can be accessed using a browser to access the location of the web application. In the example above, this would be https://tsf-pc/universal.

A login screen will be shown where the URL to access Indicium can be configured.

![](assets/deployment/universal-alpha-login.png)
*Login screen of the Universal GUI*

A modern browser is required to access the Universal GUI. A recent version of Chrome, Firefox, Edge or Safari mobile is required. Using the Universal GUI with IE is not supported.

The application can be installed as a Progressive Web App (PWA) to run stand-alone on your desktop or mobile device.
This is done through the browser. Please check the instructions for installing PWAs for your browser, e.g. [Chrome](https://www.howtogeek.com/fyi/how-to-install-progressive-web-apps-pwas-in-chrome/), or device.

### Running the Universal GUI on IAM

When Indicium is configured on an IAM containing one or more applications for the user, the following URL can be used to run products present in this Software Factory: `https://tsf-pc/indicium/iam/iam`.

The application ID or alias can be used to load a specific application from IAM. If left empty, the default application will be shown. Other applications will be available through the menu.

The platform can be chosen by the user to load the menu for either Windows, Web or Mobile.

The file ``config.json`` can be edited on the webserver to have the Universal GUI point to the correct URL, application and platform default and to optionally disable editing the options from the login popup.

### Running the Universal GUI on SF

To run products in a development environment directly on the Software Factory, Indicium must be configured on the IAM containing the Software Factory, often referred to as an IAM_DEV.

The following URL can be used to run products present in this Software Factory: `https://tsf-pc/indicium/iam/sf`.

The application ID or alias provided in the login configuration screen should match an application ID or alias present as a [*Runtime configuration*](../sf/runtime_configuration) in the Software Factory. When no application ID or alias is provided, all active runtime configurations for the current user will be shown in the menu as applications. The desired runtime configuration(s) can be activated in the Software Factory for the user logging in to the application.

The user can log in using the credentials used as configured in the IAM_DEV. The RDBMS user in the Software Factory must match the user ID as defined in IAM.

### Troubleshooting

- Download the latest Universal GUI version, the Universal GUI version and run all upgrades and hotfixes on the SF and IAM.
- Try running the Universal GUI and Indicium on the same server. The domain name for both URLs must be the same.
- Use fully qualified domain names, like `server.thinkwisesoftware.com/indicium` instead of `server/indicium`.
- Test access to Indicium by accessing the URL directly with the used credentials.
- Clear the cache of your browser. Alternatively, try incognito mode.
- If possible, update your browser or switch to a recommended browser.
- Ensure the user has access to the application in the Intelligent Application Manager or the runtime configuration in the Software Factory.
- Ensure a list bar menu or tile menu is available to the user.
- Run the _Correct foreign key casing_ task in the Software Factory and re-synchronize with IAM if needed to prevent casing issues.
- Validate the model. The Universal GUI is sensitive to incorrect models.
- Ensure the MIME types are configured correctly on the webserver.

## Current capabilities

Please check to the feature matrix in the Thinkwise Community Portal to learn more about the capabilities of the current release.

## Major changes - By design

Some new concepts have been introduced and some model settings are interpreted differently than other GUIs. This is by design. All designed changes do remain subject to change.

### Model loading

Contrary to the current user interfaces, the full model of the application is not loaded. Instead, segments of the model are loaded on-demand, when a screen is opened, when a look-up is translated or when a component is initialized. This allows the Universal GUI to quickly start massive applications.

Future optimizations include pre-fetching segments required for working offline, pre-fetching often-used model segments, pre-fetching model segments for the current process flow, etcetera.

### Vertical scrolling

All components in the Universal GUI are allowed to grow indefinitely vertically. This can introduce scrollbars. To prevent parallel scrollable components, future releases will allow the screen type itself to grow indefinitely vertically as well, providing a global scroll bar for the entire screen.

### Breakpoints

With vertical space usage covered, limited horizontal space is resolved in a different manner. Where the current generation of GUI's rely on the components dealing with limited horizontal space, the Universal GUI allows for screen-type switching at runtime, depending on the horizontal space.

This concept is known as breakpoints. For every screen type, breakpoints can be defined which come into effect when a certain minimum width is reached. This is done using a screen type naming convention and will be formalized in the 2020.2 release.

For instance, a `customer` screen uses `master_detail` as screen type. A new screen type named `master_detail_<1000` can be added in the model. This is a breakpoint screen type. The breakpoint screen type will be applied when the available horizontal space is 1000px or less. A different layout of screen components or different screen components altogether can be used in this breakpoint. A second breakpoint can be added named `master_detail_<400` which will be applied when the available is 400 or less. This way, multiple component layouts can be added for various sizes without having to resort to variants and platform-specific menus.

### Form tabs as sections

Form tabs are not implemented because of the ability to grow indefinitely vertically. Instead, new tabs are interpreted by the Universal GUI as new _sections_. The number of form columns can vary for each section. Groups are kept together in form columns as much as possible and will be spread evenly over a section.

### Form column count

The number of columns in the form is based on the number of form groups within a section. The number of form columns will never exceed the number of groups in the section. An arbitrary maximum of 3 form columns is active for now, falling back to 1 column on small screens.

This is by design for the current Beta version but candidate to be revised. Either a developer will be able to set the maximum number of columns for a form at the screen type or the Universal GUI will use a heuristic algorithm to determine the optimal maximum number of columns given the horizontal space.
