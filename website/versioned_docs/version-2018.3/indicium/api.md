---
title: OData API
id: version-2018.3-api
original_id: api
---

The Thinkwise Indicium application tier offers an open API that can be used to perform CRUD-operations and execute
procedures on the applications that have been made with the Thinkwise Platform. Through Indicium, a user will only have
access to those tables, views and procedures for which the user has been authorized in IAM.

Indicium implements version 4.0 of the OData standard. The OData standard is well documented and as such this manual
will not explain all of its features in detail. The OData documentation can be found using the link
<http://www.odata.org/documentation/>.

## Base URL

To access the API of a specific application, the URL of the request must always start with:

`<web_app_root_url>/iam/<appl>/`

In this template, `<web_app_root_url>` refers to the root URL of Indicium in IIS and `<appl>` refers to the ID
or the alias of the application in question in IAM. Below, you will find two examples of valid base-URLs:

- <https://server/indicium/iam/123/>
- <https://server/indicium/iam/insights/>

All requests that start with this base-URL will be subjected to authentication. The type of authentication used depends
on the configuration of the user in question in IAM. All authentication follows the [HTTP
Basic](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) authentication scheme, meaning that Indicium
should only be exposed to the Internet over HTTPS.

> Indicium running on a 2018.2 and earlier IAM must use `<web_app_root_url>/api/<appl>/` instead.

### Software Factory

The Indicium API provides access to project versions in the Software Factory development environment, as long as the
Software Factory itself is available through the Indicium IAM.

`<web_app_root_url>/sf/<sf_appl>/`

The segment &lt;sf_appl&gt; refers to the application ID or application alias which can be found in the Software Factory
at the desired runtime configuration. The runtime configuration must be activated for the user in the Software Factory
to obtain access via Indicium.

For example:

- <https://server/indicium/sf/144/>
- <https://server/indicium/sf/insights/>

On the off chance that there are multiple Software Factory applications in IAM, the segment /sf/ can be substituted with
the alias of another Software Factory application.

> Indicium running on a 2018.2 and earlier IAM must use
>`<web_app_root_url>/api/sf/_sf/<project_id>/<project_vrs_id>/<runtime_configuration_id>` instead.
>
>For example:
>
>- <https://server/indicium/api/sf/_sf/insights/1.00/(default)/>
>- <https://server/indicium/api/sf/_sf/insights/1.00/my_config/>

## Standard operations

Indicium offers several standard operations which can be performed on every application.

The first standard operation is **$metadata**. By putting $metadata behind the base-URL of an application, the metadata
document for that application can be retrieved. This metadata document contains an extensive description of all entities
and operations available for that user in that application. It can be used to validate whether a user's permissions in
IAM have been configured properly and as a guideline for writing your own Indicium client.

The second standard operation is **$warmup**. By putting $warmup behind the base-URL of an application, it is possible
to 'warm up' Indicium by preloading the application model for the permission set corresponding to the authenticated
user. Aside from that, this operation is also suitable to check the authentication of a user, since the operation does
not return any content. If the authentication is successful, a `204 No Content status` will be returned. If the
authentication is unsuccessful, a `401 Forbidden` status will be returned.

## Performing CRUD-operations, functions and procedures

Aside from the standard operations, the Indicium API offers the ability to perform CRUD-operations on entities and to
execute functions and procedures on the database.

| API action          | HTTP Verb | Example request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Selecting an entity | `GET`     | Request URL to retrieve all records from the project entity: <https://server/indicium/iam/appl/project> <br><br>Request URL to retrieve a specific record from the project entity given that it only has one numerical primary key column: <https://server/indicium/iam/appl/project(123)> <br><br>Request URL to retrieve a specific record from the sub_project entity which has a primary key of project_id and sub_project_id: <https://server/indicium/iam/appl/project(project_id=123,subproject_id=321)> <br><br>Request URL to retrieve the first 100 records from the project entity where the project_id is greater than 100, ordered by the project ID in ascending order: [https://server/indicium/iam/appl/project?$top=100&$select=project_id, description&$filter=project_id gt 100&$orderby=project_id asc](https://server/indicium/api/appl/project?$top=100&$select=project_id,%20description&$filter=project_id%20gt%20100&$orderby=project_id%20asc) |
| Inserting an entity | `POST`    | Request URL to insert a new record into the project entity: <https://server/indicium/iam/appl/project> <br><br>Request body assuming that project_id is not an identity: <br>`{"project_id": 123, "description": "a new project", "deadline": "2017-01-01T12:00:00.000"}` <br><br>Only one record can be inserted per request. All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Updating an entity  | `PATCH`   | Request URL to update the description of an existing record of the project entity: <https://server/indicium/iam/appl/project(123)>  <br><br>Request body:  <br>`{"description": "a changed project"}` <br><br>Records can only be updated by specifying their entire primary key between the parentheses. All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Deleting an entity  | `DELETE`  | To delete an existing record of the project entity: <https://server/indicium/iam/appl/project(123)> <br><br>Records can only be deleted by specifying their entire primary key between the parentheses. All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Calling a function  | `GET`     | Request URL to call the function my_function with parameters project_id and description: [https://server/indicium/iam/appl/my_function\(project_id=123,description='my project'\)](https://server/indicium/iam/appl/my_function%28project_id=123,description='my%20project'%29)<br><br>All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Calling a procedure | `POST`    | Request URL to call the procedure my_procedure with parameters project_id and description: <https://server/indicium/iam/appl/my_procedure> <br><br>Request body: <br>`{"project_id": 123, "description": "my project"}`<br><br> All query string parameters will be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

