---
title: Performance
---

The runtime components of the Thinkwise Platform are highly optimized to provide the best user experience possible.

In addition there are a number of recommendations regarding configuration and business logic to further optimize the performance and resource usage of your application. These recommendations are listed below.

## Configuration

### Database indexes

A database index is used to speed up the performance of queries, by reducing the number of reads necessary to retrieve data from a table. Indexes can be created using one or more columns of a database table, to efficiently access random or ordered records.

The Thinkwise Platform automatically creates indexes for foreign keys and sort sequences, but sometimes additional indexes are required for specific queries. Indexes itself can have a negative impact on writing data to a table, so don't add too many.

Most database management systems provide analysis tools that recommend indexes based on the actual database usage. These indexes can be created in the [Datamodel](data_model#indexes) screen.

### Calculated fields

There are various ways of adding calculated fields in an application. Consider the following possibilities:

- Physically stored in the database, calculated with *default* or *trigger* logic
- Physically stored in the database, calculated in a *snapshot* (Materialized Query Table or Materialized View)
- Physically stored in the database, calculated by a task or subroutine
- Calculated during selection with the help of a view
- Calculated during selection with the help of a calculated database-column (SQL Server)
- Calculated during selection with the help of an expression

These options have different characteristics in terms of maintainability, timeliness, reusability, performance and storage:

| Option                                                       | Maintainability                                              | Topicality                                                   | Reusability                                                  | Performance                                                  | Storage                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Physically stored in the database, calculated with *default* logic | Only the default logic determines the calculation.           | The data that is displayed is from the moment that the row was added and therefore historical. | It is not easy to use default logic in, for example, triggers or tasks. The calculation will only be easily applied when the user adds or modifies a record in the table from the GUI. When the calculation depends on other subjects (order total for the order, based on order lines) then this option is not applicable. | The calculation is only carried out when adding or modifying a record. Selecting the calculated data does not cost any additional computing power. The calculated result can be indexed. | Minimum effect.                                              |
| Physically stored in the database, calculated with *trigger* logic | Only the trigger logic determines the calculation. This must possibly be woven on several subjects and/or in insert, update and delete triggers. Default logic is possibly necessary to obtain a clear view of the result of the calculation, during the addition or modification of data. | The data that is displayed is from the moment that the row was added and therefore historical. | Trigger logic is automatically applied by the RDBMS, no further action is necessary. | The trigger will play a role with every update. It is important that the code is so written that it only performs (significant) calculations when this is necessary, when data is modified that impacts the result of the calculation. Selecting the calculated data does not cost any additional computing power. The calculated result can be indexed. | Minimum effect.                                              |
| Physically stored in the database, calculated in a *snapshot* | The snapshot usually contains data from other entities. The snapshot also need to be checked when there are modifications in the other entities. Any triggers for the propagation of modifications or tasks for refreshing the snapshot need to be developed. Default logic is possibly necessary to obtain a clear view of the result of the calculation, also during the addition or modification of data. | There is a great deal of control about the timeliness of the data. The choice can be made to refresh the snapshot periodically, in which case the data lags behind until the moment it is refreshed. When this becomes too outdated, the option can be taken to update the data with triggers at the moment that something changes in the parameters of the calculation. | The snapshot is reusable in the back-end logic.              | Depending on the settings, the calculating power is necessary during the refresh moments of the snapshot. With an snapshot it is possible to greatly influence the timing of the calculation. Selecting the calculated data does not cost any additional computing power. The calculated result can be indexed. | An snapshot can take up a great deal of space in the database. This naturally depends on the volume. |
| Physically stored in the database, calculated by a task or subroutine | Comparable with an snapshot, with as addition a task for refreshing, as a replacement for the snapshot code. | Comparable with an snapshot.                                 | The table is reusable in the back-end logic.                 | Comparable with an snapshot.                                 | Comparable with an snapshot.                                 |
| Calculated during selection with the help of a view          | A view mainly contains data from other entities. The view also needs to be checked when there are modifications in the other entities. Any instead-of-triggers for the propagation of modifications need to be developed. Default logic is possibly necessary to obtain a clear view of the result of the calculation, also during the addition or modification of data. | The calculation is executed at the time of the request. The data is therefore always up to date and can differ from the moment at which data was first entered. | The view is reusable in the back-end logic.                  | The calculation is executed at the time of selection. Depending on the situation this can require a lot of computing power and time. A view with complex calculations that is frequently consulted is less suitable because of this.<br>Views that make use of other views are advised against.<br>Views that are accessed with a filter on columns that are a result of a function are strongly advised against, because the function must be calculated for all rows to be able to filter the view. | No physical storage.                                         |
| Calculated during selection with the help of a calculated database-column | A calculated column may only make use of the row in question. Sub-queries are not allowed. A calculated column cannot be applied with a view. A calculated column can be deployed, in contrast to a trigger, to make use of non-deterministic data at the time of the selection, such as the current date to determine someone's age.<br>Maintainability: A calculated column is part of the data model and requires an upgrade of the database when the calculation is modified. Default logic is possibly necessary to obtain a clear view of the result of the calculation, also during the addition or modification of data. | The calculation is executed at the time of the request. The data is therefore always up to date and can differ from the moment at which data was first entered. | The calculated column is reusable in backend logic.          | The calculation is executed at the time of selection. When the result of the calculation almost never changes, but is often selected, it is worth considering the use of a trigger. | No physical storage.                                         |
| Calculated during selection with the help of an expression   | An expression can be used, in contrast to a trigger, to make use of non-deterministic data at the time of the selection, such as the current date to determine someone's age. Furthermore an expression can be applied to display additional data for a subject without affecting the database.<br>Maintainability: The expression is automatically executed by the GUI both during selection as well as when adding or modifying a record. No additional Default-logic is necessary. | Comparable with a calculated column.                         | The expression is not usable in the back-end logic and in other applications (for example, reports) | The calculation is executed at the time of selection and during modification. When selecting several rows, in contrast to a calculated column function, this is calculated for each set. When the result of the calculation almost never changes, but is often selected, it is worth considering the use of a trigger. | No physical storage.                                         |

### Prefilters

By enabling prefilters by default, the amount of data to be read from the database and to be displayed on screen can be limited. For instance, only display the open orders of the last year or the employees who are currently employed.

### Start empty with filter

With this option a subject is opened without data and the filter popup is automatically activated. This is intended for screens with a lot of data, for which, for example, the number of rows cannot be reduced to a smaller set via a prefilter, such as with customers or articles. In such a screen the user will often first filter so that it is not necessary that the application first retrieves all the data.

The screen starts much faster with this option because no data needs to be retrieved from the database. Furthermore, the server is not overloaded.

### Combo boxes

A lookup field for which the displayed value is looked up in another table. The use of combo boxes for lookup fields is strongly advised against when the lookup table contains many records. This is because the combo box must load the entire dataset to give the user a choice between the items. This worsens the performance and also uses a great deal of the workstation's memory.

The Software Factory provides the *Suggestion* and *Autocompletion* controls to easily lookup records in large lookup datasets.

### Presentation fields

The presentation field of a table is the regular or calculated field that is displayed if the table is used as a lookup table. For example the field *Description* of a table with an auto-increment primary key. The presentation field is queries for every row in a grid. In certain situations it might be more efficient to use a semantic key instead.

### Number of columns in a grid

Because the grid will display a large number of records, every additional field means more data processing. It is an option to limit the number of fields in the grid. Apart from this it is possible to filter and search on fields that are not displayed in the grid.

Limiting the number of fields in the form has hardly any effect on performance.

### File links and icons

File links and icons can have a negative impact on performance, mainly if the file or the server cannot be found.

### Cubes

Cubes (pivot-tables and charts) are created at runtime, based on the results of the underlying query, for which aggregation takes place to the dimensions. The performance of a cube can be optimized by:

- Limiting the number of dimensions and measurements. Use two smaller cubes instead of one big cube.

- Running the cube against a limited dataset, for example by:
  - Displaying as detail of a main subject.
  - Making use of a prefilter.
- If dimensions are dependent on each other then they must also be defined as such. Single dimensions provide many more theoretical possibilities and thereby the system has to aggregate far more. This takes more time to construct the cube.
  - The dimension *Month* can be linked to *Year*.

  - The dimension *Town* can be linked to *Country*.

## Business Logic

### Functions and case statements

When functions or case statements are used in the *where* clause of a SQL query, the SQL engine must process all records one by one to be able to execute the function. Therefore it is recommended to only use functions in the *where* clause on small sets, and always disable sorting and filtering on calculated fields in the application's model.

### Cursors

A cursor, by definition, ensures processing for each row. If the desired functionality can be written for sets, then this is definitely preferable as it provides a much better performance.

The use of cursors cannot always be avoided, but it also applies here that it is important that the dataset on which the cursor is placed is as small as possible.

### Row and set triggers

Some RDBMSs offer the choice between ROW and SET triggers. A ROW trigger is often easier to write for a programmer, certainly when he or she does not have much experience with a set approach. A ROW trigger may certainly be applied when one or more records are updated at the same time in the table with one SQL statement, such as via the Thinkwise user interface.

However, with tables for which thousands of records can be affected by one SQL statement (for instance from a trigger on another table) it is recommended to include the functionality in the SET trigger.

### Update triggers

It is possible to only fire triggers when certain fields are updated. To enable this, check the *Update trigger on columns* option for the table and the *Trigger for modifying* field for every column that should fire the trigger when changed.

### ORDER BY in views

A view is a logical table that can be accessed via a query. The desired sort sequence can be provided in this query. Sorting within a view is thereby superfluous and leads to poor performance and a high load on the server.

### Views over views

It must be attempted to avoid the use of views within the query of a view. Most RDBMSs have trouble optimizing this situation. This results in poor performance. In this case it is better to write a separate view that only makes use of tables.

### DB2 for IBM i

The performance of ODBC connections and SQL on DB2 for IBM i can be improved with the following settings:

1. Prestarted Jobs - Creating connections (jobs) takes a relatively long time on an IBM i. By using *Prestarted jobs* these connections are prepared in advance. Set up the System i so that enough prestarted jobs are always available. See: <http://pic.dhe.ibm.com/infocenter/iseries/v7r1m0/index.jsp?topic=%2Fddp%2Frbal1usepsj.htm>
2. Separate sub-system - Query plans remain applicable as long as the environment variables (load, disk space, free memory) remain stable. It therefore makes sense to place the QZDASOINIT tasks in a separate sub-system, on the basis of, for example, an IP address. See: <http://pic.dhe.ibm.com/infocenter/iseries/v7r1m0/index.jsp?topic=%2Fddp%2Frbal1usepsj.htm>
3. Plan cache - Increase the plan cache with the QQQOOOCACH command so that query plans remain available sufficiently long in the cache. See <http://pic.dhe.ibm.com/infocenter/iseries/v7r1m0/index.jsp?topic=%2Fddp%2Frbal1usepsj.htm>
