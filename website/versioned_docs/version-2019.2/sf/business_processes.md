---
title: Business processes
id: version-2019.2-business_processes
original_id: business_processes
---

Business processes can be defined in the Software Factory to gain a deeper understanding of the scope and context of the application(s) that will be built. Business processes should contain as little implementation details about the actual solution as possible.

The business process is structured as a tree, with the main process node in the root. Child nodes in the tree represent sub-processes. The leaf nodes in the tree generally represent user activities. These activities are performed by a single user at a certain point in time.

> It is discouraged to split up user activities further into elementary actions or work instructions in these diagrams. After all, the work instructions are dependent on the implementation. A user activity should correspond to a single [role](roles).

[Requirements](requirements) can be placed under any business process node in the business process tree. [Work](work) can be placed under business processes or can be linked to a requirement.

The work and requirements are shared between the business processes, [features](features) and [iterations](iterations).

## Adding nodes

When adding a new node in the tree, the type of node will be determined by the node that was selected. 
- When a business process node was selected, a new business process node will be created. 
- When a requirement node was selected, a requirement node will be created.
- When a work node was selected, a work node will be created.

The new node will be placed next to the previously selected node by default, with the same parent and at the same level.

Alternatively, new child nodes at a certain location can be added via the *Sub-business processes*, *Linked requirements* or *Linked work* tab.

## Work state

When work is linked to a requirement, repositioning the requirement will also reposition the work. However, the work can be placed at a different location in the business process tree while retaining its link with the requirement. The work will receive a different icon and a task will be available to move the work to the same location in the business process tree as its requirement.

| Icon | Work state |
| ---- | ---------- |
| ![](assets/sf/icons8-briefcase_blue.svg)| The work is not linked to a requirement, placed freely in the business process tree |
| ![](assets/sf/icons8-briefcase-blue-linked-orange.svg) | The work is linked to a requirement and is in sync when it comes to positioning in the business process tree |
| ![](assets/sf/icons8-briefcase-blue-warn-orange.svg) | The work is linked to a requirement but is manually placed elsewhere in the business process tree |

## Designing business processes

When a business process node is selected, the *Designer* tab can be used to create a [BPMN 2.0](https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation) model of this process.

![](assets/sf/image11.png)

The various types of nodes that can be used are present in the toolbox on the left side of the screen. New activities will automatically become new nodes in the business process tree. When double-clicked, the GUI will navigate to this business process node.

Activity, Gateway, Intermediate, Start and End nodes can be right-clicked to apply an activity marker (e.g.  *loop* or *parallel*) or change the event type (e.g. *message* or *timer*).
![](assets/sf/bpmn_node_type.png)

When a node is selected, you can change the name or the description by typing directly.

Nodes can be placed in a lane, which allows you to assign responsibility for activities to a certain department, user or user group.

A *Pool (Black Box)* or *Call Activity* can be used to indicate a message triggering another process or a sub-process being reused. The name or ID of the referred process node can be typed in to formally link the pool. Changing the name of the referred process will also update all diagrams where the process is used.

When viewing the business processes as a stakeholder, the diagram will be read-only. A task is available to navigate to related *Pool (Black Box)* or *Call Activity* business processes.

## Attachments

To supplement the description of business processes, attachments can be added. These attachments will be stored in the database.

## Discussion

The discussion for every business process can be used to leave comments regarding business processes.

## Linked requirements and linked work

The *Linked requirements* and *Linked work* details show the requirements and the work that is directly linked to the business process.

## Impact analysis

The *Impact analysis* tab can be used to get an overview of all underlying requirements and all underlying work for a certain business process. These overviews differ from the *Linked requirements* and *Linked work* details as they also include the requirements and work of all sub-processes.

The *arrow* (![](assets/sf/icons8-right.svg)) can be used to navigate to the selected requirement or the selected work in the business process tree.

To find out which [features](features) and [iterations](iterations) share the same underlying requirements and/or underlying work, the *Related features* and *Related iterations* details can be used in the *Impact analysis* tab.

![](assets/sf/impact_analysis_business_process_to_iteration.png)
*An impact analysis overview showing the iterations to which the requirements and work for a business are assigned*

The *arrow* (![](assets/sf/icons8-right.svg)) can be used to navigate to the node in the feature or iteration tree, respectively.

## Tags

To quickly and freely categorize business processes, tags are available.

## Unassigned node

The *Unassigned* node is used to group requirements and work that have not yet been assigned to a business process.

## Drag-drop

Drag-drop can be used to reposition nodes. The dragged node will be positioned as a child of the drop target node.

## Progress

The progress of the business processes is aggregated using the status of the underlying requirements and work. 

> For more information, see the documentation on [requirements](requirements) and [work](work).