---
title: Universal GUI User Manual
sidebar_label: Universal
---

[//]: # "Screenshots: 1255 x 667"

The purpose of this user manual is to assist the user in learning how to work
with a software application developed with the Thinkwise Platform.
This guide takes the reader step by step through all parts of the
program so that they can become familiar with all the possibilities.

This manual only deals with the standard Thinkwise capabilities of the Universal GUI, such as the
maintenance of data. Specific calculations and controls fall outside the context
of this document. The screenshots that serve as examples are taken from a
standard Thinkwise application. The basic Thinkwise functionality works exactly
the same in all applications.

The examples of the screen prints are based on the 'Insights' application
that is included as standard with the Thinkwise Platform.

## Logging in

After opening the Thinkwise web application in your browser, the login screen is displayed. 
Enter your username and password and press `LOGIN` to open the application.

![](assets/universal/login.png)
*The Login Screen*

## Main screen

When the program starts a screen similar to the one shown in the following
example is displayed.

![](assets/universal/main.png)
*The main screen*

This screen consists of three parts:

1. The header
2. The menu
3. The work screen

### Header

The header contains the menu button on the left, to show or hide the menu. Next to the menu button, the title of the currently active document is displayed with underneath it information about the selected record, if any. 

On the right of the header, the username is shown. By clicking on the username, the settings menu is opened, showing options to change your preferences, show the about screen or log out of the application.

![](assets/universal/header.png)
*The header*

#### User preferences

The *User preferences* screen currently only contains the option to switch between a light and dark theme.

![](assets/universal/dark_theme.png)
*Switching to the dark theme*

#### About

The *About* screen shows information about the current version of the Universal user interface and the Thinkwise Platform.

![](assets/universal/about.png)
*About screen*

### Menu

The menu of an application can be displayed as a classic menu, with groups and items, or as a tiles menu.

#### Classic menu

The classic menu contains menu groups and items that you have access to. Clicking on a menu-item will open the corresponding screen.
Numbers displayed next to a menu-item, called *badges*, and indicate that the user's attention is required for that subject.

![](assets/universal/classic_menu.png)
*Classic menu*

All open screens are shown in the `OPEN DOCUMENTS` section, where you can switch back and forth between screens. An open document can be closed by clicking the `x` next to the name. A dot `•` instead of an `x` indicates that the document contains unsaved changes and it cannot be closed at the moment.

By clicking the menu button in the header bar, you can collapse the menu to increase the available space for any open documents. By hovering over the menu it will temporarily expand over the work screen. On smaller devices, like smartphone, the menu will ways be hidden and only opens after clicking the menu button.

![](assets/universal/collapsed_menu.png)
*Collapsed menu*

#### Tiles menu

The tiles menu displays all menu items using tiles, divided into one or more groups. 

![](assets/universal/tiles_menu.png)
*Tiles menu*

The tiles menu always covers the entire screen and automatically hides after clicking a menu item. Click on the tiles menu button in the header to return to the tiles menu.

![](assets/universal/tiles_menu_button.png)
*Tiles menu button*

#### Applications

On the top left of the menu, the logo and name of the currently selected application are displayed.
If you have access to more than one application, it is possible to switch to another application by clicking the application name.

![](assets/universal/application_menu.png)
*Switching to another application*

### Work screen

After clicking a menu-item, a work screen is opened displaying the relevant information for that subject. A work screen can have many different layouts and can contain different components.

![](assets/universal/work_screen.png)
*Example of a work screen*

TODO: responsive

## Screen components

The components that can be displayed in a screen are described in the following sections.

### Tab pages

Tab pages are used to navigate between different sections within a screen. Tab pages can contain one or more components displaying information of the screen's main subject (like a *List* of projects or a *Form* showing the selected project), and components for related information, like the *Subprojects* or *Planning* for the selected project. These tab pages are called *detail tab pages*.

![](assets/universal/tab_pages.png)
*Component and detail tab pages*

If there are more tab pages than there is space availabe, it is possible to scroll the tab page bar to the left or right using touch or clicking the scroll icons. 

![](assets/universal/tab_pages_scroll.png)
*Scrollable tab pages*

### Search and filter bar

The search and filter bar can be used to search the subject's data using a custom search term or to toggle predefined filters, called *prefilters*. Enabled prefilters are displayed using a line underneath the button.

![](assets/universal/filter_bar.png)
*Search and filter bar*

If there is not enough space available to display the search box or all prefilters, click on the search button or the overflow menu to access the search box or (additional) prefilters.

![](assets/universal/filter_bar_collapsed.png)
*Collapsed search and filter bar*

### Action bar

Depending on the permitted actions for the current user, the action bar contains buttons to add, copy, edit and delete rows, to refresh the data and, when applicable, to execute tasks, like *Generate invoices* or preview printable documents, called *reports*.

![](assets/universal/action_bar.png)
*Action bar containing a task button and a report button*

When clicking on the add, copy or edit button, the user interface will automatically navigate to a suitable component, such as the Form, even if it is located on another tab page.

Depending on the space available for the action bar, tasks and reports are shown as buttons with an icon and text, icons only, or in the overflow menu.

![](assets/universal/action_bar_collapsed.png)
*Collapsed action bar*

### Cardlist

The cardlist is used to show a limited set of columns for multiple of rows of the current subject. The rows shown are limited by any search conditions or active prefilters.
If the cardlist is located in a detail tab page then only the rows that belong to the selected parent row are shown.

The overflow menu on each card provides access to clickable content on the card, like an email address, photo, website or phone number.

![](assets/universal/cardlist.png)
*Cardlist with an opened overflow menu to download the employee's photo*

### Grid

The grid shows multiple columns for a selection of rows of the current subject, possibly limited by a search condition or prefilter.

If not all columns fit within the available space, a vertical scroll bar is shown to scroll to scroll to the other columns. A vertical line indicates which column positions are fixed. These columns will always stay within view. The current sort order is displayed using one or more arrow icons next to the relevant column names.

If the grid is located in a detail tab page then only the rows that belong to the selected parent row are shown.

![](assets/universal/grid.png)
*Grid with one fixed column, sorted on the Customer name*

### Form

The form component shows the content of a single row, currently selected in the cardlist of grid component. Using the form, it is possible to edit existing rows or add new rows to the current subject.  

![](assets/universal/form.png)
*Editing a row in a form*

If there are more fields than can fit in the available space, the form can be scrolled vertically to access the other fields.

When editing a row, different controls are used to 

#### Text

#### Number

#### Date

#### Checkbox

#### Suggestion

#### Combo

#### Image

#### File

#### Email

#### Website

#### Phone number

#### Address

#### Lookups

### Detail tiles

### Charts

## Logging out

In the action bar of the *main menu* it is
possible to close the application by clicking on the *Log out* icon ![](assets/mobile/image13.png).

## Installing the application on your desktop or mobile phone

Installing an application
