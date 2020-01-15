---
title: Configuring IIS
id: version-2018.3-iis
original_id: iis
---

The Thinkwise Web GUI runs on IIS version 8 or up (10 is adviced) and requires the .NET Framework 4.7 as well as the ASP.NET Framework. 

An IIS version is included with the standard installation of Windows on a server or PC. Different versions of IIS are
released with the different versions of Windows. Checking the installed IIS version can be done by typing
*http://localhost* in the web browser, the IIS version screen will then be displayed. In the figure below, there are
two examples which can be displayed on screen. An IIS 7 version is shown on the left and an IIS 8 version on the right.

![](assets/deployment/7c4e17350920ad99e1b8678fd85233a9a65b06e1.png)
*IIS 8 welcome page*

## Installation

### IIS

The standard installation of IIS does not contain all components that are needed to run the Thinkwise Web GUI. The right
components can be enabled via Windows' *Windows Feature* screen, which is accessible via the Windows control panel. In
the image below, the necessary components are for different Windows versions.

![](assets/deployment/81d4ea5959b84fa97f336a36f4e48120c1dc8255.png)
*Windows Features screen in Windows 10*

![](assets/deployment/d73d64ef3e7e1e8e208ed1fed44209267334013c.png)
*Windows Server 20012R2 features*

### .NET Framework 4.7

In order to run an ASP.NET application, the .NET Framework 4.7 is needed. Check if this has been installed.

![](assets/deployment/ac113c20197ef987e6640f8f3a55c2c298822545.png)
*Windows Server 2012R2*

## Configuration

### Application pool

IIS uses Application Pools to run applications and to make configurations for these applications. By using different Application pools, it is ensured that web
applications can function separately from each other. It also ensures that they are not in the way of each other if an
error arises with one of the web applications due to a crash or memory problems. Thinkwise therefore advises that a new
pool is made in IIS for each Thinkwise Web GUI.

![](assets/deployment/300a7a3a0730b435ef9fc1b3ee25a0cafa10612e.png)
*Application Pools*

Give the Application Pool a suitable name related to the corresponding application to which this is going to be
connected. Subsequently, choose the .NET CLR version for the Application Pool. Version 4.0 is connected to .NET
framework 4.7 which is used by Thinkwise applications. The *Managed pipeline mode* can be set on Integrated. 

![](assets/deployment/50d8b54b408fba9db9c1f70de35cc0a54de2f069.png)
*Add Application Pool*

Confirm the dialogue in order to create the Application Pool.

The Application Pool Identity is also used to access files in the network. This could include, for example, images and
icons that the application uses or report files. To do this, in Advanced Settings > Process Model > Identity a domain user should be specified 
 that has rights to the locations of the used files. If access to the network is not needed, then the default identity suffices.

![](assets/deployment/97244597abe4210c7b26e4399038b00e859f37b6.png)
*Assign Application Pool Identity*

### (Re)starting the Application

Restarting the application can be done via the Application Pool overview. Select a pool and click *Recycle...* in the 
*Actions* bar on the right. 

Restarting is necessary after the contents of the Application Directory have been changed or if there are problems with
the application. After a restart, the application will start up again with a clean slate. Users will lose the
session in which they were working and must therefore log in again. Thinkwise therefore recommends preventing this as
much as possible in production environments while users work with the application.

![](assets/deployment/b6a2660f720e3bbc379ff3e48b7d95ac4ab3844b.png)
*Restarting the Application Pool*

## Security

After deploying a web application, it is essential to secure the web environment against hackers and malicious
intentions. Users' credentials and available data must be safely sent to the client or back to the web server.
Furthermore, the application must not be able to be abused by people who have not been granted access to it. This
section will describe which options are available to set up the web environment safely and what Thinkwise does in the
application to enable users to work safely with the web application.

### HTTPS

HTTPS or SSL encryption ensures that all information sent via the internet between the web server and the client is sent
encrypted. Therefore, it is not possible to see the sent information during the transport. The information may contain
user credentials or data from the database.

