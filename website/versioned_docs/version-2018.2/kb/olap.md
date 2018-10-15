---
title: OLAP cubes
id: version-2018.2-olap
original_id: olap
---

This page explains the differences between OLAP cubes and traditional cubes in the context of the Thinkwise applications.

## What is an OLAP cube?

OLAP stands for Online Analytical Processing and is a method for obtaining multi-dimensional data which can be sliced and diced to obtain limited amounts of data or to view it from a different viewpoint. In the context of the Thinkwise Software Factory and the GUI applications, the difference is where the computations are being processed and how the data is handled. Traditionally, the cubes were based on real-time data, and the computations were processed at the client level (Windows .NET GUI application or ASP.NET web server). In the case of OLAP cubes, the computations will be processed at the database level and may be based on cached data rather than real-time data (depending on the settings of the cube) to gain an increase in performance.

## Configuring an OLAP cube

### Configuring the connection to an OLAP cube

![File:OLAP cube conn config.png](../assets/sf/688px-OLAP_cube_conn_config.png)
*OLAP cube connection configuration*

If you want to point a cube in the Software Factory to an OLAP cube instead of a view, then tick the checkbox for *Use OLAP connection*. Three new fields will appear for the *OLAP server name*, the *OLAP database name* and the *OLAP cube name*. The first field should point to the SQL Server instance on which Microsoft Analysis Services is running. The value of the second field should be the name of your OLAP database. In the Business Intelligence Development Studio, this is the name of your Analysis Services Project. The value of the third field should be the name of your OLAP cube within your project. The image on the right provides an example of an OLAP connection configuration.

### Configuring cube fields for OLAP cubes

![img](../assets/sf/OLAP_cube_config.png)
*Example - OLAP cube field configuration*

Traditionally, cubes are pointed to views on the relational database system. Therefore, all fields which are defined for the cube will map to columns of one and the same view. In the context of the Thinkwise Software Factory, this is the main point where OLAP cubes differ from traditional cubes. An OLAP cube is not pointed to a view but rather to each table from which you want to retrieve data. For this reason, it is important to understand that the cube fields which you are defining in the Software Factory can map to a column of any table in the definition of your OLAP cube.

When defining a dimension field, your cube field ID must look like this: *Table Name.Column ID*. When defining a measurement field, your cube field ID must look like this: *Column ID* . The image above provides a more detailed example.

> Please note that the table names and column IDs do not refer to the tables and columns of the database but those of the cube definition.

### Configuration requirements for OLAP cubes in the Thinkwise Software Factory

- All of the tables in the database which are used by an OLAP cube must also be described in the Thinkwise Software Factory.
- If you want to have an OLAP cube as a detail screen of a certain table, then it is recommended to create a dummy table for the cube. The dummy table should contain every primary key column of every table which is used by the cube. After doing this, you can create references between the tables which are used in the cube and this dummy table.
- Every primary key column of the cube's source tables (*read: every column of the dummy table mentioned above*) must also have a corresponding cube field in the cube definition. Moreover, for these cube fields, the *Table id* must point to the dummy table and the *Column id* must point to the corresponding column in the dummy table. For all other cube fields, the table ID and column ID are technically irrelevant, which is why these columns need not be included in the dummy table.

## Known technical requirements and limitations

When using OLAP cubes, a few requirements and limitations apply to the developer as well as the client machine on which the GUI application will run. An exhaustive, though possibly somewhat technical, list of requirements and limitations can be found here: <http://documentation.devexpress.com/#WindowsForms/CustomDocument11776>.

### Requirements

- The Microsoft Analysis Services OLE DB Provider must be installed on the client machine in order to communicate with OLAP cubes.

### Limitations

- Only cubes made with Microsoft Analysis Services are supported by the GUI applications.
- At this moment, only the OLE DB Data Provider is supported to retrieve data from the cube.
- Calculated fields are not supported. When defined, the GUI applications will ignore them.
- Group intervals are not supported. When defined, the GUI applications will ignore them.