---
title: Test cases
---

The integrated test automation tooling in the Thinkwise Software Factory allows you to test the coded business logic in, for example, templates, view definitions, prefilters and expression fields. 

Thinkwise's agile, model-driven development method in combination with the abstract user interfaces makes testing Software Factory applications with traditional Point & Click test tooling inefficient and laborious. Because the test cases are integrated in the model and executed by the run-time layer, they will continue to work correctly after modifications in both the data model and the GUI model. The Software Factory also provides automatic test case generation based on the model.

Automated testing is not intended for automating acceptance tests. Acceptance tests are intended to obtain commitment from the users; this cannot be achieved without allowing the user themselves to operate the application. Any findings from acceptance tests, if possible, should of course be processed into the test cases.

## Test approach

Test cases are drawn up by the developer using the requirements and/or design specifications. This is an iterative process; each time that functionality is added or modified, test cases need to be drawn up and if errors are found the test cases need to be extended or amended.

There are two test approaches possible:

- Draw up test cases prior to development of the business logic (Test Driven Development). This forces the developer to very carefully consider the desired functionality before they start programming.

- Draw up test cases after programming, preferably by a different person than the one who wrote the code. Possible borderline cases or error situations can be identified on the basis of the code.

Pay attention that when drawing up test cases it is not only the happy flow that is tested but also the exceptions and borderline cases. For any findings, the test cases need to be extended or amended to guarantee that this error does not return through modifications to (other) functionality.

## Test data

The use of a *dedicated* test database presents all kinds of problems with, for example, time dependent data, upgrades and the development in several branches. It is also not viable to add all the required data for the tests by means of test cases/steps.

The assumption is therefore that it has to be possible to use every production database as a test database. Static (master) data already exists in that case. Additional data needs to be created during the testing, possibly in separate test cases (with “Query” test steps).

It is also advised to delete or restore added or modified data, making it possible to rerun test cases on the same database. 

If use is made of business parameters that effect the functionality of the application, the choice can be made to test against several databases or to set up (and re-set) the parameters by means of test steps.

## Creating test cases

Test cases are linked to control procedures, for which it is possible to link several test cases to the same control procedure, for example to test the unhappy flow or to test with other business parameters. Furthermore, separate test cases can also be made for the preparation or cleaning of data.

By grouping test cases in a test suite for each process or module, it can quickly be made transparent whether a process/module works correctly and whether a process is completely covered by test cases. Furthermore, in this way, use can be made in test cases of data that was created in previous test cases within the process. 

### Record test cases

![](assets/sf/image293.png)

Test cases can be easily created by recording the tests in the end product. The recording of user actions is done in the end product in the developer mode. The *Test case recorder* button can be found in the *Developer* tab of the ribbon. 

Recording can be started and stopped by pressing the *REC* button. A recording always starts with opening a screen, task or report from the menu. Various steps can subsequently be performed on this object. These steps are recorded and stored in the recorder. Manual checks can subsequently be added. This is done by selecting a test step and pressing the *Add* button.

When the test is complete, it can be saved to model in the Software Factory.

### Manually create test cases

You can also manually create test cases using the Software Factory development environment. Open the *Test modeler* screen to get started.

Add a test case by pressing the *Add* button in the *Test cases* tab and enter a test case ID describing the purpose of the test case.  

Next, select the table, task or report you want to perform the test on. This entity is the starting point for the test case. When running the test case, the user interface will automatically open the table, report, task or custom screen, even if no further test steps have been added. 

The default active checkmark can be enabled if it is required that the test case is enabled by default in the test console.

![](assets/sf/image294.png)
*Creating a test case*

#### Test steps

A number of test steps can be carried out for each test case. Test steps represent user actions in the user interface.

When selecting an action, a number of fields that are required for this action will become available. If the input values are optional and are left empty, the user interface will enter an empty value.

![](assets/sf/image295.png)
*Adding test steps*

A § (paragraph) separated input value can be entered for the user action *Go to row*. The paragraph sign serves as a separator to specify a composite primary key. For example: `10§2`

All entered queries are executed scalar. This means that the query only returns the value of the first cell of the first row. In queries, you can make use of square brackets [...] containing the ID of the column. In this way, the value of the column in the active row can be included in the query, for example:

```sql
select count(*)
from project
where customer_id = [customer_id]
```

#### Test step checks

When a test step is performed, it is possible to carry out checks in the user interface. These checks can be used to verify whether the handwritten functionality has had the desired effect on the data or workflow of the application.

The checks can be divided into two categories: availability checks and value checks. With availability checks, certain components within the user interface become visible and accessible to the user. Examples are the properties of columns (normal, read only, hidden, optional and mandatory), tabs, reports, tasks, and the buttons in the form and ribbon.

With value checks, you can check whether columns have the expected values. This can be checked with static values but also with SQL queries.

For the control type Message, the expected type of message can be specified as the control value. The message type can be specified by selecting one of the following values:

- 0 - Error

- 1 - Warning

- 2 - Info

- 3 - Question

### Generate test cases

Apart from recording and manually creating test cases, test cases can also be generated automatically. By adding the DEFAULT_TESTCASES base project to your project, a number of test cases are generated as default, including:

- Add and cancel rows - In each table with defaults or layouts, add and cancel is pressed. The defaults and layouts are executed and superficial errors are immediately identified.

- Details - Runs through all the detail tabs in the user interface so that all the context procedures are executed.

- Reports - Opens and closes all the reports, which checks if all the reports are available.

- Tables - Opens and closes all tables, which executes all the layouts. It can, for example, be checked whether all the views are working.

- Tasks - Opens and closes all the tasks, which checks if all the tasks are available.

- Toggle prefilters - Enables and disables all prefilters, making it possible to check whether the custom prefilters are working correctly.

## Running test cases

Just as with recording, the end product should be started in developer mode. The *Test console* is available in the *Developer* tab. The test console contains the test cases that have been created in the Software Factory. In the left section, it is possible to select the test suites and/or test cases that have to be executed.

The GUI tries to execute test cases as fast as possible. However, this can no longer be followed by eye. It is therefore possible to follow the waiting times between the steps via the test console settings. In this way, the tester can monitor the progress of the test. Additionally, you can indicate which messages should be captured. The test results are fed back by default to the Software Factory. This can be disabled manually.

![](assets/sf/image296.png)
*Overview of test cases with the underlying test steps*

### Results

In the Software Factory, the results of the execution of one or more test cases can be analyzed under test runs. The status is shown for each component so that you can quickly identify where the test cases have failed.

Furthermore, the test coverage analysis and the test run analysis can be used to gain more insight into the testing. For example, it is possible to analyze which test cases have been executed, the duration of the runs and what the results of the test cases were.

![](assets/sf/image299.png)
*Overview of the test run results*



