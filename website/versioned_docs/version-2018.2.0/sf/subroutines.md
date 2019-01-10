---
title: Subroutines
id: version-2018.2.0-subroutines
original_id: subroutines
---

Business logic that is not used directly by the user interfaces but is only called by other business logic or made available via the OData API can be created using *Subroutines*.

Subroutines are used to define business logic that is not used directly by the user interface but is only called by other business logic or, through the OData API, by third party applications. Subroutines can be, for instance, functions, stored procedures or services.

Different types of subroutines are available, depending on the application platform.

|Type|Description|Platform|
|--- |--- |--- |
|CLR procedure|Common Language Runtime|SQL Server|
|DLL assembly|Assembly Library|SQL Server|
|Function|SQL function|SQL|
|Operation|WebService|Java/C#|
|Procedure|SQL stored procedure|SQL|
|Static method|Static method|Java/C#|

Depending on the selected subroutine, the following result values can be specified:

- None

- Scalar - The result is a single value. If you select this, the column *Return scalar domain* is displayed. A domain can be selected that determines the characteristics of the result value.

- Table - The result is a table containing multiple rows. If this option is selected, then in the *Interface result columns* tab, the columns can be named. This will be displayed as the result in the table. These columns also refer to a domain.

The result values are not applicable for every program object.
