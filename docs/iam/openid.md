---
title: OpenID
---

With OpenID, you can use an existing IAM account to sign in to multiple websites, without needing to create new passwords. These websites can be configured as OpenID clients.

Information can be shared between IAM and the website such as a name, department or email address. You control how much of that information is shared with the websites you visit. This information can be set as claims in the OpenID resources. Your password is only given to IAM, IAM then confirms your identity to the websites you visit. Other than IAM, no website ever sees your password, so you don’t need to worry about an insecure website compromising your identity.

![](assets/iam_admin/openid_client.png)
*OpenID clients*