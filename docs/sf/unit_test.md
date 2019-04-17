---
title: Unit Test
---

Unit tests can be written for the following logic concepts: defaults, layouts, contexts and badges. The following image shows the unit test screen. This is the place to create, maintain and execute unit tests.

![](assets/sf/unit_test_overview.png)

The list on the left side shows all the objects for which unit tests can be written. Badges are used to show the amount of existing unit tests. After selecting the correct object and logic type a unit test can be created. A title and description can be filled even as if the unit test should succeed or not with the checkbox *Should abort*. After saving, parameters can be added. A distinction has been made between input and output parameters because the output parameters will be checked after the unit test has been executed. In addition, the expected messages can be specified. These will also be checked after performing a unit test.

![](assets/sf/unit_test_functionality.png)

Unit tests can also be created, maintained or executed from the Functionality modeler. The list is filled with all the unit tests that are directly connected with the program objects on the result page. For example, when a default procedure is created for *Employee* to combine the first and last name to display name, the written unit test that validates the email address is also shown in the list. Also, all unit tests are shown that have the selected control procedure linked as primarily.

![](assets/sf/unit_test_execute.png)

After a product upgrade from the creation screen all unit tests can be executed again as a regression test. This to ensure that further changes have not broken any units that were already tested. By selecting one or multiple rows the unit tests can be executed.