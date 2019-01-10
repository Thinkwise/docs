---
title: Branching and merging
id: version-2018.3.0-merging
original_id: merging
---

When several developers or teams work on different features of an application, branches of a project version can be made for these features via the *Project overview* screen. Each feature can be further developed separately and, as soon as a feature is completed, it can be combined (merged) with the main project version (trunk) via the *Merging* screen. This way, a new feature can be developed and tested entirely independently from the rest of the project.

## Creating a branch

A branch can be created in the *Project overview* screen using the ![](assets/sf/image38.png)*Create Branch* task.

This task opens the following pop-up.

![](assets/sf/image39_2018_3.png)
*Pop-up for creating a branch*

It must be indicated for which project and project version a branch has to be created. The name of the branch project can then be entered and a location selected for the project and the database.

When the branch is created, it can be developed like a regular project. To do this, select the correct project and the associated project version on the project screen.

### Snapshots

When creating a branch, a snapshot of the trunk is created and will be used as the origin version. The origin version is used internally when merging to determine the changes in both the branch and the trunk.

If multiple branches need to be created from the same trunk version, the snapshot can be reused. This is done by selecting an existing origin version as the trunk version to branch from.

## Creating a merge session

As soon as the branch project is satisfactorily completed and tested, it can be combined again with the trunk. This can be done in the *Merging* screen. A merge can be started with the help of the *Start merge session* task.

![](assets/sf/image41_2018_3.png)
*Pop-up for starting a Merge session*

Select the trunk and branch project version to merge. Any conflicts are identified so that a solution strategy can be defined in the following step. In this situation, only a comparison is made. Because no modifications have yet taken place, the user can always go back to the previous step. 

As long as a merge session is not completed, the indication *merging* will be added to the project version to indicate that a merge session is running. Modifications in a project version with the status merging may be lost when the merge session is carried out.

![](assets/sf/image44_2018_3.png)
*Merging indicator with project version*

It is also possible to merge modifications from the trunk into a branch. It can then first be tested whether the new version works correctly, before the trunk is updated.

## Conflicts

Conflicts are presented in the *Conflicts* tab. When the merge session is started, all actions done in the trunk and the branch compared to the origin version are analyzed.

Conflicts will occur when:
1. An entity has been inserted in both trunk and branch
2. The same property of an entity has been updated in both trunk and branch
3. An entity has been updated in the trunk and deleted in the branch (or vice-versa)
4. An entity has been deleted in the trunk and a new or changed entity in the branch depends on this entity (or vice-versa)

![](assets/sf/image45_2018_3.png)
*Overview of the conflicts*

### Resolving conflicts

After the conflicts are detected, they can be resolved one-by-one. It is also possible to resolve several conflicts simultaneously with the help of the *Resolve conflict* ![](assets/sf/image46.png)task.

This enables the modifications from the branch or from the trunk to be carried out. There are four options available:

1. Only carry out the trunk action - The action of the trunk will be executed. The action of the branch and any dependent actions of the branch will not be executed.
   ![](assets/sf/image47.jpeg)
1. Only carry out the branch action - The action of the branch will be executed. The action of the trunk and any dependent actions of the trunk will not be executed.
   ![](assets/sf/image48.jpeg)
1. Carry out trunk action but keep dependent branch actions - The action of the trunk will be executed. The action of the branch will not be executed. However, the dependent actions of the branch will still be executed.
   ![](assets/sf/image49.jpeg)
1. Carry out branch action but keep dependent trunk actions - The action of the branch will be executed. The action of the trunk will not be executed. However, the dependent actions of the trunk will still be executed.
   ![](assets/sf/image50.jpeg)

> Options 3 and 4 can lead to new conflicts between the dependent actions of the trunk and the branch. These will then have to be resolved.

### Comparing code

With the task *Compare code*, it is possible to compare and merge the different values of a column for the conflicts *Dual change* and *Dual addition* with an external comparison table (WinMerge or KDiff3). After saving the file in the comparison tool, the merged text is transferred to the pop-up. By clicking on *OK*, the value is stored with the branch and the processing set to *Only carry out branch*.

![](assets/sf/image51_2018_3.png)
*A conflict comparison during a merge session*

## Execute merge session

Only when all conflicts have been resolved, can the *Execute merge session* ![](assets/sf/image43.png) task be started to perform the actual merge.

After the merge, a new project version is created in the target project and the merged project versions are deactivated.

> When the branch has been merged to the trunk, it is discouraged to keep working in the branch. The origin version for the branch will remain the same, which will result having to resolve the same conflicts when merging again. Instead, create a new branch.