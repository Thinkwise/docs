---
title: General
id: version-2018.2-indicium_general
original_id: indicium_general
---

The Indicium application tier is a generic service tier application which uses model interpretation to provide the required logic and functionality. It replaces and expands the previous generated service tier and acts as a central hub for interfaces, business logic, workflow, analytics, security, reporting and much more.

 ![img](../assets/sf/clip_image002.png)
*Indicium Application Tier*

The Indicium application tier is a generic application that interprets the model. It is capable of serving models for multiple applications at once, including the Intelligent Application Manager. Multiple instances of the stateless application tier can also be used side by side for scaling and failover purposes.

The application tier will automatically detect any changes to the model and hot-reload the updated model, which speeds up the development and prevents down-time in live environments.

Default connectors and adapters are available to easily integrate with different services and applications, such as:

- Artificial Intelligence services (Bots, Virtual Assistants, Machine Learning, Image recognition)
- Big Data solutions (Search, Analytics, Internet of Things)
- Office integration (Exchange, Office 365, SharePoint)
- Third party applications (custom user interfaces, financial applications)

Third party applications and services in turn can connect to Thinkwise applications with minimal effort using the provided web hooks and REST API. The Indicium application tier uses the [OData](http://www.odata.org/) protocol for its API, one of the most widely-used standards for RESTful web services.