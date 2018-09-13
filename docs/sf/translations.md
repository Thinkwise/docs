---
title: Translations
---

![](../assets/sf/image213.png)

*'Translations' tab in the 'User interface'*

For all terms that appear in the user interfaces, such as labels, buttons, tables and columns, so-called *translation objects* are generated for which a translation can be entered via the *Translations* screen. After expansion of the model, any new translation objects can be created with the task *Generate translation objects* ![](../assets/sf/image214.png).

A translation can be specified for each per translation object for each application language. Since each component in the Software Factory can be translated it is possible to translate at different points. For example, the components occurring in a table, can already be translated in the table, so that it remains transparent.

By default, the Software Factory has two application languages, Dutch and English. Additional languages can be added in the basic data. The user interface can therefore be provided in any language or dialect. Furthermore, Unicode is fully supported, which means that languages such as Polish, Frisian or Chinese are all possible.

**Note:** When an additional language is added, all the GUI objects must also be translated along with the own objects.

An object contains at most the following translations, depending on the type of translation object:

- Translation form

- Translation list

- Single translation

- Multiple translation (only for tables)

- Tooltip text (If the mouse is moved over a field name, group name, tab or column, tooltips are displayed that provide more information about the field in question. It is possible to use HTML to format the text.)

- Help text

Untranslated objects can be translated semi-automatically with the *Translate untranslated objects* task . The task replaces underscores with spaces, removes the square brackets and changes the first letter to a capital letter. It is convenient to generate translations for the language in which the data model was written.

The plural of the translation in the tables must then be modified manually, for instance through the editable grid of the export / import function.

*Link tables*

With link tables that are displayed as detail it is often desirable, depending on the context, to display another translation. This is possible by including the plural translations of both master subjects, separated by a forward slash (*/*), in the plural translation of the linking table. The GUI will then ensure, that the translation is displayed that is not equal to that of the current master.

**Example **

By giving the linked table between *person* and *company* the translation *Persons/Companies* the table will have the translation *Companies* under *person* and under *company* the translation *Persons*.
