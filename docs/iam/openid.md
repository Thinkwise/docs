---
title: OpenID
---

With OpenID you can use an existing IAM account to sign in to other websites, without having to create new accounts. These websites can be configured as OpenID clients.

Information can be shared between IAM and the website such as a name, department or email address. You can control which information is shared with the websites you visit by configuring the claims of the OpenID resources. Your (salted and hashed) password is only known by IAM, which confirms your identity to the websites you visit. Other than IAM, no website ever sees your password, so you don't need to worry about insecure websites compromising your identity.

![](assets/iam_admin/openid_client.png)
*OpenID clients*
