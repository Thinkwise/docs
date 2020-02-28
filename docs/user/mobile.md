---
title: Mobile GUI User Manual
sidebar_label: Mobile
---

The purpose of this user manual is to assist the user in learning how to work
with a software application developed with the Thinkwise Platform.
This guide takes the reader step by step through all parts of the
program so that they can become familiar with all the possibilities.

This manual only deals with the standard Thinkwise capabilities such as the
maintenance of data. Specific calculations and controls fall outside the context
of this document. The screenshots that serve as examples are taken from a
standard Thinkwise application. The basic Thinkwise functionality works exactly
the same in all applications.

The examples of the screen prints are based on the 'Insights' application
that is included as standard with the Thinkwise Platform.

## Logging in

The app can be opened from the list with apps. It is necessary to log in to be
able to use the app. Enter the user name and password and hit 'Login'. When the
login details are correct, the contents of the app are displayed.

![](assets/mobile/image6.png)

### Logging in using TOTP

To protect the data it may be necessary to log in by using an extra
authenitication called TOTP. If this is the case it needs to be set up on the
Mobile GUI by using the following steps.

While setting up TOTP in the Mobile GUI, you will be shown the following screen.

![](assets/mobile/image9.png)
*Setting up TOTP on the mobile GUI*

Copy the text code from the Mobile GUI in the authenticator app to connect the
authenticator with the application. This makes sure that this authenticator will
be recognized in the future, when logging in on the Mobile or Web GUI. It is
possible to use any TOTP app from the Apple or Google store.

![](assets/mobile/image10.png)
*Example of an authenticator app "Google authenticator"*

The TOTP app will generate a 6 digit key. This key needs to be entered in the
Mobile GUI.

![](assets/mobile/image11.png)
*Entering the 6 digit key*

Now the connection is completed. In the future when logging into the Mobile or
Web GUI the GUI will ask for a 6 digit key. This key can be generated with the
authenticator app you connected to the GUI in the previous steps.

## Main screen

When the program starts, a screen similar to the one shown in the following
example is displayed.

![](assets/mobile/image12.png)
*Main screen*

Each screen consists of three parts.

### The title

At the top of the screen the topic is shown to indicate where the user is
within the application

### The work screen

This is the screen where the data is displayed that is accessible via the main
menu.

### The action bar

This is shown at the bottom of the screen and displays the buttons for working
with the app. It is therefore possible to edit, refresh and delete data via
the action bar.

### Navigation bar

The navigation bar opens after the program is started. It is possible to
navigate to different parts of the program using the navigation bar. This is
presented as a quick launch toolbar or a tiles menu. In addition, the various
applications can be navigated to using the application menu; this is always
situated above the navigation bar.

#### Quick launch toolbar

The quick launch toolbar can be used to start the various parts of the program
such as a work screen, a task and a report. These components are grouped
logically.

![](assets/mobile/image14.png)
*Quick launch toolbar with collapsed quick launch toolbar groups*

By clicking open a quick launch toolbar group, the components of that group that
can be started will be displayed.

![](assets/mobile/image15.png)
*Quick launch toolbar for the expanded quick launch toolbar group 'Sales'*

#### Tiles menu

Besides the quick launch toolbar, navigation is also possible with a tiles menu.
The tiles menu has groups and items. When logged in, the user will see the
tilegroups as tiles. When a tilegroup has just one item, the item will be shown
as tile instead of the group. Tilegroups have a list icon at the top left to
distinguish them, as can be seen in the screenshot underneath.

![](assets/mobile/image16.png)
*Tilegroups*

When the user has clicked a tilegroup, the items within this group will be
shown. Just like the quick launch toolbar, various parts of the program can be
started by clicking a tile item.

![](assets/mobile/image17.png)
*Tile items*

## Screen components

The Thinkwise application screens are built up from various screen components,
which according to the wishes of the developer can be combined on one type of
screen. The various types are explained in more detail in the following
paragraphs.

A more comprehensive description of the functionality of the most important
components can be found from chapter 5 onwards.

### Grid

The grid contains a summary of the data displayed in a table. These are shown in
rows. You can navigate through the data by clicking on one of the rows.

![](assets/mobile/image18.png)
*Grid view*

### Form

The form contains the data of the currently selected row. Using the form it is
possible to update and delete this row or add a new row.

![](assets/mobile/image19.png)
*Form View*

## Grid features

All functionality in the grid section of the screen are dealt with in this
chapter.

![](assets/mobile/image18.png)
*Grid view*

The grid shows the data of a subject. Since on a mobile device there is not
sufficient room to display all the data; the grid only displays the first set of
data. By clicking on the row all details of this row are displayed in a form.

When the user has the correct authorization rights it is possible to add data
from the screen with the plus (+) button at the top right of the screen, to edit
data with the pen icon on the bottom right in the menu or to delete data by
means of the cross (X) icon on the bottom right, next to the edit icon.

### Opening data

It is possible to request data for a specific record by clicking on a row in the
grid view. The form view will then open.

![](assets/mobile/image19.png)
*Opening the form view*

##### Return to previous screen

It is always possible to return to the previous screen by means of the *return*
button ![](assets/mobile/image20.png). This button therefore makes it possible
to return from the form to the grid, but also from the grid to the start screen.

### Opening underlying data

