---
title: Integrated security
id: version-2018.3.2-integrated_security
original_id: integrated_security
---

The Web GUI supports Integrated Security. Using Integrated Security, domain users can
log in on the Web GUI without having to enter their credentials.

## Enabling Integrated Security

Integrated Security can be enabled in IIS by:

1. Checking *Windows Authentication* in the *Security* group when installing IIS in Security:
   
   ![](assets/deployment/e4d63d1abdd94cff0aff05fca402977ce3b4798b.png)

2. Clicking on your application in the IIS manager and subsequently clicking on *Authentication*:

   ![](assets/deployment/64c1f338e0b9373c88ada370109a2420da2c4e53.png)

   ![](assets/deployment/8c1e44141936be45195852e6f49ae9dd526e85a9.png)

3. Select Windows Authentication and right-click on *enable*:

## Access

Domain users can directly use Windows Authentication by navigating to the application via the following URL:
<https://[url]/AutoLogin.aspx>

The log-in page of the Web GUI remains available for users with other authentication types. On this page, a link can be
added to allow the domain user to *automatically* log in via the AutoLogin.aspx page without needing to change the URL.
This can be enabled with the *LoginIamDomainUser* [extended property](../sf/extended_properties).

![](assets/deployment/3f52e2ec73f8c6e035af92356caf2e368a26d744.png)

## Browser configuration

This feature can be used without configuration in the browser. The browser will then show a log-in dialogue to the user
where they only have to fill in their domain account once as long as the browser remains open.

> It is recommended not to use this feature on public PCs because users that subsequently log in on this PC will then also
> have access to the account. Also, do not forget to log out, using the red button at the bottom left-hand corner of the GUI.

To be able to fully automatically log in, without manually entering the domain account on your own PC, you should give
the web server's URL permission to be allowed to use this in your favorite browser.

### IE & Edge

Open *Internet Options* from the browser or Windows settings.

![](assets/deployment/38d79c7b5b1682cd50beaa23bf59b2fdce41246b.png)

Via the *Custom Level* button you can specify what should be done per *Security zone* if you try to log in automatically.

![](assets/deployment/a3e686f5a4b7f9559945aa8938fefccd8dd94b37.png)

### Firefox

Navigate to: <about:config>

Check the following settings by looking them up in the list or this page:

| Setting:                                  | Value:           |
| ----------------------------------------- | ---------------- |
| network.negotiate-auth.delegation-uris    | [web-server url] |
| network.automatic-ntlm-auth.trusted-uris  | [web-server url] |
| network.automatic-ntlm-auth.allow-proxies | True             |
| network.negotiate-auth.allow-proxies      | True             |

Firefox Add-ons are also available to do this.

### Chrome

Within Windows, Chrome uses the same settings as IE and Edge.