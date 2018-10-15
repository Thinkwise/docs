---
title: Username
id: version-2018.2-username
original_id: username
---

When using connection pooling or IAM authentication, the IAM user ID cannot be retrieved on the RDBMS using database functions like `user_name()`, `system_user` or `USER`.

Because the user ID is often used in queries (e.g., to fill trace columns or filter data), the user interfaces and service tiers use platform specific methods to provide the username in the context of every database connection.

The `tsf_user()` function is provided to retrieve the correct username from SQL logic.

> The username is not available in connections made by Crystal Reports or other reporting tools that set up their own connection. You can provide the user ID to the report by using the input parameters. You can fill the correct user ID into the parameter values using default logic.

## SQL Server

The [CONTEXT_INFO](http://technet.microsoft.com/en-us/library/ms180125.aspx) is set for the current session or batch by using the following command:

```sql
declare @binvar varbinary(128);
set @binvar = cast(@username as varbinary(128));
set context_info @binvar;
```

To get the username in SQL, use one of the following statements:

```sql
select dbo.tsf_user();
```

## IBM i DB2

On DB2, the [client user ID](https://www.ibm.com/support/knowledgecenter/en/SSEPGG_11.1.0/com.ibm.swg.im.dbclient.adonet.ref.doc/doc/r0057221.html) is set in the opened connection:

```csharp
connection.SetClientUserID(UserId);
```

To get the username in SQL, use the following statement:

```sql
select tsf_user() from sysibm.sysdummy1;
```

## Oracle

On Oracle, the [ClientId](https://docs.oracle.com/cd/E85694_01/ODPNT/ConnectionClientId.htm) property is set for the connection:

```csharp
connection.ClientId = UserId;
```

To get the username in SQL triggers, functions or stored procedures, use the following statement:

```sql
select tsf_user() from dual;
```