More information about HTTPS is available via this link: 
[http://en.WIKIpedia.org/WIKI/HTTP_Secure](http://en.wikipedia.org/wiki/HTTP_Secure)

Thinkwise strongly recommends to **always** use HTTPS. An [URL Rewrite rule](https://blogs.technet.microsoft.com/dawiese/2016/06/07/redirect-from-http-to-https-using-the-iis-url-rewrite-module/)
can redirect users from HTTP to HTTPS automatically.

#### Certificates

HTTPS works with a certificate that is installed on the web server. An HTTPS certificate is connected to the URL with
which the application is going to be accessed. If the URL is not yet available, it should first be requested. For
external access to the application, a domain name is needed, for example, <www.thinkwisesoftware.com>.

There are various providers of SSL certificates with various options and prices. There is a choice of:

- Type of validation:
  1.  Domain name validation
  1.  Organization validation
  1.  Comprehensive validation
- Type of certificate:
  1.  Single domain name certificate
  1.  Multiple domain names certificate
  1.  Wild card certificate
- Lifespan in years

> Please note that the certificate is extended in good time in order to prevent cancellation.

The certificate is linked to the URL with which the user can access the web application. Usually, port 443 of the web
environment is used to access the web application through HTTPS.

Connecting the certificate to the URL is done in IIS by right-clicking on the website in which the web application has
been placed and choosing *Edit Bindings…* .

![](assets/deployment/2d9cd3e4a4d61ac53523af1a54fd547c83322cdd.png)
*Edit bindings…*

Normally, one binding has already been specified for a website. This refers to the HTTP type with the *IP Address* `*`.
This is meant to test the application locally on the web server without HTTPS after deployment. 

If a binding is changed or added, the dialogue below will appear. In this dialog, the properties of the web application can be specified in order to
access this application externally via the internet. At the bottom of this pop-up, the SSL certificate that has just been installed
is chosen. Now, the certificate is connected to the web application's URL and the application can be accessed via HTTPS.

![](assets/deployment/9aa45ba26b9c5631afd28f98fc92ea1a199506e3.png)
*Edit site bindings*

### Session timeout

When the session timeout has expired which, by default, is at 20 minutes, the user is automatically logged out. The timeout takes effect from the moment
that the user stops clicking within the application. The session timeout can be set up in the IIS manager. This is done as follows:

1. Choose the correct website where the timeout has to be changed.
2. After selecting the website, click on the *Session State* option.
3. After adjusting the time, click on *Apply* on to implement the new timeout.

![](assets/deployment/77239c788ef3689c49edb4db87b58e4959576f9a.png)

![](assets/deployment/72f53ce201d1fa8f05ca1e566ac797fcf7fd9552.png)
*Setting up the session timeout*

## Performance and tuning

### Compression

In order to limit the data traffic and, by extension, improve the performance, we strongly advise that *Dynamic
Content Compression* is turned on in IIS. Less data traffic means that the end user will be able to see the result of
the executed action more quickly. This functionality must first be installed before it can be used. This can be done by
enabling it in *Windows Features*.

![](assets/deployment/5d205e9054c1b05530498a9f36bab376c6a2144c.png)
*Dynamic Content Compression enabled*

After installing the Dynamic Content Compression, the functionality in IIS can be turned on for specific applications.

![](assets/deployment/5b9a880bae58bf3367136c7f75275f634a309a0f.png)

Ensure that both dynamic and static compression are on. Then restart the Application Pool.

![](assets/deployment/c60e64d7ae898c06612a52b6b5d7f364c471525f.png)
*Compression*

For *Static compression*, it can be further specified wat and how much may be compressed. The default settings are
sufficient for Thinkwise applications.

### Idle time of the Application pool

By default, IIS stops an application pool if it is not used for more than 20 minutes. This *Idle time* setting can
be set on *0* to turn this off. This is especially important for mobile devices with offline data. If the service layer
can go *off*, then the application has lost its memory and thus also its caches.

Thinkwise advises that the *Idle time* is set on *0* because the first user who accesses the application after this will
always have to wait for the application to start up. Depending on the size of the application, this extra waiting time
can vary from half a minute to two minutes.

This can be set up on the Application Pool in IIS via Advanced settings > Process model > Idle Time-out.

### Automatic Recycling of the Application Pool

By default, IIS *recycles* an application every 1740 minutes (29 hours) in order to prevent potential problems in
the application or server. This means that logged-in users will lose their session and have to log in again. Thinkwise
advises that recycling be done at a fixed time, for example, daily or weekly at 03:00.

>   Why 29 hours? *Wade suggested 29 hours for the simple reason that it is the smallest prime number over 24. He wanted
>   a staggered and non-repeating pattern that does not occur more frequently than once per day. In Wade's words:'you
>   don't get a resonate pattern'. The default has been 1740 minutes (29 hours) ever since!*
>   (Source: <https://weblogs.asp.net/owscott/why-is-the-iis-default-app-pool-recycle-set-to-1740-minutes>)

This setting can be configured by clicking on the Application Pool in IIS and then right-clicking on the *Recycling*
button.

![](assets/deployment/250993f6388fd684b12874aa803b3e9c7e1417fb.png)
*Recycling settings*

### Application Initialization

After a manual or automatic recycle of the Application Pool, IIS provides various *Application Initialization* options
in order to warm up the application before the first user sends a request. In this way, the first request is just as
fast as all other requests. The *Application Initialization* feature can be enabled through *Windows Features*.

![https://weblog.west-wind.com/images/2013Windows-Live-Writer/Use-IIS-Application-Initi.NET-Apps-alive_14732/WindowsFeatures_2.png](assets/deployment/9d06f00047110b384f5d81252c7d976d41000db8.png)
*Enable Application Initialization*

See <http://www.iis.net/learn/get-started/whats-new-in-iis-8/iis-80-application-initialization> for more information.
Recycle the Application Pool in order to use the changes.

#### Start mode

On the Application Pool, the *Start Mode* can be set up on *AlwaysRunning* instead of *OnDemand*.

#### Preload

On the application in IIS, *Preload enabled* can be set up on *True* instead of *False*.

When enabled, a new Application Pool is started after a recycle and, when this is done, the old pool is
stopped. In this way, active users do not need to wait for very long before they can continue. Via Windows' Task
manager, what happens to the application pools during a restart process can be seen by keeping an eye on the *w3wp.exe*
processes.

## Troubleshooting

Errors that have occurred can be found in the Windows Event Viewer in *Windows Logs > Application*.

