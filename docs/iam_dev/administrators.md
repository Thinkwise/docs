---
title: Administrators
---

The Intelligent Application Manager has different kinds of administrators. For example, some administrators may synchronize new project versions and other administrators are responsible for creating user groups and users. There are eight levels defined to be used to set up the rights for each administrator.

It is assumed in this manual that the IAM administrator has the rights for the roles:

- Project administrator

- Project owner

- Application administrator

This implies that this administrator is engaged in the synchronization of new project versions, the creation of roles and the creation and authorisation of applications. Creating user groups and users, that are linked to the roles therefore falls outside the scope of this administrator. We briefly mention this in this manual to outline a total picture of the possible administrator types.

![](../assets/iam_dev/image6.png)

Administrator\'s overview

The above figure comes from the menu component 'Users' under the tab 'Administrators'. The type of administrators are here assigned to a user.

### Main administrator

This type of administrator has rights on all components within the IAM. This implies that he is responsible for the synchronization of new project versions, but he can also define new roles, applications, groups and users.

### Project administrator

The Project administrator may synchronize new projects and create roles. In addition, he can also define Project Owners.

### Project owner

The Project owner may administer new roles for his own projects. This implies that he can create, modify and delete roles for the projects for which he is the owner.

### Application administrator

The Application administrator may create new applications and link the roles that have been created by the Project owner or Administrator to groups. These groups must first have been created by the Group administrator. In addition, he can also define Application Owners.

The following administrator types are not applicable for this IAM administrator:

### Application Owner

The Application Owner can link roles that have been created by the Project owner or Administrator to groups within the application for which he is the owner. These groups must first have been created by the Group administrator.

### Group administrator

The Group administrator may create new groups and link users to them. These users must first be created by the User administrator. In addition, he can also define Group Owners.

### Group owner

The Group owner may link users to the groups for which he is the owner.

### User administrator

The User administrator can create new users.

### Simulator

The simulator is a special function. This function is able to simulate other users.
