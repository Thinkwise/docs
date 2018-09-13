---
title: Developer mode
---

When the end product is started up in developer mode, extra options become available in the developer ribbon. 

![](../assets/sf/image311.png)
*Developer ribbon*

These options are:

- Refresh model (*Ctrl+Alt+F5*) - Reloads the model, so modifications in the end product are immediately visible. (The shortcut might be blocked by certain applications.)
- Debug - Displays events that are performed on the database, such as look-up queries, views, defaults, layouts, etc. and more information about error messages from the database. Filtering on events can be done in the filter at the top left.
- Version check - Checks whether the versions of all the required DLLs are correct, such as database drivers and Crystal Reports.
- Open folder - Opens the GUI folder.
- Location (*Alt+F1*) - Shows information of the focused component.

![](../assets/sf/image312.png)
*Popup that appears if the location is called up in the end product.*

- Translate - switches between the translated and untranslated mode.

- Test console - opens the test console, to run test cases.

- Test case recorder - opens the Test case recorder, to record test cases.

In developer mode, error messages about default-, layouts- and context procedures are displayed in the Windows GUI in the info panel. The GUI also still calls the procedures with the existing parameters, so that the existing functionality continues to work after, for example, adding or removing a field or reference. In end-user mode, they are however, displayed as blocking popups.
