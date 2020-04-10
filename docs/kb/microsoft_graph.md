---
title: Microsoft Graph authentication
---

This page decribes the required steps to connect to Microsoft Graph webservices (Azure, Office 365).
More information can be found here: <https://docs.microsoft.com/en-us/graph/>.

This example uses _Application permissions_ to get access to the API without a user credentials. Please follow the instructions [here](https://docs.microsoft.com/en-us/graph/auth-v2-service) to configure the app registration required to retrieve an authorization token.

Once you have setup your app registration in the Azure portal, you can create a process flow to authenticate and call the required services.

In this example we will be using the following process flow, which is started by the execution of a task, authenticates to get an authorization token, calls a Graph web service using that token, and shows the response of that call.

![](assets/kb/graph_process_flow.png)
_Example process flow_

The process flow uses two process variables, `token` and `response`, both of type *nvarchar(max)*.

## Authenticate

The authentication process action retrieves an authorization token required to access the web service.

### Input

| Input parameter | Assignment     | Value                                                                                                                                                    |
| --------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URL             | Constant value | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token`                                                                                           |
| HTTP method     | Constant value | `POST`                                                                                                                                                   |
| Content-Type    | Constant value | `application/x-www-form-urlencoded`                                                                                                                      |
| Content         | Constant value | `client_id={client id}`<br>`&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default`<br>`&client_secret={client secret}`<br>`&grant_type=client_credentials` |

The _tenant_, _client id_ and _client secret_ for the registered app can be found in the _Overview_ and _Certificates & secrets_ pages of the Azure portal.

#### Output

| Output parameter | Value   |
| ---------------- | ------- |
| Content          | `token` |

#### Business logic

To extract the authorization token from the response, add the following code to the process procedure of the authentication action:

```sql
    set @header = '[{ "Key": "Authorization", "Value": "Bearer '
        + json_value(@token, '$.access_token')
        + '" }]'
```

### Service call

The next process action calls the required web service, which in this example is a service to list all groups.

#### Input

| Input parameter | Assignment     | Value                                                       |
| --------------- | -------------- | ----------------------------------------------------------- |
| URL             | Constant value | https://graph.microsoft.com/v1.0/groups?$select=displayName |
| HTTP method     | Constant value | `GET`                                                       |
| Headers         | Variable       | `header`                                                    |

#### Output

| Output parameter | Value      |
| ---------------- | ---------- |
| Content          | `response` |

The response of the call is stored in the `response` parameter in JSON format, for example:

```json
 {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#groups(displayName)",
    "@odata.nextLink": "https://graph.microsoft.com/v1.0/groups?$select=displayName&$skiptoken=X%2744...000%27",
    "value": [
        {
            "displayName": "Business Development"
        },
        {
            "displayName": "Marketing"
        },
        {
            "displayName": "Service & Care"
        },
        {
            "displayName": "Product Innovation"
        },
        ...
    ]
}
```
