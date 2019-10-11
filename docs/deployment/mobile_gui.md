---
title: Mobile
---

Once the Indicium application tier has been configured, you can start a Mobile GUI against it 
(provided that the targeted IAM of SF database contains applications that are available for Mobile).

Install the Thinkwise Indicium mobile app for [iOS](https://itunes.apple.com/nl/app/indicium/id1295683257) 
or [Android](https://play.google.com/store/apps/details?id=com.thinkwisesoftware.gui.indicium) on your phone or tablet, 
or download the [desktop viewer](http://office.thinkwisesoftware.com/TCP/DeepLinkHandler.ashx?deepLink=eyJFbnRpdHlJRCI6ImtsYW50X3Byb2R1Y3QiLCJFbnRpdHlWaWV3SUQiOiJrbGFudF9wcm9kdWN0X3RoaW5rd2lzZSIsIkNoaWxkUmVmIjpudWxsLCJHdWlBcHBsQWxpYXMiOiJ0Y3AiLCJSb3dWYWx1ZXMiOnsia2xhbnRfaWQiOjIsInByb2R1Y3RfaWQiOjkyM319) 
from TCP to run the mobile userinterface on your Windows PC or desktop.

## IAM configuration

If you want to start the product(s) present in IAM, set the meta server URL to the root of the IAM application. 
For most environments this will be <https://server/indicium/iam/iam/>.

![Mobile GUI IAM meta source](assets/indicium/mobile_indicium_iam_2018_3.png)

## SF configuration

Starting a product present in the Software Factory development environment works the same but you need to specify the root URL of the SF application as the meta server URL. 
For most environments this will be <https://server/indicium/iam/sf/>.

Furthermore, you'll need to provide the application ID or alias to start the correct runtime configuration. 
The application ID and alias can be found in the Software Factory at the desired runtime configuration. 
The runtime configuration must be activated for the user in the Software Factory to be able to start the product.

![Mobile GUI SF meta source](assets/indicium/mobile_indicium_sf_2018_3.png)

## Version 2018.2 or earlier

The API to start products against the Software Factory has been simplified with 2018.3. 
If Indicium is running against a 2018.2 IAM or earlier, the configuration for Mobile is a bit different. 

If you want to start the product(s) present in IAM, set the meta server URL to the root of the IAM application using the 2018.2 URL segment structure. 
For most environments this will be <https://server/indicium/api/iam/>.

![Mobile GUI IAM meta source](assets/indicium/image%20%2811%29.png)

To start a product present in the SF, you need to specify the root URL of the SF application as the meta server URL using the 2018.2 URL segment structure. 
For most environments this will be <https://server/indicium/api/sf/>.

Additionally, you will need to specify the project, project version and, if applicable, the runtime configuration.

![Mobile GUI SF meta source](assets/indicium/image.png)

> These settings are only intended to be used with Indiciums running on a 2018.2 IAM. Usage of URLs with the /api/ segment on Indiciums running on a 2018.3 IAM or higher is strongly discouraged as support will be discontinued.


## Troubleshooting

Testing and debugging the Thinkwise Mobile GUI is done with the desktop viewer (created with [Electron](https://electronjs.org/)), which can be downloaded from TCP.
If started with the command line parameter `-- debug` (or using `debug.bat`), the Chromium Developer Tools are shown.

![](assets/deployment/5af1fbce2ecea6f632f7be7ee58b2e6e6dc44968.png)

The *Network* tab shows all the network requests to the Indicium application tier. If a request goes wrong or, for example,
takes too long, then it is possible to see that here as the request will turn red. By clicking on the request, it can
be seen which component of the web service is invoked and with which parameters this is done. 
