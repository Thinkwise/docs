---
title: OData API
---

The Thinkwise Indicium application tier offers an open API that can be used to perform CRUD-operations and execute procedures on the applications that have been made with the Thinkwise Platform. Through Indicium, a user will only have access to those tables, views and procedures for which the user has been authorized in IAM.

Indicium implements version 4.0 of the OData standard. The OData standard is well documented, and as such, this manual will not explain all of its features in detail. The OData documentation can be found using the link [http://www.odata.org/documentation/](http://www.odata.org/documentation/).

Indicium supports the following OData operations and query string options in the URL:

* $metadata
* $top
* $skip
* $select
* $filter
* $orderby

Indicium supports filtering on and ordering by the display value of a lookup as well. This can be achieved by specifying `reference_id/display_column_id` in the request URL, rather than simply the ID of the column.

In addition to the standard OData operations, Indicium also supports a custom **$prefilter** operation which can be used to add prefilters to requests to select records from entities.

## Base URL

To access the API of a specific application, the URL of the request must always start with:

`<web_app_root_url>/api/<appl>/`

In this template, &lt;web_app_root_url&gt; refers to the root URL of Indicium in IIS, and &lt;appl&gt; refers to the ID or the alias of the application in question in IAM. Below you will find two examples of valid base-URLs:

* [https://server/indicium/api/123/](https://server/indicium/api/123/)
* [https://server/indicium/api/iam/](https://server/indicium/api/iam/)

All requests that start with this base-URL will be subjected to authentication. The type of authentication used depends on the configuration of the user in question in IAM. All authentication follows the HTTP Basic authentication scheme, meaning that Indicium should only be exposed to the Internet over HTTPS.

### Software Factory

The Indicium API provides access to project versions in the Software Factory development environment, as long as the Software Factory itself is available through the Indicium IAM.

To access a specific project version, add the segment `_sf` to the Software Factory base URL, followed by the `project_id`, the `project_vrs_id` and the `runtime_configuration_id` or `(default)`:

`<web_app_root_url>/api/sf/_sf/<project_id>/<project_vrs_id>/<runtime_configuration_id>`

For example:

* [https://server/indicium/api/sf/_sf/insights/1.00/\(default\)/company](https://server/indicium/api/sf/_sf/insights/1.00/%28default%29/company)
* [https://server/indicium/api/sf/_sf/insights/1.00/my_config/company](https://server/indicium/api/sf/_sf/insights/1.00/my_config/company)

## Standard operations

Indicium offers several standard operations which can be performed on every application.

The first standard operation is **$metadata.** By putting $metadata behind the base-URL of an application, the metadata document for that application can be retrieved. This metadata document contains an extensive description of all entities and operations available for that user in that application. It can be used to validate if a user's permissions in IAM have been configured properly and as a guideline for writing your own Indicium client.

The second standard operation is **$warmup**. By putting $warmup behind the base-URL of an application it is possible to 'warm up' Indicium by preloading the application model for the permission set corresponding to the authenticated user. Aside from that, this operation is also suitable to check the authentication for a user, since the operation does not return any content. If the authentication is successful, a `204 No Content status` will be returned. If the authentication is unsuccessful, a `401 Forbidden` status will be returned.

## Performing CRUD-operations, functions and procedures

Aside from the standard operations, the Indicium API offers the ability to perform CRUD-operations on entities and to execute functions and procedures on the database.

| API action          | HTTP Verb | Example request                                              |
| ------------------- | --------- | ------------------------------------------------------------ |
| Selecting an entity | `GET   `  | Request URL to retrieve all records from the project entity: [https://server/indicium/api/appl/project](https://server/indicium/api/appl/project) <br><br>Request URL to retrieve a specific record from the project entity, given that it only has one numerical primary key column: [https://server/indicium/api/appl/project\(123\)](https://server/indicium/api/appl/project%28123%29) <br><br>Request URL to retrieve a specific record from the sub_project entity, which has a primary key of project_id and sub_project_id: [https://server/indicium/api/appl/project\(project_id=123,subproject_id=321\)](https://server/indicium/api/appl/project%28project_id=123,subproject_id=321%29) <br>Request URL to retrieve the first 100 records from the project entity where the project_id is greater than 100, ordered by the project id in ascending order: [https://server/indicium/api/appl/project?$top=100&$select=project_id, description&$filter=project_id gt 100&$orderby=project_id asc](https://server/indicium/api/appl/project?$top=100&$select=project_id,%20description&$filter=project_id%20gt%20100&$orderby=project_id%20asc) |
| Inserting an entity | `POST  `  | Request URL to insert a new record into the project entity: [https://server/indicium/api/appl/project](https://server/indicium/api/appl/project) <br><br>Request body, assuming that project_id is not an identity: <br>`{"project_id": 123, "description": "a new project", "deadline": "2017-01-01T12:00:00.000"}` <br><br>Only one record can be inserted per request. All query string parameters will be ignored. |
| Updating an entity  | `PATCH `  | Request URL to update the description of an existing record of the project entity: [https://server/indicium/api/appl/project\(123\)](https://server/indicium/api/appl/project%28123%29)  <br><br>Request body:  <br>`{"description": "a changed project"}` <br><br>Records can only be updated by specifying their entire primary key between the parentheses. All query string parameters will be ignored. |
| Deleting an entity  | `DELETE`  | To delete an existing record of the project entity: [https://server/indicium/api/appl/project\(123\)](https://server/indicium/api/appl/project%28123%29) <br><br>Records can only be deleted by specifying their entire primary key between the parentheses. All query string parameters will be ignored. |
| Calling a function  | `GET   `  | Request URL to call the function my_function with parameters project_id and description: [https://server/indicium/api/appl/my_function\(project_id=123,description='my project'\)](https://server/indicium/api/appl/my_function%28project_id=123,description='my%20project'%29)<br><br>All query string parameters will be ignored. |
| Calling a procedure | `POST  `  | Request URL to call the procedure my_procedure with parameters project_id and description: [https://server/indicium/api/appl/my_procedure](https://server/indicium/api/appl/my_procedure) <br><br>Request body: <br>`{"project_id": 123, "description": "my project"}`<br><br> All query string parameters will be ignored. |
