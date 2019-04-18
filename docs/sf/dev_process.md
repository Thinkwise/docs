---
title: Development process
---

The process of development with the Thinkwise Software Factory consists of the following phases, which are explained in more detail in the following pages:

- [Projects](overview.html) - creating a project or project version
- [Specification](process_analysis) - drawing up requirements and modeling the business process
- [Data](data_model.html) - modeling the [domains](domains.html), [data model](data_model.html) and [data conversion](data_conversion.html)
- [User interface](menus.html) - setting up the user interface of the application
- [Processes](tasks.html) - features to support the processes of your business
- [Business logic](functionality.html) - creating the required functionality
- [Quality](code_review.html) - [review](code_review.html), [test](test_cases.html) and [validate](validation.html) the model and business logic
- [Access Control](roles) - configuring roles and assigning permissions
- [Deployment](creation.html) - putting the end product into production

The menu within the Software Factory is built up in the same manner and therefore corresponds with the structure of the manual.

One characteristic of developing an application with the Thinkwise Software Factory is that after completing the modeling phase, a working prototype of the application can already be demonstrated. This is due to the phased structure of the development process and because no lines of code need to be written for the prototype. The stakeholders can therefore already see a working end product at an early stage, and they acquire a good idea about where the product is going.

The prototype serves as the basis for further development and adding functionality and documentation.

Help functionality that supports the developer with the development of a project is available within the Software Factory via the F1 key. All topics of the Software Factory are described within this functionality. As default, the help functionality opens with the component that is selected at that time.

## Projects

Application development in the Software Factory is done on a project basis, with every project containing one or more project versions.

The *Projects* menu contains information about all available projects, versions and branches.

The *Overview* screen contains all projects that have been produced in the Software Factory. New projects are also created here. Along with the basic information about the project, the versions and branches of the projects can also be created and viewed here. *Full model* gives access to the complete model of a specific project version. With *Merging*, conflicts between branches can be analyzed and resolved before a branch is merged. The *Difference analysis* provides an overview of all the differences between two project versions.

![](assets/sf/image9.png)
*Project overview screen*

## Specification

The business processes and requirements are specified during the analysis phase, using the *Process analysis* screen.

The requirements are used to continuously monitor the scope of the project. The *Design specifications* provide a to-do list for the modeling phase. The Software Factory automatically maintains the traceability between the requirements and the model. It is therefore strongly recommended to specify the requirements within the Software Factory, even though this is not compulsory.

![](assets/sf/image10.png)
*Process analysis - Requirements*

![](assets/sf/image11.png)
*Process analysis - BPMN diagram*

## Data

The following components are specified during the data modeling phase:

- Domains
- Data model
- Data conversion (for new versions)
- Dynamic model (expert mode)

These components form the basis for the database without it being necessary to program them.

![](assets/sf/image12.png)
*Data model design*

## User interface

During this phase the user interface of the application is modeled. A demo can be given to the business to demonstrate at an early stage what the end product will look like and how it will work.

## Processes

In this phase, process flows are added to guide the users through the applications' processes. Tasks can be created to automate user actions and custom designed reports can be added to generate, print and email documents.

![process_flow](assets/sf/process_flow.png)
*Process flow diagram*

## Business logic

This phase of the project consists of defining the business logic. Business logic that can't be modelled is created using source code templates. These templates are woven into the logic concepts in the end product based on the model definitions.

![](assets/sf/image14.png)
*Business logic code template*

## Quality

### Review

The programmed templates can be reviewed by a co-developer to ensure a high quality.

![code review](assets/sf/code_review.png)
*Code review*

### Test cases

The programmed templates can be tested automatically with test cases that are stored in the Software Factory. A test case can be created in three ways:

- Recorded via the GUI
- Input via the Software Factory
- Automatically derived from the existing model

A test case is coupled to the templates that are then used for testing. Checks are included in a test case to examine whether the templates work correctly. A test case can subsequently be executed automatically and the test results stored in the Software Factory.

Test cases only need entering once and can subsequently be executed automatically with every new project version. This guarantees that existing functionality continues to work despite any additions and/or modifications.

![](assets/sf/image15.png)
*Overview of the Test cases screen with a number of test suites*

### Validation

The project can be validated completely or per component with the Validator. The Software Factory is delivered with hundreds of standard validations, however, company specific validations can also be added. Executing the validations automatically guarantees the quality of the models.

![](assets/sf/image13.png)
*Validations executed for one of the modelers*

## Access Control

Permissions are managed in the Thinkwise Platform using Role Based Access Control.
Roles can be created and configured in the Software Factory and assigned to user groups in the Intelligent Application Manager.

![](assets/sf/assign_rights.png)
*Assigning permissions to roles*

## Deployment

The end product is taken into use during this phase. This phase has a special place within the entire project. Where logically the creation phase would be the last phase, since the end product is taken into production during this phase, this does not have to be the last phase with the Software Factory. An application can already be created after modeling and validating the data model.

![](assets/sf/image17.png)
*Generating source code during the code generation*