---
title: Validation
---

Thinkwise provides a comprehensive set of validations with the Software factory. Validations are carried out on the model to check for errors. These errors are pre-defined and specified in a base project. Consider, for instance, a requirement that a primary key always has to be at the top in a table and that each table has to have a standard sort sequence. It is also possible to create your own company or product-specific validations.

![validations](assets/sf/validations.png)
*Validation screen*

Every screen in the Software Factory has a *Validations* tab page where the validations that are specific for modeler can be executed. The *Validation* screen allows you to perform a full validation of your application before deployment.

## Execute validations

Validations may be conducted at various levels by means of the following tasks:

- Execute all validations
- Execute validation group - Executes all validations of the selected validation group.
- Execute selected validation - Executes the selected validation.
- Approve validation message - Approve a validation message so it will be hidden from the list of messages. By default, error messages cannot be approved, whereas warning or information messages can be approved. When creating your own validations it is possible to deviate from this behaviour, by setting the checkbox ‘Allow approve’.
- Temporarily approve validation message - Approve the validation message (similar to the *Approve validation message* task) until either the project version is copied to a new project version or (when working in a branch) until the branch is merged back to the trunk.
- Undo approval - Removes approval from a previously approved validation message.

### Status

After execution, an icon indicates the status of each validation:

|           Pictogram            | Status      | Description                       |
| :----------------------------: | :---------- | --------------------------------- |
| ![](assets/sf/image256.png)    | OK          | No problems found                 |
| ![](assets/sf/image257.png)    | Information | Informational, no action required |
| ![](assets/sf/image258.png)    | Warning     | Possible problem                  |
| ![](assets/sf/image259.png)    | Error       | Problem must be resolved          |
| ![](assets/sf/image260.png)    | Unknown     | Validation not executed           |

### Filters

Prefilters are provided to filter the validation messages:

- Hide approved messages - Hides approved messages, default on.
- Info, warning and error - Only shows messages at the *information* level and higher.
- Warning and error - Only shows messages at the *warning* level and higher.
- Error - Only shows *error* messages.
- New in this version - Only shows messages that are new in this project version. For this filter to work, the previous project version must be validated.
- Assigned to me - Only shows messages assigned to the current user.
- Unassigned - Only shows messages that are not assigned to anyone.

### Assign to developer

To assist in resolving validation messages, it is possible to assign messages to specific developers. Filters are available to show own or unassigned validation messages.

![assign_validation](assets/sf/assign_validation.png)

## Validation assignments

The *Assignments* tab page shows an overview of the validation messages that are assigned to a developer.

![validation_assignments](assets/sf/validation_assignments.png)
*Validation assignments*
