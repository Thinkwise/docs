---
title: General
---

Applications developed with the Thinkwise Software Factory can be authorised with the help of the Thinkwise Intelligent Application Manager.

User groups can be created, to which users can be added. These groups can be assigned to roles. These roles are provided with a set of rights as is further explained in chapter 3. In addition, it is possible to define preferences for users and for user groups, such as layout, menu and prefilters.

Users get one user interface via the Intelligent Application Manager with which they can access all applications for which (via an users group) they are authorised. In addition, they can define their own user interface by means of user preferences.

The structure of this manual follows the same structure as is also specified in the Intelligent Application Manager. By following this structure an application is configured step by step and made available for the end user.

![](../assets/iam_dev/image5.png)

Intelligent Application Manager

It is assumed in this manual that the administrator is authorised for a number of rights which arise from the types of administrators that are available. The types of administrators that are recognized will be examined in the following paragraph.

## Administrator type

The Intelligent Application Manager has different kinds of administrators. For example, some administrators may synchronize new project versions and other administrators are responsible for creating user groups and users. There are eight levels defined to be used to set up the rights for each administrator.

It is assumed in this manual that the IAM administrator has the rights for the roles:

- Project Administrator

- Project Owner

- Application Administrator

This implies that this administrator is engaged in the synchronization of new project versions, the creation of roles and the creation and authorisation of applications. Creating user groups and users, that are linked to the roles therefore falls outside the scope of this administrator. We briefly mention this in this manual to outline a total picture of the possible administrator types.

![](../assets/iam_dev/image6.png)

Administrator\'s overview

The above figure comes from the menu component 'Users' under the tab 'Administrators'. The type of administrators are here assigned to a user.

### Head Administrator

This type of administrator has rights on all components within the IAM. This implies that he is responsible for the synchronization of new project versions, but he can also define new roles, applications, groups and users.

### Project Administrator

The Project Administrator may synchronize new projects and create roles. In addition, he can also define Project Owners.

### Project Owner

The Project Owner may administer new roles for his own projects. This implies that he can create, modify and delete roles for the projects for which he is the owner.

### Application Administrator

The Application Administrator may create new applications and link the roles that have been created by the Project Owner or Administrator to groups. These groups must first have been created by the Group Administrator. In addition, he can also define Application Owners.

The following administrator types are not applicable for this IAM administrator:

### Application Owner

The Application Owner can link roles that have been created by the Project Owner or Administrator to groups within the application for which he is the owner. These groups must first have been created by the Group Administrator.

### Group Administrator

The Group Administrator may create new groups and link users to them. These users must first be created by the User Administrator. In addition, he can also define Group Owners.

### Group Owner

The Group Owner may link users to the groups for which he is the owner.

### User Administrator

The User Administrator can create new users.

### Simulator

The simulator is a special function. This function is able to simulate other users.
