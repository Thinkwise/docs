---
title: Themes
---

The theme (style) of the user interface is also defined in the model. The theme is related to, colors, fonts and images and is defined for all components of the user interface.

To apply themes that transcend a project it is possible to *Import* and *Export* themes using the ![](../assets/sf/image215.png) tasks. The export task generates XML for a theme, the import task can import this XML or read the theme from another project version in the same Software Factory.

![](../assets/sf/image216.png)
*Themes*

## General

The general theme settings, such as the background color and the scroll bar, are defined in the *General* tab page.

### Document tab

When tabs are opened from the menu, they can be active (selected) or inactive (not selected). The tab colors in this instance and the colors when you move over the tab can be set here.

![](../assets/sf/image218.png)
*Tab in theme*

### Tab

Where in the document component, the tab color can be set for colors opened from the menu, the colors for the background of the tabs within these main tabs are set here. Shown in turquoise in the figure below.

#### Tab header height

There can be chosen from the following options:

![](../assets/sf/image219.png)
*header method options*

- Default - The default is unchanged.

- Spacious - Extra padding based on font size.

- Manual - Manual padding in pixels around the header text.

![](../assets/sf/image220.png)
*Tab with manual height*

#### Tab lines

It's possible to set the color of tab content lines and tab header lines.

![](../assets/sf/image221.png)
*Tab with transparent lines*

#### Disabled tabs

Disabled tabs are styled by the GUI, by default. It*s possible to manually style these tabs in the SF.

![](../assets/sf/image222.png)
*Disabled tab Code changelog*

![](../assets/sf/image223.png)
*Tab color settings theme*

The colors for the lines surrounding the tabs can be modified here. It*s for example possible to make the tab header color a dark gray, and the content border white (same as the background color). This significantly reduces the amount of lines on the screen in nested tabs.

### Background

The color is set for the background of the application on the background tab. This background is displayed when no tabs are open. You can also set an image as a full screen background image by expanding it to full screen size. Be aware that this might cause some distortion of the image.

![](../assets/sf/image224.png)
*Add an image in the theme*

### Document

The background colors, which are displayed when a tab is opened, can be defined here. Shown in violet in the figure below.

![](../assets/sf/image225.png)

![](../assets/sf/image226.png)
*Document theme settings and the result*

The splitter color, which is visible for example between a grid and a form and an image can also be set here.

### Popup

This is where the background color of a popup field is modified.

### Scrollbar

This is used to indicate the background color and the color of the scrollbar.

### Header and footer

The colors for the top and bottom of the application can be selected for the mobile application.

![](../assets/sf/image227.png)
*Setting the theme for mobile*

### Application list

This is where the colors of the applications at the bottom of the menu are styled.

![](../assets/sf/image228.png)
*Application list style*

### Splash screen

Setting the colors and logo for the splash screen is something that takes place in the IAM. The reason for this is that when opening an application, this does not necessarily mean that only one application is opened. The splash screen does therefore not refer to one particular application.

However, you can specify here which components should and should not be displayed on the splash screen. The 'Button' component has not yet been implemented in the current Software Factory generation.

![](../assets/sf/image229.png
*Setting splash theme*

### Badge

This section has been added to give the option to style the font and background color of badges.

## Navigation

In the navigation section, it*s possible to set every style option related to navigation.

### Ribbon

When the colors are set for the ribbon, you can choose to set a general background color. In addition, you can set a mouseover color for a segment or for just a button

![](../assets/sf/image230.png)
*Theme settings for the ribbon*

> The color that is selected for the ribbon will appear behind an icon of a task, pre-filter, etc. in the ribbon within the work area.

![](../assets/sf/image231.png)

### Quickbar

If the menu is displayed as a quickbar, the theme settings can be specified here. For example, a background can be set, the groups and items can be given a color and an image can be displayed at the bottom of the menu.

### Tree

If the menu is displayed as a tree view, the theme settings can be specified here. For example, a background can be set, the groups and items can be given a color and an image can be displayed at the bottom of the menu.

If users can switch between these types of menus, then both menus have to be set up.

### Tiles

The settings for the tile menu, tile groups and individual tiles can be specified here. The tiles menu can be given a background color or image. Single tiles can be given a normal, selected and mouse over style.

### Title bar

The changes made in the menu component will affect the bar above the ribbon of the application which hold the name of the application.

![](../assets/sf/image232.png)
*Bar above the ribbon of the application*

## Components

In this section it*s possible to style the different components: grid, form and cube.

### Grid

When setting up the grid, various components can be modified for a grid view. For example, the general grid theme can be set up, including the background color.

> If transparent is chosen in the 'line' component, the rows in the grid will be colored alternately in the color of the background and in a shade darker.

![](../assets/sf/image233.png)
*Grid view with alternating colors*

In the following sub tabs you can specify the group colors, row colors and the focus cell colors. These can be set for the active row, the selected row and for a mouse over.

#### Grid aggregation style

It is possible to style the grid aggregation (summary), for example:

![](../assets/sf/image234.png)

### Form

A color can be set for the background and the border of the form. In addition, the lines that appear under a group label can also be modified.

![](../assets/sf/image235.png)

![](../assets/sf/image236.png)

It is possible to set border color, background color and font color of form fields in edit and non-edit mode.

In the field component, the settings can be changed for the color of the mandatory, editable and read-only field. If the application is not in a modify or add mode, all fields will adopt the color of the read-only fields.

#### Show buttons on hover

An option to only show form buttons when hovering over the form with the mouse.

### Cube

All settings for the cube can be modified in the cube theme component. This component is divided into three sub tabs. The general settings for the cube, such as the background color and the cube color, can be specified on the first tab. You can also define a color for the graph here. This color is displayed behind the graph and the surrounding border can also be modified.

The field settings can be modified on the second tab. The background can be specified here and the totals and the border can be assigned a color.

The colors for the areas, rows, columns, fields and cells can be specified in the third tab, *area*,

As shown in previous paragraphs, there are many different options available when it comes to setting up the theme. The theme is obviously a personal matter and provides the application with the look and feel that suits the organization. Thinkwise recommends adjusting the theme in line with the colors of the company, but to keep it neutral. A theme that is too prominent distracts and will not benefit productivity. When the colors of a theme are underexposed, this can be confusing because it is then not clear where one tab ends and the other begins. A correct theme supports the application and benefits productivity.

The figures below show an example of a strong visual theme and a minimalist theme.

![](../assets/sf/image237.png)
*A theme that is out of balance.*

![](../assets/sf/image238.png)
*A minimalist theme*

## Colors and Fonts used

When creating a theme, it is recommended to use a limited set of colors. In the *Colors used* tab page it is possible to see with colors are used and where they are used.

A color can be changed using the *Update color* task or by dragging the column to the preferred color. The same overview is available for the fonts used.

![](../assets/sf/image239.png)

![](../assets/sf/image241.png)
*Fonts and colors used in a Theme*