---
title: Roles
---

This chapter examines the creation of roles.

Roles can be regarded as separate items of functionality, user tasks, processes or modules of an application. It is important for the developer to closely assess these separate items, so that there is no overlap in rights between different roles. Furthermore the nomenclature of the roles must be clear for IAM administrators who must set up the authorisation of an application with these roles. They have no knowledge of the functionality and therefore have to deduce the purpose of the roles only from the roll names.

For example 'Visitor registration', that comprises checking whether customers are in the system, whether customers have an appointment, issue visitor tags and informing the colleague who invited the customer. This role is subsequently linked by an administrator to the group administration. However, along with this role the group administration perhaps also gets the role 'Report illness', 'Absence requests' and 'Invoice hours'.

**EXAMPLE**

This combination of roles and groups provides more simplicity when setting up the authorisation. There can be a user group 'HR' which includes the roles 'Hire employees', 'Approve vacation days' and 'Salary administration'. Which specific rights are assigned to which components for a role are no longer important for the Application administrator. The Application administrator must be able to deduce the purpose of a role from its name

Creating roles will be discussed in paragraph 3.1 'Role rights' and paragraph 3.2 'Model rights'. The difference between these paragraphs is the method of set up. For example, the set up can be done for each role, which is logical when creating new roles, but these can also be set up from the model. This is logical with an upgrade of the model, when a newly added component has to be linked to a number of existing roles. But more about this in the following paragraphs.

Role rights
-----------

## Project version

On the 'Project version' tab is an overview of all synchronized projects with their version. There are also two tasks available here that help when setting up the roles after an upgrade of a project version or when copying roles from one IAM to another IAM.

### Copy roles of a project version 

When a new project version is synchronized in the Intelligent Application Manager, for which an earlier version has already been configured, most of the rights of the previous version can be reused. This is done with the task 'Copy roles of a project version'.

![](../assets/iam_dev/image11.png)

Copy rights

### Import roles from another IAM 

When use is made of different IAMs, for example for a DTAP environment, then it is possible to copy the roles created in one IAM to another IAM. In this way the roles do not need to be created again. Copying these roles is possible with the task 'Import roles from another IAM'. ![](../assets/iam_dev/image12.png). It is also possible to write the import of roles to disk. This is done to execute the roles on an IAM that is not immediately accessible.

**NOTE**

The roles are completely overwritten when importing roles. The current rights assigned to the roles elapse

### Relink files

In order to easily change all file paths in a Software Factory model to the desired configuration for the production environment, a task has been added with which file paths can be replaced.

![](../assets/iam_dev/image13.png)

Re link files

### Import existing role

Using this task roles can be copied from another project to the present project. Pay attention that roles with the same nomenclature are overwritten.

### Assign new rights

This task can be used when tables, columns, tasks, etc. are added within a new version that all have to be assigned to one role. In practice this will not often happen, because new project versions often include a broader upgrade, which are distributed across several roles.

### Apply roles to the database 

This task ensures that the created role or roles are written to the database. As soon as this has happened they are also available for use in the end product.

## Roles

The roles are created and set up on this tab.

![](../assets/iam_dev/image14.png)

Role rights

### Create a role

The first step when setting up roles is creating a new role. It can be that roles already exist in another project, then these can be read in with the task 'Copy roles'.

When a new role is added this must be given a name and description. It is also possible here to check the All Rights check mark. In practice, this will not often have to occur, since you then provide this role with all application rights. This goes against the above mentioned principle that a role only has the tasks that belong to that one role.

### Provide role with rights

Once a role has been created then it can be set up.

When we select a role in the list on the left we can indicate on the right of the screen all the rights that this role has. The various components are divided into the following sub-headings:

- Platforms; on which platforms can you log in.

- Tables; which tables are available for this role? It can be indicated here for every GUI component whether this is available. For example, a role may read a table and add records to it, but then subsequently not be able to remove or export them.

Under the sub-heading Tables there are a number of tabs about, for instance, the columns within the selected table, the prefilters within the table, but also the tasks, reports and cubes. It can be indicated for every component whether or not it must be available for this table.

- Customized screens; which customized screens are available.

- Tasks; which tasks and task parameters are available.

- Reports; which reports and report parameters are available.

- Cubes; which cubes and cube views are available.

- Menus; which menus, quick launch toolbar groups, module groups and/or tile groups are available. Plus the underlying items.

- Process flows; which process flows and process actions are available.

- Subroutines; which subroutines are available.

![](../assets/iam_dev/image15.png)

Set up a role

As can be seen every aspect of the application can be made available or not for a role. There are however a few ground rules for this. For example, a process flow in its totality will not be available if one of the process steps is not available. And a cube will also not be available if one of the components of the cube is not available. A second ground rule is that the higher level subject must always be available to be able to display the underlying subject. For instance, to be able to see a menu item the associated menu group and the menu itself must also be made available. This sounds logical, but it is sometimes difficult when setting things up. To support this the task 'Assign rights' ![](../assets/iam_dev/image16.png) is available in the application. By clicking on this task the system will make that component plus the higher lying components available. Pay attention to the fact that this may cause the release of other components. If we again take the menu example, then making the menu group available can also result in the other menu items in the same group also becoming available. It must then be explicitly stated that this item may not become available. In the figure below it can be seen how, when using the task 'Assign rights', the choice can be made to also make available the higher level rights and the underlying rights.

![](../assets/iam_dev/image17.png)

Assign role rights



Model rights
------------

As already indicated at the beginning of this chapter you can set up roles in two ways. The first manner is discussed in the previous paragraph. This is the most logical manner when a new role is added.

The second method is used more often if it is not a role that is added, but that the model is modified. For example, a new table is added in the model. This table must now be added to a number of roles. The required table can now be looked up in this tab after which it can be indicated for each role whether the role may act in some way on this table. The way of thinking is therefore in fact reversed.

![](../assets/iam_dev/image18.png)

Model rights

## New objects

The tab page 'New objects' shows the objects that are new in this project version. With the task \"Set previous version\" it is possible to set the version to be compared.

![](../assets/iam_dev/image19.png)

Figure 14: New objects in IAM

With the task \"Assign rights\" a process flow will move the focus to the object in the model tab page, so that the rights can be assigned. This only works when the screen is a detail (and not zoomed in).