> It is important to apply URL encoding (also known as Percent-encoding) to all value literals in the request URL. Value
> literals can only occur between the parentheses `( )` after the name of an entity and in the value of the `$filter`
> query string parameter.

## Supported OData operations

Indicium supports the following OData operations and query string options in the URL:

- $metadata
- $top
- $skip
- $select
- $filter
- $orderby
- $expand
- $apply

Indicium supports filtering on and ordering by the display value of a lookup as well. This can be achieved by specifying
`reference_id/display_column_id` in the request URL, rather than simply the ID of the column. For example:
<http://server/indicium/iam/123/table?$filter=contains(reference_id/display_column_id,'value')>

In addition to the standard OData operations, Indicium also supports a custom **$prefilter** operation which can be used
to add prefilters to requests in order to select records from entities. For example:
<http://server/indicium/iam/123/table?$prefilter=prefilter_1,prefilter_2>

### Expand

The **$expand** feature allows you to select any properties from the entity on the other side of the navigation
property. The navigation properties for lookups will always lead to the entity which contains the display property of
the lookup, which is not necessarily the same entity as the source_tab of the corresponding lookup reference. This is
also why the navigation properties for lookups have been renamed. Using the reference ID's is misleading, because they
imply that the source_tab is on the other end of the navigation property.

Examples:

- <http://server/indicium/api/123/sub_project?$expand=transl_project_id>  
  To select all columns from *sub_project* and *project*.
- <http://server/indicium/api/123/sub_project?$select=project_id&$expand=transl_project_id($select=description)>  
  To select *project_id* from *sub_project* and *description* from *project*.

> When using **$expand**, you can use all of the supported operations such as **$select**, **$filter**, **$orderby**,
> **$prefilter** on the target entity, but for now only $select is supported on the source entity in the $expand clause.

The response of an **$expand** request will look like this:

```javascript
{
   "value":
   [
      {
         "project_id":15,
         "sub_project_id":25,
         "name":"Board of supervisors",
         "hourly_rate":135.00,
         "planned_start_date":"2006-08-18T00:00:00Z",
         "planned_end_date":"2007-08-19T00:00:00Z",
         "hours_budgeted":337.00,
         "actual_start_date":"2009-11-18T00:00:00Z",
         "finished":1,
         "finished_on_date":"2009-09-24T00:00:00Z",
         "finished_text":1,
         "hours_booked":806.25,
         "sub_project_name":"Board of supervisors",
         "start_date_and_end_date":"2006-08-18 | 2007-08-19",
         "transl_project_id":
         {
            "description":"Hydraulics"
         }
      }
   ]
}
```

### Apply with Groupby

You can also use the **$apply=groupby** clause to select lookup values, but this method should typically only be used
when selecting properties that are part of the lookup reference or the display property, otherwise you're better off
using **$expand**. All columns specified in the **$apply=groupby** clause will in fact be added to a `GROUP BY` clause
in the resulting SQL statement.

Example:<br>
* <http://server/indicium/api/123/sub_project?$apply=groupby(project_id,transl_project_id/description)> <br>To select
  _project_id_ from _sub_project_ and _description_ from _project_ and group the result by both values.

The response of an **$apply=groupby** request will look the same as the response of an $expand request, depending on the
properties you select or group by:

```javascript
{
   "value":
   [
      {
         "project_id":15,
         "transl_project_id":
         {
            "description":"Hydraulics"
         }
      }
   ]
}
```

It's also possible to apply an aggregate function to the display property, when a key can result in multiple display
values or if you want to provide an alias to the display value.

Example:

[http://server/indicium/api/123/sub_project?$apply=groupby((project_id),aggregate(transl_project_id/description with min as display_field)]()

## Extended Api

In addition to the standard OData Api Indicium offers several extended operations.

Query Parameter | Description
---|---
$deselect |  A comma separated list of column id’s which are not requested, this can help reduce the response size when for example binary data is stored in columns. i.e. _$deselect=column_one, column_two_ 
$prefilter | Can be used to add prefilters to requests in order to select records from entities