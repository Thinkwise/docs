---
title: Specification review
---

The Software Factory is shipped with a role which allows stakeholders to review the requirements. The role `Specification review` can be granted to stakeholders in IAM. This role grants access to a review menu which can be accessed via the Windows GUI as well as the Web GUI.

![](assets/sf/specification_review_menu.png)
*Specification review menu*

Stakeholders must also be registered as a user in the Software Factory to be able to see any of the specifications. The users can be found in the [Settings](settings) menu group. The user name of the account in IAM must be set as RDBMS user.

The stakeholders will be able to view the business processes, features, iterations, requirements and work. Attachments, tags and the diagrams can also be viewed. The stakeholders cannot modify any of this data.

The stakeholders can participate in the discussion around business processes, requirements and work. Comments added by users can have the following statusses:
- Open
- Won't fix
- Resolved

The status of a comment can be changed via tasks.

> To install a Web GUI for the Software Factory, you can use the same INI as the Windows GUI.

## Business process diagram review

While reviewing, the discussion is directly visible under the diagram.

![](assets/sf/diagram-review.png)
*Discussion of a business process diagram*

Double-clicking in the diagram to navigate to a sub-process is currently not possible while reviewing a diagram. Navigation to sub-processes can be done via the tree. Navigation to a *Call activity* or *Pool (black box)* can be done via the button above the tree (![](assets/sf/icons8-right.svg)).

When the diagram has not been published by the analysts after modifications have been made to the diagram, the diagram will include a warning text to indicate this.

## Baselines

While the specifications are in flux, the stakeholders can have a hard time providing feedback as every refresh can change the set of specifications. In those scenarios, it can be desirable to review the specifications for a fixed point in time, instead of seeing the live version.

Baselines provide a way of identification for a point in time so the stakeholders and analysts are on the same page when it comes to interpreting feedback on a baseline.

Baselines can be accessed by analysist and developers from the specification menu group.

![](assets/sf/baseline.png)
*A set of baselines*

A baseline can be created by specifying a point in time, a version and a description. The baseline can be assigned to users in the Software Factory via the task *Link user to baseline*. When assigned, the users will see the specifications at this point in time. This includes everything that can be viewed via the review menu. The specifications, the status and progress, positioning, attachments and diagrams will all be shown as they were at the point in time of the baseline. 

The only exception is the discussion, which always shows all comments. When a comment is added while reviewing a point in time, this information will be added to the new comment.

![](assets/sf/baseline-comment.png)
*A review comment including baseline information*

When accessing screens via the review menu, the user can always see which baseline is currently active in the breadcrumb. 

![](assets/sf/specification_review_baseline-breadcrumb.png)
*Reviewing a baseline reveals the date and version of the baseline in the breadcrumb*

> Instead of a baseline, users can also be configured to see the review screens for an arbitrary point in time. This can be leveraged by analysts to choose the correct point in time for a new baseline.

## Limited specification access

The specifications to review can be limited by the analyst. This is user-specific, every stakeholder can be configured to have access to a different subset of specifications. By default, the stakeholder has access to all specifications. When specification access is limited, the analyst will have to white-list the business processes, features and iterations the stakeholder has access to.

![](assets/sf/stakeholder-specification-access.png)
*Configured specification access for a stakeholder, limiting the review to certain business processes, features and iterations*

The specification trees used for granting access correspond to the baseline or the arbitrary point in time configured for the user.

Underlying requirements and work will be visible for the granted business processes, features and iterations and all recursively underlying sub-processes, sub-features and sub-iterations.

To preserve the business process, feature and iteration trees, recursive parents of a granted business process, feature or iteration will also be available to the reviewer. However, the sub-processes, sub-features, sub-iterations, linked requirements and linked work of these parents will not be available to the reviewer.