---
title: Control procedure guidelines
sidebar_label: 📖 Control procedures
---

The purpose of the guidelines for control procedures is to provide directions for structure and naming.

### Control procedures

1.	The control procedure id describes the activity of the template(s)
2.	The control procedure id should not be a table, view or task.
    - Examples of a table: default_sales_order, layout_country, trigger_project
3.	Don’t use meta information in the name
    -	Examples of meta information: Default, task, table.

### Templates

1.	The template id describes the activity of the template.
2.	Don’t use meta information in the template id
    - Examples of meta information: Default, task, table.
3.	If a control procedure has one template, the name of the template should be the same as the control procedure.
4.	If a control procedure has more than one template, the name of all templates must be different from the control procedure.
5.	A template should be atomic. This means that the template should contain exactly one functionality.
6.	A template may not depend on another template.
