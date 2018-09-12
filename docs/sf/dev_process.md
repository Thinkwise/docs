---
title: Development process
---

As was already indicated in the foreword this handbook will guide the developer in setting up an end product for which the various chapters describe the different components of the project. The process of development with the Thinkwise Software Factory consists of the following phases, which are explained in more detail in the following pages:

- Administration; creating a project or project version. (Chapter 5)

- Analysis; drawing up requirements and modelling the business process. (Chapter 6)

- Modelling and Validation; modelling and validating the model. (Chapter 6)

- Development and Testing; the programming and testing of logic. (Chapter 8)

- Documentation; drawing up help documentation. (Chapter 9)

- Creation; putting the end product into production. (Chapter 10)

The menu within the Software Factory is built up in the same manner and therefore corresponds with the structure of the manual.

The last chapters include other information about the Software Factory that, by definition, is not necessary for the development of an end product. To create an optimal end product Thinkwise recommends reading these chapters prior to starting development with the Software Factory.

One characteristic of developing an application with the Thinkwise Software Factory is that after completing the modelling phase a working prototype of the application can already be demonstrated. This is due to the phased structure of the development process and because no lines of code need to be written for the prototype. The stakeholders can therefore already see a working end product at an early stage and they acquire a good idea about where the product is going.

The prototype serves as the basis for further development and adding functionality and documentation.

Help functionality that supports the developer with the development of a project is available within the Software Factory via the F1 key. All topics of the Software Factory are described within this functionality. As default, the help functionality opens with the component that is selected at that time.

## Projects

The Projects menu contains information about all available projects, versions and branches.

The *Overview* screen contains all projects that have been produced in the Software Factory. New projects are also created here. Along with the basic information about the project, the versions and branches of the projects can also be viewed here. *Full model* gives access to the complete model of a specific project version. With *Merging* branches can be created, conflicts between branches analyzed and resolved and it is possible to remerge broken branches. The last component within administration is the component on *Difference analysis*. This displays the differences between different project versions.

![](../assets/sf/image9.png)

Figure 2: An overview of the *Projects* screen

## Specification

The business processes and requirements are specified during the analysis phase. This describes exactly which requirements and wishes are placed on the system. The business processes indicate in a diagram which processes need to be produced in the project. The requirements can be seen as a contract with the business, with which the scope of the project can be continuously monitored. In addition, the requirements provide a to-do list for the modelling phase and the Software Factory automatically maintains the traceability between the requirements and the model. It is therefore strongly recommended to specify the requirements within the Software Factory, even though this is not compulsory. The business processes and requirements can be linked to each other, so that both change with each other when something changes in either one of them.

![](../assets/sf/image10.png)

Figure 3: Overview of the *Requirements* tab

![](../assets/sf/image11.png)

Figure 4: Overview of a business process

## Modelling 

The following components are specified during the modelling phase:

- Data model

- User interface

- Process flows

- Dynamic model (expert mode)

These components form the basis for the end product without it being necessary to program them. Only the model has to be completed. This takes place on the basis of the requirements as drawn up in the previous phase. On the basis of the completed model a demo can be given to the business to demonstrate at an early stage what the end product will look like and how it will work. A bridge is built between the business and IT with the help of this demo.

![](../assets/sf/image12.png)

Figure 5: A completed diagram in the *Data model* tab

### Validation

The project can be validated completely or per component with the Validator. The Software Factory is delivered with hundreds of standard validations, however company specific validations can also be added. Executing the validations automatically guarantees the quality of the models.

![](../assets/sf/image13.png)

Figure 6: Validations executed for one of the modellers

## Development

This phase of the project consists of writing source code templates with business rules. These templates are woven into the correct position in the end product on the basis of definitions from the model.

![](../assets/sf/image14.png)

Figure 7: An overview of a completed template on the 'Functionality' screen.

## Testing

The programmed templates can be tested automatically with test cases that are stored in the Software Factory. A test case can be created in three ways:

- Recorded via the GUI

- Input via the Software Factory

- Automatically derived from the existing model

A test case is coupled to the templates that are then used for testing. Checks are included in a test case to examine whether the templates work correctly. A test case can subsequently be executed automatically and the test results stored in the Software Factory.

Test cases only need entering once and can subsequently be executed automatically with every new project version. This guarantees that existing functionality continues to work despite any additions and modifications.

![](../assets/sf/image15.png)

Figure 8: Overview of the 'Test case' screen with a number of test suites

## Documentation

The *help* screen appears by pressing F1. Help information about the tab or about the current field can be found here. The help function is not just available during development, but can also be made available in the end product with standard and company specific help texts.

A help text can be entered with the translation for each component.

![](../assets/sf/image16.png)

Figure 9: A screen shot of the help document that is opened with the F1 function key

## Creation

The end product is taken into use during this phase. This phase has a special place within the entire project. Where logically the creation phase would be the last phase, since the end product is taken into production during this phase, this does not have to be the last phase with the Software Factory. An application can already be created after modelling and validating the data model.

![](../assets/sf/image17.png)

Figure 10: 'Generating source code' during the code generation