It may happen that data is available via other data. For example, a
customer could also be linked to contacts, projects or sales invoices. These can
be accessed in the detail menu that can be opened via the *detail menu* button
![](assets/mobile/image21.png). This will then be displayed on the screen as a
popup.

![](assets/mobile/image22.png)
*The detail menu*

### Searching in the grid

It is possible to search for data in the grid view. To do this, click on the
search bar above the grid. The search request can be entered here. A message
will appear on the screen when no data is available.

![](assets/mobile/image18.png)
*Searching in the grid*

### Deleting data

A row is selected when it is pressed on and held down slightly longer than
normal. It is now possible to edit or delete this row with the aforementioned
edit and delete buttons. Deleting a record can also easily be done by keeping
the finger pressed on the data and swiping to the right. The delete button now
appears on the right side of the record. This button will not appear when
deleting records is not allowed by the developer.

![](assets/mobile/image23.png)
*Deleting data from the grid*

## Form features

The form contains the data that is selected from the grid view

![](assets/mobile/image19.png)
*Form View*

### Navigation

##### Adding data

Add data in the form using the *plus button* ![](assets/mobile/image24.png) on the top right of the screen.

##### Editing data

Edit data using the *pen icon* ![](assets/mobile/image25.png) at the bottom right
of the screen.

##### Deleting data

Deleting data in the form is done with the *cross icon* ![](assets/mobile/image26.png) on the bottom right of the
screen. It is possible that data cannot be deleted, for example when other data
depends on it.

##### Navigating through the data

It is possible to return to the grid with the
*return button* ![](assets/mobile/image27.png) in the form bar.

##### Refreshing the data

Refreshing the data that is currently being
displayed is done with the *refresh button* ![](assets/mobile/image28.png) on the bottom left of the screen.

##### Display details

It is possible to open related details using the *menu icon* ![](assets/mobile/image29.png).

##### Enable / disable prefilters

 t is possible that the developer has
predefined a number of filters for each subject. These filters, called
'prefilters', can be enabled and disabled via the *prefilters button* ![](assets/mobile/image30.png). This allows quick
filtering of information. This is discussed in more detail in the following
paragraphs.

### Input fields

Various input fields are used within the app, each of which have their own
function. The input fields can also include various states, these states consist
of:

![](assets/mobile/image31.png)
*Optional input field*

![](assets/mobile/image32.png)
*Required input field*

![](assets/mobile/image33.png)
*Read-only input field*

##### Default input

The default input field can be provided with textual input. The textual input
consists of alphabetical characters, special characters and / or numbers. The
input field is different depending on the type of data that must be entered. A
number input is used for numbers and a date input for dates. The cross icon can
be pressed to empty the input field. These are also explained below.

![](assets/mobile/image31.png)
*Default input*

##### Select data

When a drop down is available, this can be seen by a downwards arrow icon in the
field.

![](assets/mobile/image32.png)  

![](assets/mobile/image34.png)
*Data grid*

##### Date input

If the date is clicked on in the date input field, the date picker will open.
The date picker provides the possibility to select a date. The date picker can
be emptied in one go by pressing the cross icon.

![](assets/mobile/image35.png)  

![](assets/mobile/image36.png)
*Date input*

##### Select data from a lookup

When a lookup is available, this can be seen by right facing arrow icon in the
field. A list will appear on the screen when this field is selected. This will
only happen on a screen with both a list and a form visible.

![](assets/mobile/image37.png)
*Lookup field*

![](assets/mobile/image38.png)
*Tablet view of a lookup list*

##### Flip switch

It may be necessary to confirm or deny something with the help of a flip switch.
The following two options are possible:

![](assets/mobile/image39.png)
*No, negation*

![](assets/mobile/image40.png)
*Yes, confirmation*

### Adding data

As discussed, it is possible to add data by means of the plus button, when this
has been made available by the developer. When data is being added, there are a
number of other options (icons) available. These will be explained in more
detail in this paragraph based on the figure below.

![](assets/mobile/image43.png)
*Adding data in the form*

- Press the *cross* ![](assets/mobile/image44.png) to empty the input field
- Press the *checkmark* ![](assets/mobile/image45.png) at the bottom or at the top of the screen to save the data
- Press the *cancel icon* ![](assets/mobile/image46.png) at the bottom of the screen to cancel the input of data
- Press the *return icon* ![](assets/mobile/image47.png) at the top left of the screen to return to the previous screen

##### Popup with cancel or delete

If the action is cancelled during the addition of data, it is possible that a
confirmation popup appears. This can also occur when deleting a record.

![](assets/mobile/image48.png)

![](assets/mobile/image23.png)
*Cancelling or deleting a record*

### Prefiltering the data

As indicated, it is possible that developers have predefined a number of
filters, which can be enabled or disabled by the user. When these are available,
they can be found under the *star icon* ![](assets/mobile/image49.png). 

When pressed, a popup opens with the available prefilters. By selecting one the data
will be filtered. It is possible that prefilters are enabled as default and
cannot be disabled by the user. This is chosen by the developer and can only be
enabled or disabled by the developer.

![](assets/mobile/image50.png)
*Selecting prefilters*

## Logging out

In the action bar of the *main menu* it is
possible to close the application by clicking on the *Log out* icon ![](assets/mobile/image13.png).
