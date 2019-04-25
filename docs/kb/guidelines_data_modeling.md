Guidelines Data Modeling
========================

Data modeling was originally intended as a tool for database design, but has become a fundamental requirements technique for business analysts, as it is relevant for anyone working with data structures, application logic, user interfaces and business processes.

The guidelines in this document aim to ensure that Software Factory developers set up high quality data models. High quality means:
1.	Consistent
2.	Logical
3.	Well structured
4.	Unambiguous

This document has guidelines for the following subjects:
1.	Data modeling
2.	Diagrams in the Software Factory

Data modeling
-------------

The first step in creating data models, is making a distinction between:
1.	Strong entities
2.	Weak entities
3.	Link tables
4.	Inheritance tables

An entity is strong when it’s existence does not depend on the existence of any other entity in a database. For example:
+ sales_order
+ sales_invoice

A weak entity depends on a strong(er) entity for its existence. For example:
+ sales_order_line
+ sales_invoice_line

A link table maps two or more tables together by referencing the primary keys of each data table. In effect, it contains a number of foreign keys, each in a many-to-one relationship from the link table to the individual data tables. The PK of the link table is typically composed of the FK columns themselves. For example:
+ customer_product
    + customer
    + product
+ company_group_company
    + company_group
    + company

Sometimes there are multiple types of entities which have certain attributes or relations in common. Using "sub-type" tables is a simple way to implement table inheritance in SQL Server. For example:
+ Company
    + customer
    + supplier
    + debtor
    + creditor

In the following section Strong and Weak entities form the basis of many of the Guidelines.

### Guidelines Strong Entity
1.	Has 1 primary key column
2.	Does not have foreign key columns in the primary key

### Guidelines Weak Entity
1.	Has more than 1 primary key column
2.	The primary key columns are ordered from strong to weak
3.	The last primary key column is not a foreign key, the other primary key columns are
4.	Has exactly 1 primary column more than his 'parent'
5.	Has the name of its 'parent' plus an addition

### Guidelines Link table
1.	Link tables have all primary key columns from both source tables
2.	All primary columns are also foreign keys
3.	Have the name of one table combined with the name of the other table
    + If another name is more suitable, then this table should probably be a Strong or Weak Entity

### Guidelines Inheritance tables (One to One Relationship (1 : 0..1))
1.	Target table has his own name. This means that his name is not derived from the ‘parent’ entity
2.	The number of primary key columns is equal to the ‘parent’
3.	All primary columns are also foreign keys


### Guidelines Foreign Key Relation
1.	Each foreign column has its own reference
    + So if a table has 5 foreign key columns, there must also be 5 references
    + A column may be part of multiple references
2.	The database check must be enabled for every reference.
    + There are situations where the check is not allowed, for example with a reference to a view. Then the check can be turned off.

### Guidelines Recursive Relation
1.	Last Foreign key column has a new name
    + The column does not have a derived name

### Guidelines all Entities
1.	The name must be self-explanatory
2.	Names singular
3.	Names lowercase
4.	No abbreviations
    + Unless platform limits are exceeded
5.	Divide a name into small words (subnames). Place between the words an underscore.
    + Good
        + sales_order_line
    + Not good
        + salesorder_line
        + salesorderline
6.	No meta information in names

### Guidelines Columns
1.	The name must be self-explanatory
2.	Names lowercase
3.	No meta information in names
4.	Divide a name into small words (subnames). Place between the words an underscore.
5.	No abbreviations
    + Exceptions:
        + no
        + id
6.	With non-key columns no table name in the name

### Guidelines Primary Keys
1.	Name Primary key column is table name + _id
2.	Type of column is preferably an identity with a BIGINT as the data type. Only primary key columns that are not foreign keys may be an identity column. 

### Guidelines Foreign Keys
1.	The referring foreign key column has the same name as the primary key of the parent table. If the corresponding reference has an 'Add', then this must also be added in front of the column name.

### Guidelines Domains
1.	No DTTP in the name
2.	No length in the name
3.	No meta information in names
4.	Primary key columns which are not foreign key columns have the same domain name as the column.

### Guidelines Datatypes
1.	Use DATETIME2, not DATETIME
2.	Use NVARCHAR unless the character set needs to be restricted. Then a VARCHAR can be used.
3.	Identity: use INT or BIGINT
4.	Use NUMERIC for numbers with digits after the decimal point
5.	Don’t use CHAR, FLOAT, NCHAR without a specific reason

### Example

+ Tables
    + sales_order
        + sales_order_id
            + pk, identity
    + sales_order_line
        + sales_order_id
            + pk, fk
        + sales_order_line_id
            + pk, identity
    + sales_order_line_specification
        + sales_order_id
            + pk, fk
        + sales_order_line_id
            + pk, fk
        + sales_order_line_specification_id
            + pk, identity
+ References
    + ref_sales_order_sales_order_line
        + sales_order_id 	= sales_order_id
    + ref_sales_order_sales_order_line_specification 
        + sales_order_id 	= sales_order_id
    + ref_sales_order_line_sales_order_line_specification 
        + sales_order_id 	= sales_order_id
        + sales_order_line_id = sales_order_line_id

Software Factory Diagrams
-------------------------

In this section the Guidelines can help you set up Diagrams and Designs.

### Guidelines Diagrams

1.	Name must describe a process

### Guidelines Design

1.	Foreign key reference
    + Place parent more on the left side, and child entities more to the right.
2.	Inheritance
    + Place parent more to the upper side, child entities more to the bottom.
3.	Strong-Weak entities
    + Place parent more to the upper side, child entities more to the bottom.
