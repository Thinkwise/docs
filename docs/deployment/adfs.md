---
title: ADFS
---

With [Active Directory Federation Services](https://en.wikipedia.org/wiki/Active_Directory_Federation_Services) (ADFS), it is possible to make an AD domain controller available in a safe way outside your own network. 

A web environment, in which the Web GUI is made available, is made available on the internet via the DMZ. This is a closed network outside your own internal network. Using ADFS, domain users can log in once via Single Sign On (SSO) on a portal. After this, they can gain access to all applications within the portal without having to log in again.

Another application of ADFS is the synchronization of two domain controllers which are in different networks. This can be useful in order to give external web users a domain account in a separate network and to make this available via ADFS to the internal network in which the Web GUI runs. Below is an example from Microsoft.

![](assets/deployment/c53efa1bcd89ec1b1e2d8ae6bc4298296ebdfee5.png)

For more information, see <https://blogs.technet.microsoft.com/askidentity/2013/05/13/an-introduction-to-ad-fs-we-can-all-understand/>.

### Thinkwise ADFS architecture

Below, the recommended architecture to apply ADFS is displayed.

![ADFS architectuur2](assets/deployment/14bd96c85368f5b05326ed5fa9d56e5f32c11bed.jpg)

Explanation of numbers in the image:

1. First request to the application, possibly via a proxy web server in the DMZ for external users. Application notices that the user is not yet authenticated.

2. User is redirected to the ADFS authentication procedure.

3. ADFS validates the credentials with the Domain controller and decides whether the user's access should be restored.

4. ADFS sends the user back to the application including a token that indicates that the user is now authorized. The application validates the user once again with ADFS.

The Web GUI provides SSO support via this architecture.

### Web GUI configuration

This section describes the required configuration for ADSF support. If the configuration is absent, the user is redirected to the tradition log-in page.

For ADFS support, it is necessary to configure ADFS in web.config. Below, fragments of the existing web.config are displayed in order to indicate where and what must be added.

```xml
<configuration>
    ...
    <configSections>
        ...
        <section name="system.identityModel" type="System.IdentityModel.Configuration.SystemIdentityModelSection, System.IdentityModel, Version=4.0.0.0, Culture=neutral, PublicKeyToken=B77A5C561934E089" />
        <section name="system.identityModel.services" type="System.IdentityModel.Services.Configuration.SystemIdentityModelServicesSection, System.IdentityModel.Services, Version=4.0.0.0, Culture=neutral, PublicKeyToken=B77A5C561934E089" />
    </configSections>
    ...
    <system.webServer>
        ...
        <modules>
            ...
            <add name="WSFederationAuthenticationModule" type="System.IdentityModel.Services.WSFederationAuthenticationModule, System.IdentityModel.Services, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="managedHandler" />
            <add name="SessionAuthenticationModule" type="System.IdentityModel.Services.SessionAuthenticationModule, System.IdentityModel.Services, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="managedHandler" />
        </modules>
        ...
    </system.webServer>
    ...
    <system.identityModel>
        <identityConfiguration>
            <audienceUris>
                <add value="https://[Website-URL]" />
            </audienceUris>
            <issuerNameRegistry type="System.IdentityModel.Tokens.ConfigurationBasedIssuerNameRegistry, System.IdentityModel, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089">
                <trustedIssuers>
                <add thumbprint="2451468b00bb58ab7bc7d5c9528b5e8b6cdc70bd" name="https://[ADFS-server-URL]/adfs/ls/" />
                </trustedIssuers>
            </issuerNameRegistry>
            <certificateValidation certificateValidationMode="None" />
        </identityConfiguration>
    </system.identityModel>
    <system.identityModel.services>
        <federationConfiguration>
            <cookieHandler requireSsl="false" />
            <wsFederation passiveRedirectEnabled="false" issuer="https://[ADFS-server-URL]/" realm="https://[Website-URL]/" reply="https://[Website-URL]/" requireHttps="false" />
        </federationConfiguration>
    </system.identityModel.services>
    ...
</configuration>

```

Parts between brackets should be replaced with your own URLs.

Users that authenticate via ADFS are simply redirected from the log-in page of the Web GUI to the main page. Redirecting the user to the Web GUI occurs via the AutoLogin.aspx page.

![](assets/deployment/75b9a755ea533d6d35e1df71a8aae41a71208f92.png)

Additional user verification methods remain possible for users who log in via ADFS. Think of:

  - logging in with Captcha;

  - Two-factor authentication via SMS, e-mail or TOTP.

Logging out from the GUI sends users back to the traditional log-in page by default. This can be changed through an .ini parameter. With that, users can, for example, be redirected to the website/portal from where the Web GUI has been clicked.

`LogoffUrl = http://www.mycompany.nl`

For users who log in with ADFS, pooling under the guidance of an RDBMS service account is used to make the connection with the IAM and final product databases.

### ADFS server configuration

This section describes the required configuration of the ADFS server so that the Web GUI can communication with it. Setting up an ADFS environment falls outside the scope of this document.

On the ADFS server in the ADFS manager, the Web GUI must be logged in as *Relying Party Trust*. The Web GUI and the ADFS server build up trust in this way.

![](assets/deployment/aa900d3d958a5b405bf00cf81478cdaf179beacb.png)

Choose the final option and click on *Next*. On the following page, choose a name with which the application can be recognized and click on *Next*. The pages after this can remain unchanged until *Configure URL*. There, choose the *WS-Federation* option and fill in the URL of the Web GUI.

With *Configure Identifiers*, add the URL of the Web GUI twice where the second has the following addition:
<https://.../AutoLogin.aspx>. Using HTTPS is required for ADFS.

![](assets/deployment/333d2f0851a63d8a8f0d5cfdfbb0725d939118a2.png)

Proceed through the wizard without any mandatory changes to save the *Relying Party Trust*.

The saved *Relying Party Trust* can be found in the ADFS Manager under *Trust Relations* - *Relying Party Trust*. Select the added item and click on *Edit Claim Rules*.

![](assets/deployment/e49d2c70b490430b44eb4e33e7fa116261134fac.png)

Here, add a new *Rule*. The Web GUI uses this to extract the user name of the logged-in user.

![](assets/deployment/96c0f2f3e35367719d181ce2797a2317ea430d2e.png)

![](assets/deployment/0c48c2d82478d2ebdccda535c7030390a2cc0037.png)

With this, the ADFS server has been configured so that the Web GUI can communicate with it.

Now go to the `AutoLogin.aspx` page of the Web GUI and check if the user is redirected to the main page.

> When running into errors while trying to login via ADFS, be sure to check the Windows Event Viewer of both the web server and ADFS server.
