---
title: Username
---

When using connection pooling or IAM authentication, the IAM user ID cannot be retrieved on the RDBMS using database functions like `user_name()`, `system_user` or `USER`.

Because the user ID is often used in queries (e.g., to fill trace columns or filter data), the user interfaces and service tiers use platform specific methods to provide the username in the context of every database connection.

The `tsf_user()` function is provided to retrieve the correct username from SQL logic.

> The `tsf_user()` does not return the correct user ID when called by Crystal Reports reports. You can provide the user ID to the report by using an input parameters. Make sure to always set the user ID in the default so that the value can not be tampered with when using Indicium.

## SQL Server

For SQL Server database connections, the [CONTEXT_INFO](http://technet.microsoft.com/en-us/library/ms180125.aspx) is set by the user interface or the Indicium application tier for the current session or batch using the following command:

```sql
declare @binvar varbinary(128);
set @binvar = cast(@username as varbinary(128));
set context_info @binvar;
```

To get the username in SQL, use the `tsf_user()` function:

```sql
select dbo.tsf_user();
```

## IBM i DB2

For DB2 database connections, the [client user ID](https://www.ibm.com/support/knowledgecenter/en/SSEPGG_11.1.0/com.ibm.swg.im.dbclient.adonet.ref.doc/doc/r0057221.html) is set in the connection string, using the `ClientUserID` parameter.

To get the username in SQL, use the following statement:

```sql
select tsf_user() from sysibm.sysdummy1;
```

## Oracle

For Oracle database connections, the [ClientId](https://docs.oracle.com/cd/E85694_01/ODPNT/ConnectionClientId.htm) property is set for the connection after the connection is opened.

To get the username in SQL, use the following statement:

```sql
select tsf_user() from dual;
```