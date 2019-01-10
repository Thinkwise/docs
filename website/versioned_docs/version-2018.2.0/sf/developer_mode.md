---
title: Developer mode
id: version-2018.2.0-developer_mode
original_id: developer_mode
---

When the end product is started in [developer mode](configuration_file#execution-mode), extra options become available in the *Developer* ribbon tab page. 

![1537780143381](assets/sf/1537780143381.png)
*Developer ribbon*

These options are:

- Refresh model (*Ctrl+Alt+F5*) - Reloads the model, so modifications in the end product are immediately visible. (The shortcut might be blocked by certain applications.)

- Debug - Displays events that are performed on the database, such as look-up queries, views, defaults, layouts, etc. and more information about error messages from the database. Filtering on events can be done in the filter at the top left.

- Version check - Checks whether the versions of all the required DLLs are correct, such as database drivers and Crystal Reports.

- Open folder - Opens the GUI folder.

- Location (*Alt+F1*) - Shows detailed information of the current screen and the focused component.

  ![](assets/sf/image312.png)
  *Location popup*

- Translate - Switches between translated and untranslated mode.
- Test console - Opens the test console, to run test cases.
- Test case recorder - Opens the Test case recorder, to record test cases.

## Error messages

In developer mode, error messages about defaults, layouts and contexts are displayed in the Windows GUI in the info panel. The GUI also executes the logic so that the existing functionality continues to work after, for example, adding or removing a field or reference. 

In end-user mode however, any error messages are displayed as popups, and the user action is blocked to prevent business logic being bypassed.