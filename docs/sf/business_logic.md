---
title: Logic concepts
---

Business logic of the application that cannot be modeled can be added using code. This business logic not only comprises traditional [business rules](https://en.wikipedia.org/wiki/Business_rule) but also the logic to control the user interfaces, process flows and messages.

Business functionality can be integrated into various business logic concepts.

![](assets/sf/image266.png)
*Schematic overview of the various business logic concepts*

Explanation of the different concepts:

| Concept       | Function                                                     | Activation                                                   |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Default       | Changes the value of fields during import or modification on the basis of values that are entered into other fields.<br>Moves the position of the cursor on the basis of the entered fields. | Is called automatically:<br>- as soon as the user clicks on Add or executes a Task or Report<br>- in edit mode, as soon as a field that has been modified by the user is exited |
| Layout        | Determines the visibility of fields and whether fields are modifiable and mandatory during import or modification on the basis of values that are entered into other fields.<br>Determines the availability of the data manipulation buttons on the basis of the values in the fields of the current record. | Is called automatically:<br>- if another record is selected<br>- as soon as the user clicks on Add or Modify, or executes a Task or Report<br>- in edit mode, as soon as a field that has been modified by the user is exited |
| Context       | Determines which tasks, reports and detail tabs are available, given the values in the fields of the current record.<br>Determines the active detail tab on the basis of the values in the fields of the current record. | Is called automatically:<br>- if another record is selected<br>- in edit mode, as soon as a field that has been modified by the user is exited |
| Process       | Following a process action, determines which following process actions must be carried out and in which sequence.<br>Can make use and exercise influence on process flow variables. | Is called automatically after an action is executed that is part of a process flow. |
| Trigger/event | Performs controls to possibly reverse transactions, or updates other fields or rows in other tables. | Is called automatically after data in a table is added, modified or deleted. <br>Available for *insert*, *update* and *delete* events, that fire *before*, *after* or *instead of* the event |
| Task          | Standalone (business) functionality.                         | Is explicitly started by the user or by means of scheduling (batch). A task may also be called from any other concept. |
| Badge         | Determining the number that is shown on the badge of a subject, task or report. | Automatically on the predefined interval and after data modification of the subject in question. |
| Other         | Determines the operation of a subroutine.                    | Depends on the type of subroutine. The user interface never makes explicit use of subroutines. Other logic concepts can make use of this. There are no application specifications written for this. They cannot be found in the user interface and do not contribute to specs but support other logic. |

### Default

The following options can be set within a Default:

- The value of each field
- The name of the field where the cursor will be placed

The following context is provided when executing the Default logic:

| Parameter          |                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| default_mode       | Indicates whether it concerns an insert (0) or an update (1).                                                    |
| import_mode        | Indicates what action is performed:<br>- 0 = regular, GUI action<br>- 1 = import row, executed once for the entire row (cursor_from_col_id is empty)<br>- 3 = import, executed for each column (cursor_from_col_id for each column) <br> Import_mode 1 is used when importing with the GUI and import_mode 3 is used for directly calling PUT, POST or PATCH on an entity via Indicium.  |
| cursor_from_col_id | The field that triggered the default to be executed. When performing the add or modify action the value is null. |
| cursor_to_col_id   | The field where the cursor must move to after leaving the default procedure.                                     |
| [col_id]           | All columns in the table, both input and output. Every value can therefore be modified.                          |

This Default template code ensures that the current date is set for the *activated_date* field when the *activated* field has just received the value 1.

```sql
if (@cursor_from_col_id = 'activated' and @activated = 1)
begin
  set @activated_date = getdate();
end
```

The default logic is not limited by settings in terms of visibility and validity, both at a model level and through authorization.

### Layout

A layout can be used to disable fields and operations, depending on the context. The following settings can be made:

- Make fields read only, invisible and hidden
- Make fields mandatory
- Disable or hide add, update, delete, save and cancel button

The following context is provided when executing the layout logic:

| Parameter          |                                                                                                                                              |
|--------------------| -------------------------------------------------------------------------------------------------------------------------------------------- |
| layout_mode        | Indicates whether it concerns an insert (0) or an update (1).                                                                                |
| import_mode        | Indicates what action is performed:<br>- 0 = regular, GUI action<br>- 1 = import row, executed once for the entire row (cursor_from_col_id is empty)<br>- 2 = export<br>- 3 = import, executed for each column (cursor_from_col_id for each column) <br> Import_mode 1 is used when importing with the GUI and import_mode 3 is used for directly calling PUT, POST or PATCH on an entity via Indicium.  |
| add_button_type<br>update_button_type<br>delete_button_type<br>confirm_button_type<br>cancel_button_type  | Indicates how the corresponding button should be displayed:<br>- 0 = enabled<br>- 1 = disabled<br>- 2 = hidden |
| [col_id]           | All columns of a table. These values can be used to make decisions about the behavior.                                                       |
| [col_id]_type      | The type can be modified for each field:<br>- 0 = normal<br>- 1 = read only<br>- 2 = hidden within the form (space remains reserved)<br>- 3 = hidden outside the form |
| [col_id]_mand      | Whether fields are mandatory can be set for each field:<br>- 0 = optional<br>- 1 = mandatory                                                 |

The variables for type and mandatory only need to be set if the value differs from the default value of the meta-level. It is therefore not necessary to reset the value.

In the following layout template code, the *activated_date* field is made mandatory when the user is navigating around the screen and the `activated` field has a value of 1. The *activated_date* field is hidden outside the form when the *activated* field has a value of 0.

```sql
if (@layout_mode = 1 /* update */ and @activated = 1)
begin
  set @activated_date_mand = 1; /* mandatory */
end

if @activated = 0
begin
  set @activated_data_type = 3; /* hidden outside form */
end
```

The layout logic should always be written in such a way that the fields are stateless. For example, when a field is made mandatory by the layout logic, this change only applies until the next call of the layout logic. If the field in the layout logic is subsequently not explicitly set to mandatory again, the status of the field will revert back to the default setting.

> The layout logic does not have the possibility to provide more access than the model and authorization settings allow. For example, when a column in the model is set to hidden, the field cannot be set to read only by means of the layout procedure. A layout can only restrict.

### Context

A context procedure offers the following options:

- Disabling and hiding detail tabs
- Disabling and hiding tasks and reports
- Changing the active tab

The following information is given when executing the context logic:

| Parameter        |                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| active _ref_id   | Displays the name of the active reference tab                                                            |
| [col_id]         | All columns of a table. These values can be used to make decisions about the behavior                    |
| [ref_id]_type    | Indicates whether a reference tab should be displayed<br>- 0 = enabled<br>- 1 = disabled<br>- 2 = hidden |
| [task_id]_type   | Indicates whether a task must be displayed:<br>- 0 = enabled<br>- 1 = disabled<br>- 2 = hidden           |
| [report_id]_type | Indicates whether a report must be displayed:<br>- 0 = enabled<br>- 1 = disabled<br>- 2 = hidden         |

The following template disables the detail tab *inactive_property* when the *activated* field has a value of 1.

```sql
if (@activated = 1)
begin
  set @ref_item_inactive_property_type = 1; /* hidden */
end
```

The Context logic should always be written in such a way that the fields are stateless. For example, when a field is hidden by the Context logic, this change applies until the next call of the Context logic. If the field in the Context logic is subsequently not explicitly set to hidden again, the availability of the field will revert back to the default setting.

> The Context logic does not have the possibility to provide more access than the model and authorization settings allow. For example, when a detail tab in the model is set to hidden, the detail cannot be set to visible by means of the Context logic. The Context logic can only restrict in this instance.

### Badge

Badges can be used to indicate to the user that there are still open tasks or something similar. These are numbers for a table, view, task or report.

The following information is available when executing the badge logic:


| Parameter   |                                                                                                                                                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variant_id  | The variant the badge is executed for. The badge concept is the only variant specific concept. The reason for this is that the badge value is often dependent of the default prefilters, which can deviate per variant. |
| badge_value | The value that is to be displayed by the GUI. Currently, only an integer can be used with a value between 0 and 99.                                                                                                      |
| col_id      | All column values of the table, task or report.                                                                                                                                                                         |

The following template fills the badge value with the number of validation messages or empty when 0.

```sql
select @badge_value = nullif(count(1), 0)
from validation
where project_id = @project_id
  and project_vrs_id = @project_vrs_id
```

This is presented as follows in the end product:

![](assets/sf/image268.png)

### Process

A process procedure offers the possibility to influence the further course of a process flow by means of the following options:

- Changing the sequence of the next immediate steps to be taken.
- Enabling and disabling subsequent steps.

The initial status of the subsequent steps is available in all Process logic. This status is determined by the way in which the executed process action has been completed. When unsuccessful, the subsequent steps for a successful execution are disabled. When successfully completed, the subsequent steps for an unsuccessful execution are disabled. The sequence of the remaining subsequent steps is determined by the settings in the model.

The following information is available when executing the process logic:
| Parameter                     |                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [col_id]                      | All column values of the table, task or report.                                                                       |
| [follow_up_process_action_id] | All follow up process actions.  A value of null, 0 or a negative value means the process action will not be executed. |

Whether or not a process action has been successfully completed is shown by the status of the subsequent steps, which represent both successful and unsuccessful completion.

All process flow variables marked either Process input or Process output can be respectively used or modified in the Process logic.

No further options are present in the context for types other than those specified in this overview. When an action has not been completed successfully, it may be that certain field values have not been filled.

The following template ensures that the next step to *print_report* is not executed when the *order_status* is 1 in the task process action.

```sql
if (@order_status = 1)
begin
  set @print_report = 0
end
```

### Trigger/event

Trigger or Event based logic is performed around the data manipulation. This logic concept is highly platform dependent. This logic concept offers the following possibilities:

- Perform actions as a result of (attempted) changes in data

- Prevent or undo changes in data (control)

In general, the concept can be divided into three types, with three moments per type. The available context is different for each type.

- Instead of / before / after performing a **create** action - The field values of the record(s) to be added or that have been added.

- Instead of / before / after performing an **update** action - The old and new field values of the record(s) to be changed or that have been changed.

- Instead of / before / after performing a **delete** action - The field values of the record(s) to be deleted or that have been deleted.


The following trigger ensures that when deleting an order, a record is written to the log:

```sql
insert into deleted_order_log
select
    d.order_id as order_id,
    getdate()  as deleted_date
from deleted d

```

### Other

In addition to the logic concepts above, there are platform-specific concepts that are often defined on the basis of a subroutine. These logic concepts can be used in other logic components. Consider, for instance, database functions: the context of this logic is generally consistent with the parameters defined for a subroutine.

### View/Snapshot

View and Snapshot logic determines the contents of a view or snapshot respectively. This logic can only be applied in template-based views and snapshots. In the template, the complete query is defined for the data that will be displayed by means of the view or snapshot.

When modeling a view the developer provides the columns which must be available in the view. These columns become available when writing the functionality as parameters. All these parameters must also be used in the code.

Template code for a view could then look as follows:

```sql
select
  h.hour_id,
  h.project_id,
  h.description,
  e.name as employee_name
from hour h
join employee e
  on e.employee_id = h.employee_id
```

### Offline logic

With offline functionality, which is written in JavaScript, it is possible to also apply business rules when a Mobile is offline. This way, the user will have the same user experience as if they are online.

In order to get this functionality available, the base project `JAVASCRIPT` must be added to the project.

To update *volatile* data on mobile clients before it is synchronized to the service tier, extra logic concepts are available for JavaScript logic. These are: *JavaScript Tasks*, *Before Task* event, *After Task* event and *JavaScript Before / After / Delete Triggers*.

By defining subroutines of the *JavaScript Function* type, you can add generic functions to the offline JavaScript.

Offline logic needs to be deployed before it has an effect in Mobile. This is explained in [Creation](creation). The effects of synchronizing offline modifications following an upgrade are described [here](service_tier#synchronize-offline-changes-after-an-upgrade).
