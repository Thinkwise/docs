---
title: Validation
---

Validations are carried out on the model to check for errors. These errors are pre-defined and specified in a base project. Consider, for instance, a requirement that a primary key must always be at the top in a table and that each table must have a standard sort sequence. Thinkwise delivers a comprehensive set of validations with the Software factory, but these can be supplemented by company-specific validations.

As indicated for the data model in chapter 7.1, every modeller has a *Validations* tab. The validations can be carried out here for this specific modeller. The total validation takes place before the source code is generated.

![](../assets/sf/image96.png)

Figure 199: Overview of the 'Validation' tab with executed validations

Validations may be conducted at various levels by means of the following tasks:

  - > Perform all validations: performs all relevant validations;

  - > Perform validation group (not for modellers): performs all validations from the selected validation group;

  - > Perform selected validation: performs the selected validation;

  - > Approve validation message (only for validation messages at the *information* or *warning* level): with this a validation can be approved; this validation message will then be removed from the list of messages;

  - > Undo approval (only for approved validations): remove approval.

An icon indicates whether situations have occurred during the validation that may be undesirable. The validation comprises five statuses:

|Pictogram|Status|Description|
|--- |--- |--- |
|![](../assets/sf/image256.png)|OK|Validation is correct.|
|![](../assets/sf/image257.png)|Information|Developer's information.|
|![](../assets/sf/image258.png)|Warning|Control recommended.|
|![](../assets/sf/image259.png)|Error|Problem must be resolved.|
|![](../assets/sf/image260.png)|Unknown|Item must still be validated.|


Table 6: Validation icons with status and description.

If the validation has a different status than OK, the corresponding validation messages can be viewed and resolved.

It is possible to filter on a status using the following prefilters.

  - Hide approved messages: hides approved validation messages;

  - Information: only displays messages at the "information" level and higher (therefore hides validations without messages, green check mark);

  - Warning: only reports messages at the *warning* level and higher;

  - Error: only reports messages of *error* level and higher.

  - New in this version: with this filter only validations are displayed that did not exist in the previous project version (and are therefore caused in this project version). For this filter to work the previous project version must be validated.

**Tip**

When producing a new version, make sure that there are no more messages when the *New in this version* prefilter is on.

Finally, validation messages can be approved. This applies to warnings and informational messages, for which it is acceptable that the situation continues to exist. This is done with the task *Approve Validation Message…* ![](../assets/sf/image261.png). A reason for the approval should also be given.

The approved messages can be displayed within the validation overview by disabling the *Hide approved validation messages* prefilter. The approved messages will then be displayed in grey.
