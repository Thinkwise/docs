---
title: Data sensitivity
id: version-2018.2-data_sensitivity
original_id: data_sensitivity
---

With the introduction of Europe's *General Data Protection Regulation*, it is more important than ever for companies to ensure that their IT environment is secure and meets the legal requirements for privacy protection. Personal data is thus anonymized in the Thinkwise application in order to help comply with this new legislation. This feature can not only be used for personal data but also for other sensitive data, like passwords or credit card numbers.

Using the *Data sensitivity* screen, it is possible to set the sensitivity for each data column of the application. View-columns, calculated fields and identity fields are not data columns and are therefore not shown. A prefilter is provided to suggest which columns are sensitive, based on keywords or because columns with the same name or domain are also marked sensitive.

![https://office.thinkwisesoftware.com/blog/wp-content/uploads/2018/05/Data_sensitive_screen3.png](assets/sf/image97.png)

*Data sensitivity*

For sensitive columns, it is mandatory to select an anonymization type. There are 3 options:

- Sample data set

- Random value

- Expression

Foreign key columns are automatically anonymized based on the settings of the source column. They can be recognized by the icon as shown below and are hidden by the “undecided columns” prefilter.

![https://office.thinkwisesoftware.com/blog/wp-content/uploads/2018/05/ak_icon.png](assets/sf/image98.png)

*Foreign key columns*

#### Sample data set

There are default sample data sets available that can be used to anonymize the data. Upon anonymization, a random value from the set will be picked, taking into account the domain of the column.

#### Random value

When this option is used to anonymize the data, a random value is generated that meets the domain specifications. This is not user-friendly, and is thus not recommended to use this for acceptance test data. Note that when a random date is selected, this date can be *in the future* or *in the past*. If there are business rules that ensure a date in the past is used, it is better to select “Expression” and write your own query or use “Sample data set” and add a set with random dates in the past.

#### Expression

In certain cases, a value depends on the value of other columns or has to meet specific requirements. In that case, the option “Expression” can be used. For instance, if *end_date* is mandatory when *is_ended* is true, then a random *end_date* can be generated with the following query:

```sql
case
  when t1.is_ended = 1 then dateadd(day, abs(checksum(newid()) % 65530), 0)
  else null
end
```

When the expression is dependent on a column that needs to be anonymized first, use the checkbox *Delay expression*. For example, if an email address is based on a username:

```sql
t1.user_id + "@thinkwisesoftware.com"
```

![](assets/sf/image101.png)

*Delayed expression*

#### Production

>  To comply with the legislation, Thinkwise uses techniques where it is not possible to restore the original data. Therefore, the task must never be used on a production environment. There is no rollback once the task has started.

To prevent mistakes, there are two checks:

1.  Database name check - the database name that is provided as a parameter has to match the current database.

2.  Single user mode - the database needs to be in single user mode.

#### Anonymization

Based on the data sensitivity settings, the Software Factory will generate two stored procedures:

1.  Stored procedure *tsf_test_data_anonymization* to test the data sensitivity settings and sample data

    ```sql
    -- Use this statement to test the data sensitivity settings
    exec tsf_test_data_anonymization 'database_name'
    go
    ```

2.  Stored procedure *tsf_anonymize_data* to actually anonymize the data

    ```sql
    -- Use this statement to anonymize the data
    exec tsf_anonymize_data 'database_name'
    go
    ```

