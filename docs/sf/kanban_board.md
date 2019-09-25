---
title: Kanban Board
---

The kanban board allows developers to keep track of the status of their [work](work). Accessible from the menu, the kanban board opens as a floating document by default, as developers will often keep the kanban board opened and visible while working in the various modelers.

Every leaf-level [iteration](iterations) that is currently active is available as a kanban board by default. This is determined by the start- and end date of the iteration. Multiple kanban boards can be active at the same time. This is useful when working with multiple teams.

A prefilter can be turned off to show the kanban boards for past and future iterations. 

![](assets/sf/kanban.png)
*A kanban board*

## Lanes

The configuration of lanes in the kanban board is determined by the [work](work) status. 

Each individual work status can be configured to correspond to a certain lane in by specifying the *Kanban sequence no*. When left empty, work with this status will not show up in the kanban board. The kanban boards require a minimum of 2 lanes to function and can have up to 5 lanes.

Multiple work statusses can use the same *Kanban sequence no*. This way, work with multiple statusses can be placed in the same lane.

![](assets/sf/work-status-list.png)
*An example work status configuration. Six of the statusses are included in 4 kanban lanes.*

## Work details

The zoom button at the bottom of each lane can be used to further inspect the selected work in this lane. This will open a new floating document or will reuse an earlier opened work document.

Attachments, the work log, the linked [requirement](requirements), [business process](business_processes), [feature](features) and [iteration](iterations) are all available here.

## Drag-drop

The developer can drag-drop work from one lane to another to change the status. When a lane represents more than 1 status, the developer will be asked to provide the new status.