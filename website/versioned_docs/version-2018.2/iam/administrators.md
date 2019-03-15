---
title: Administrator roles
id: version-2018.2-administrators
original_id: administrators
---

The Intelligent Application Manager provides different levels of authority to ensure the security of your applications.

For example, only specific developers are allowed to synchronize new project versions, while an application administrator is responsible for creating user groups and users for a subset of applications. 

A user can be assigned IAM administrator rights using the *Administrator* tab page in the *User* screen. The following administrator roles are available:

| Role                      | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| Main administrator        | This role provides the user with full control over the IAM.  |
| Project administrator     | The Project administrator may synchronize new projects and create roles. In addition, they can also define Project owners. |
| Project owner             | The Project owner may administer new roles for their own projects. This means that they can create, modify and delete roles for the projects for which they are the owner. |
| Application administrator | The Application administrator may create new applications and link the roles that have been created by the Project owner or Administrator to groups. These groups must first have been created by the Group administrator. Moreover, they can also define Application owners. |
| Application owner         | The Application owner can link roles that have been created by the Project owner or Project administrator to groups within the application for which they are the owner. These groups must first have been created by the Group administrator. |
| Group administrator       | The Group administrator may create new groups and link users to them. These users must first be created by the User administrator. In addition, they can also define Group owners. |
| Group owner               | The Group owner may link users to the groups for which they are the owner. |
| User administrator        | The User administrator can create new users.                 |
| Simulator                 | Users with *Simulator* rights are able to simulate other users for troubleshooting purposes. See [user simulation](user_simulation). |

For a developer to be able to synchronize and set up an application in IAM, the following rights are required:

- Project administrator
- Project owner
- Application administrator

An application administrator responsible for creating users and user groups and linking roles to user groups requires the following roles:

* Application owner
* Group administrator or Group owner
* User administrator

