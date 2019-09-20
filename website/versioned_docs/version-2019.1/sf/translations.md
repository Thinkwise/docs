---
title: Translations
id: version-2019.1-translations
original_id: translations
---

All strings that are used in the user interfaces can be translated, such as labels, buttons, tables and columns.  
The Thinkwise Platform provides default translations for the following languages:

- Dutch
- English
- German
- French
- Spanish
- Portugese

Additional languages can be added from the [Application languages](advanced#application-languages) screen. Thinkwise recommends to use the two- or three-letter [ISO 639](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code, like `en` and `eng`, or the composite IETF language tag, like `en-US`, to identify a language. The Thinkwise Platform provides full support for Unicode characters, which means that any language is supported.

![](assets/sf/application_languages.png)
*Application languages*

> **TIP**  
> To have the translation objects for a new language translated by an external party, use the *Translations* screen to export an existing language to Excel
> and then import the translated text to the new language.

## Translation objects

For every translatable string, a *translation object* is generated for which a translation can be entered in the *Translations* screen or the *Translation* tab page found in many other screens.

Translation objects for new strings are automatically created when generating.
To manually generate translation objects for new objects, execute the *Generate translation objects* ![](assets/sf/image214.png) task.

![](assets/sf/translations.png)
*Translations screen*

An object contains, at most, the following translations, depending on the type of translation object:

- (Single) translation
- Translation form
- Translation grid
- Translation card list
- Plural translation
- Tooltip text, shown when the mouse is moved over a field name, group name, tab or column. It is possible to use HTML to format the text.
- [Help text](help)

Untranslated objects can be translated semi-automatically with the *Translate untranslated objects* task. The task replaces underscores with spaces, removes the square brackets and changes the first letter to a capital letter. It is convenient to generate translations for the language in which the data model was written.

## Link tables

With link tables that are displayed as detail, it is often desirable, depending on the context, to display another translation. This is possible by including the plural translations of both master subjects, separated by a forward slash `/` in the plural translation of the linking table. The GUI will show the part of the translation that is not equal to that of the current master table.

For example, by giving the linked table between *person* and *company* the translation *Persons/Companies*, the table will have the translation *Companies* under *person* and *Persons* under *company*.