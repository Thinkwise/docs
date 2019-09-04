---
title: Work
---

Development teams can leverage *Work* to describe, plan and keep track of development activities.

Work describes what changes to a model need to be done, be it new parts of a model, updates to a model or removing unused parts of the model. Additionaly, work can be used to describe other development activities such as testing and deployment.

### Links

[Requirements](requirements) generally lead to work. When a requirement is not yet implemented, work can be used to describe how the requirement will be implemented. When a requirement is changed, work can be used to describe the required changes in a model.

When work is linked to a requirement, it will be placed at the same [business process](business_processes), [feature](features) and [iteration](iterations) of this requirement by default. Moving the requirement to a different business process, feature or iteration will also update the linked work.

Work can be explicitly assigned to a _different_ business process, feature or iteration than the requirement. This exception will remain intact even when the requirement is moved to a different business process, feature or iteration.

> TODO: Image of conditional layout applied on work

### Work status

To keep track of the implementation progress, work has a *Work status*. A task can be used to update the status of work.

The values for work status can be configured freely in the Software Factory. An order number can be specified which decides the ordering of the various statusses in the combobox when changing the status.

Additionaly, a *Progress* value can be defined for each status. This value will be used when determining the average progress of all work items to requirement, business process, feature or iteration. Work having a status with no progress value will be excluded from this calculation.

One default status is required and can be set using the corresponding task.

A work status can be configured to correspond to a certain lane in the [kanban board](kanban_board) by specifying the *Kanban sequence no*. When left empty, work with this status will not show up in the kanban board.

> TODO: Image of work status

### Tags

To quickly and freely categorize work, tags are available.

### Attachments

Files can be uploaded as attachments to work.

### Log

The work log records all changes to the links, title, description, status and attachments of a work item.