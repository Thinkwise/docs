---
title: Maps component
id: version-2018.2.0-maps
original_id: maps
---

Guidelines for using the maps component:

## Using addresses and coordinates simultaneously

Addresses have the obvious advantage of being more usable than coordinates, whereas coordinates take much less time to process. To leverage both of these advantages, the Maps components are now able to deal with sets data which contain both addresses and coordinates. The data set is split up accordingly and processed in parallel to further boost the performance. Note that the addresses and coordinates must be stored in separate columns and that the coordinates require two columns (longitude and latitude).

## Translating addresses only once

To complement the point above, to prevent reaching the request limit of the GeoCoder and increase the performance in general, addresses which have been translated will be written back to the database by means of an update-statement. This will only be done if the table or view has a longitude and latitude column as well. Developers should keep the following points in mind with regard to this feature:

- When using a view, the view must have a defined primary key in order for the GUI to be able to update a record with coordinates.
- When using a view, it may be necessary to write an update-trigger which will channel the coordinates to the correct location.
- An update-trigger should be written on the table which contains the address. This trigger should clear the coordinates if the address is updated.


It is strongly recommended to add columns for the coordinates when using a GUI which supports the features above, especially in situations with more than a hundred addresses.