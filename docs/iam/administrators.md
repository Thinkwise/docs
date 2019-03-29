---
title: Administrator roles
---

The Intelligent Application Manager provides different levels of authority to ensure the security of your applications.

For example, only administrators are allowed to synchronize new project versions, while an application manager is responsible for creating user groups and users for a subset of applications. 

A user can be assigned IAM administrator rights using the *Administrator* tab page in the *User* screen. The following administrator roles are available:

| Role                      | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| Main administrator        | This role provides the user with full control over the IAM.  |
| Project administrator     | The Project administrator may synchronize new projects. |
| Application administrator | The Application administrator may create new applications and link available roles to user groups. These groups must first have been created by the Group administrator. Moreover, they can also define Application owners. |
| Application owner         | The Application owner can link roles to groups within applications for which they are the owner. These groups must first have been created by the Group administrator. |
| Group administrator       | The Group administrator may create new groups and link users to them. These users must first be created by the User administrator. In addition, they can also define Group owners. |
| Group owner               | The Group owner may link users to the groups for which they are the owner. |
| User administrator        | The User administrator can create new users.                 |
| Simulator                 | Users with *Simulator* rights are able to simulate other users for troubleshooting purposes. See [user simulation](user_simulation). |

For a developer to be able to synchronize and set up an application in IAM, the following rights are required:

- Project administrator
- Application administrator

An application administrator responsible for creating users and user groups and linking roles to user groups requires the following roles:

* Application owner
* Group administrator or Group owner
* User administrator

