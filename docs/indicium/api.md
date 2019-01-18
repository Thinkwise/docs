---
title: OData API
---

The Thinkwise Indicium application tier offers an open API that can be used to perform CRUD-operations and execute procedures on the applications that have been made with the Thinkwise Platform. Through Indicium, a user will only have access to those tables, views and procedures for which the user has been authorized in IAM.

Indicium implements version 4.0 of the OData standard. The OData standard is well documented and as such this manual will not explain all of its features in detail. The OData documentation can be found using the link <http://www.odata.org/documentation/>.

Indicium supports the following OData operations and query string options in the URL:

* $metadata
* $top
* $skip
* $select
* $filter
* $orderby

Indicium supports filtering on and ordering by the display value of a lookup as well. This can be achieved by specifying `reference_id/display_column_id` in the request URL, rather than simply the ID of the column.

In addition to the standard OData operations, Indicium also supports a custom **$prefilter** operation which can be used to add prefilters to requests in order to select records from entities.

## Base URL

To access the API of a specific application, the URL of the request must always start with:

`<web_app_root_url>/iam/<appl>/`

In this template, &lt;web_app_root_url&gt; refers to the root URL of Indicium in IIS and &lt;appl&gt; refers to the ID or the alias of the application in question in IAM. Below, you will find two examples of valid base-URLs:

* <https://server/indicium/iam/123/>
* <https://server/indicium/iam/insights/>

All requests that start with this base-URL will be subjected to authentication. The type of authentication used depends on the configuration of the user in question in IAM. All authentication follows the [HTTP Basic](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) authentication scheme, meaning that Indicium should only be exposed to the Internet over HTTPS.

> Indicium running on a 2018.2 and earlier IAM must use `<web_app_root_url>/api/<appl>/` instead.

### Software Factory

The Indicium API provides access to project versions in the Software Factory development environment, as long as the Software Factory itself is available through the Indicium IAM.

`<web_app_root_url>/sf/<sf_appl>/`

The segment &lt;sf_appl&gt; refers to the application ID or application alias which can be found in the Software Factory at the desired runtime configuration. The runtime configuration must be activated for the user in the Software Factory to obtain access via Indicium.

For example:
* <https://server/indicium/sf/144/>
* <https://server/indicium/sf/insights/>

On the off chance that there are multiple Software Factory applications in IAM, the segment /sf/ can be substituted with the alias of another Software Factory application.

> Indicium running on a 2018.2 and earlier IAM must use `<web_app_root_url>/api/sf/_sf/<project_id>/<project_vrs_id>/<runtime_configuration_id>` instead.
>
>For example:
>
>* <https://server/indicium/api/sf/_sf/insights/1.00/(default)/>
>* <https://server/indicium/api/sf/_sf/insights/1.00/my_config/>

## Standard operations

Indicium offers several standard operations which can be performed on every application.

The first standard operation is **$metadata.** By putting $metadata behind the base-URL of an application, the metadata document for that application can be retrieved. This metadata document contains an extensive description of all entities and operations available for that user in that application. It can be used to validate whether a user's permissions in IAM have been configured properly and as a guideline for writing your own Indicium client.

The second standard operation is **$warmup**. By putting $warmup behind the base-URL of an application, it is possible to 'warm up' Indicium by preloading the application model for the permission set corresponding to the authenticated user. Aside from that, this operation is also suitable to check the authentication of a user, since the operation does not return any content. If the authentication is successful, a '204 No Content status' will be returned. If the authentication is unsuccessful, a '401 Forbidden' status will be returned.

## Performing CRUD-operations, functions and procedures

Aside from the standard operations, the Indicium API offers the ability to perform CRUD-operations on entities and to execute functions and procedures on the database.

| API action          | HTTP Verb | Example request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Selecting an entity | `GET`     | Request URL to retrieve all records from the project entity: <https://server/indicium/iam/appl/project> <br><br>Request URL to retrieve a specific record from the project entity given that it only has one numerical primary key column: <https://server/indicium/iam/appl/project(123)> <br><br>Request URL to retrieve a specific record from the sub_project entity which has a primary key of project_id and sub_project_id: <https://server/indicium/iam/appl/project(project_id=123,subproject_id=321)> <br><br>Request URL to retrieve the first 100 records from the project entity where the project_id is greater than 100, ordered by the project ID in ascending order: [https://server/indicium/iam/appl/project?$top=100&$select=project_id, description&$filter=project_id gt 100&$orderby=project_id asc](https://server/indicium/api/appl/project?$top=100&$select=project_id,%20description&$filter=project_id%20gt%20100&$orderby=project_id%20asc) |
| Inserting an entity | `POST`    | Request URL to insert a new record into the project entity: <https://server/indicium/iam/appl/project> <br><br>Request body assuming that project_id is not an identity: <br>`{"project_id": 123, "description": "a new project", "deadline": "2017-01-01T12:00:00.000"}` <br><br>Only one record can be inserted per request. All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Updating an entity  | `PATCH`   | Request URL to update the description of an existing record of the project entity: <https://server/indicium/iam/appl/project(123)>  <br><br>Request body:  <br>`{"description": "a changed project"}` <br><br>Records can only be updated by specifying their entire primary key between the parentheses. All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Deleting an entity  | `DELETE`  | To delete an existing record of the project entity: <https://server/indicium/iam/appl/project(123)> <br><br>Records can only be deleted by specifying their entire primary key between the parentheses. All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Calling a function  | `GET`     | Request URL to call the function my_function with parameters project_id and description: [https://server/indicium/iam/appl/my_function\(project_id=123,description='my project'\)](https://server/indicium/iam/appl/my_function%28project_id=123,description='my%20project'%29)<br><br>All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Calling a procedure | `POST`    | Request URL to call the procedure my_procedure with parameters project_id and description: <https://server/indicium/iam/appl/my_procedure> <br><br>Request body: <br>`{"project_id": 123, "description": "my project"}`<br><br> All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

> It is important to apply URL encoding (also known as Percent-encoding) to all value literals in the request URL.
> Value literals can only occur between the parentheses `( )` after the name of an entity and in the value of the `$filter` query string parameter.