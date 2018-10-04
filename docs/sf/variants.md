---
title: Variants
---

It is possible to display the same table in different ways in the Software Factory by creating a *variant*. This offers for example the possibility to set up different prefilters for a specific menu item without having to create a view.

> Along with a menu item called *Orders* in which all active orders are displayed with a grid and form, a menu item can be added based on the variant *Historical orders*. This contains only a grid with other enabled prefilters. A task-based screen can be set up quickly in this way without having to first create a view.

It is also possible to optimize a variant for a specific platform, for example, by displaying fewer columns in the Mobile GUI than in the Windows GUI.

All GUI settings may be overwritten in a variant. Consider screen types, sorting, list views and form views. When a variant is created, it will, as a standard, use all the default data. Settings will only become visible when modified manually. When the settings are modified in the default, the variant also changes with the default, provided this variant has not been modified manually.

There are two options for modification:

- At set level
  - Applies to Grid, Form, Details, Sorting, Filtering and Searching.
  - As default, these options are hidden and the default is followed. Only when they are turned on with a task, will they be applicable as a set. A *snapshot* is taken, as it were. The entire set remains as it is, even if the default changes.
  - New fields will be applied automatically as little as possible in the default. For example, a new field will be automatically hidden in the form if there is a form snapshot. The same applies for a detail if there is a detail snapshot.
- At field level
  - Applies to all other settings, such as screen type.
  - If a setting is modified, this setting remains valid, even if the default changes. However, non-modified settings will change.

> The variant Outstanding orders has been set so that only order number, customer and date are in the grid. If the field "total quantity" is added to the order table, it will not be added to the outstanding order variant.
>
> The new prefilter *large customers* will, however, be added to the variant because no snapshots are made of prefilters.

The rights for variants are always equal to or more limited than in the standard. A hidden field cannot be made visible again, but a regular field can however be hidden. This applies to add/modify/delete, whether field are mandatory and visible, and locked prefilters. Modifications to the default (for instance: add is switched off) are also applied in all the variants.

Variants can be applied to menu items, details, look-ups, table tasks, table reports and in process flows.

The applicable variant will be used in the process flows. When for instance the action *Go to tab* is used, the variant that belongs to this tab is used. However, there are a few exceptions where an extra variant can be specified:

- In the process action types: *Open Document*, *Execute Task* and *Run Report* you must indicate which screen should be opened or on which screen a task or report should be performed. You can specify which variant should be used.
- For actions to start process flows you can specify for which variants the start action applies. For example, should the process flow *Enter order* also start when opening the *Orders* table, with the *Historical orders* variant?