---
title: Control procedure guidelines
sidebar_label: 📖 Control procedures
id: version-2019.1-guidelines_control_procs
original_id: guidelines_control_procs
---

These guidelines provide directions for naming and structuring control procedures and templates.

### Control procedures

1. The *control procedure id* describes the purpose of its templates.
1. The *control procedure id* should not only contain the name of a table, view or task.  
   - Examples: `default_sales_order`, `layout_country`, `trigger_project`
1. The *control procedure id* should not contain any meta information, like the code group name or abbreviation.  
   - Examples: `default`, `task`, `table`.

### Templates

1. The *template id* describes the purpose of the template.
2. The *template id* should not contain any meta information.
3. If a control procedure has only one template, the *template id* should be the same as the *control procedure id*.
4. If a control procedure has more than one template, the *template id* of all templates should be different from the *control procedure id*.
5. A template should be atomic, meaning that it should contain exactly one piece of functionality.
6. A template may not depend on another template.
