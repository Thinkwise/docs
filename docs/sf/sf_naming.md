---
title: Naming
---

Clear and consistent naming is of great importance during programming. This is particularly true here because functionality can be created on the basis of nomenclature within the Software Factory. The nomenclature is therefore monitored within the Software Factory.

Every name of for instance a table, column or reference is built up from sub-names.

**Example**

The *sales order* object is written in the Software Factory as *sales\_order* and consists of the sub-names *sales* and *order*.

It is agreed within the project that *commission* is always used and never *fee*; *fee* is therefore a rejected sub-name. The plural *orders* is also a rejected sub-name, since the singular *order* always needs to be used.

It is recommended to only use approved sub-names, and explicitly approve new sub-names. Non-approved sub-names are then highlighted during the validation. A new sub-name can, for instance, also arise as a result of a typing error. In this case it can be checked where the sub-name is used under the ´Object names´ tab. The names of the objects in which the sub-name is used, can then be corrected.

Instructions that must be observed within the Software Factory to come to an accurate data model:

- Names of tables must always be defined in the singular.
  - Defining tables in plural and columns in the singular leads to a needlessly larger set of sub-names and translation objects.

- All id-columns need to be written in small letters (except for project\_id, for instance *PROJECT\_PORTAL*).

- Composite words always need to be written separately with an underscore character between them. Do not use spaces in the names.

- Do not use an "s" connection but also here write the words separately with an underscore. (NOTE\! This only applies to projects which are developed using names in Dutch.)

- Repeat the table name in an id and description column of a table. Not in the other columns. This is very important because the name of a primary key field is transferred as standard to the foreign key. This avoids a table having several foreign key columns with the name *id*, which of course is not possible because a column name must be unique within a table.

Sub-names are maintained outside the context of the project to enable different projects and/or versions to make use of the same source. For example because there are several projects in the company that have to be developed on the basis of the same nomenclature.