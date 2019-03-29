---
title: Objectmodel Extender Template
---

## Step 1 - Download template

A Visual Studio project template for creating your own Objectmodel Extender is available <a href="https://github.com/Thinkwise/objectmodel_extender_template" target="blank">here</a>.

Once you have downloaded the template zip you can add this to the following Visual Studio folder:  
`C:\Users\<User name>\Documents\Visual Studio 2017\My Exported Templates`

## Step 2 - Create a new project

In Visual Studio click *File > New Project* and select the *ObjectmodelExtenderTemplate*:

![Step2](assets/objectmodel_extender_template/Step2.jpg)
*New project with the right template*

- The *Name* can be filled with the name of your company + *ObjectmodelExtender* add the end, e.g. `WorkshopObjectmodelExtender` 
- The *Location* of your project is free of choice.
- The *Solution name* can be the same as the Project Name.

The *Name* you choose will also be the name of the DLL which is build at step 8.

## Step 3 - Rename the csharp file

Right click on *ObjectmodelExtender.cs*, choose rename and give it the same name as your project, e.g.:  
`WorkshopObjectmodelExtender.cs`

## Step 4 - Reference GUI DLL's

To be able to build the project we need to add these two GUI DLL's to your project folder:

![Step4](assets/objectmodel_extender_template/Step4.jpg)
*GUI DLL's needed*

- The Thinkwise.Runtime DLL can be found in the root of the GUI folder
- The Thinkwise.Shared DLL can be found in `<GUI>/Components/Thinkwise`

After the DLLs are added to your project folder you can reference them in Visual Studio by right clicking *References* and selecting *Add Reference...*:

![Step4b](assets/objectmodel_extender_template/Step4b.jpg)
*Add Reference*

Browse to your project folder and select the 2 DLLs. Click *Ok* and from now on no more red lined should be visible in Visual Studio:

![Step4c](assets/objectmodel_extender_template/Step4c.jpg)
*No more errors*

## Step 5 - Change namespace

Change the namespace from *ObjectmodelExtenderTemplate* to *Workshop*, also the first part of *typeof*:

![Step5](assets/objectmodel_extender_template/Step5.jpg)
*Namespace changed*

## Step 6 - Change classname

Change the classname from *ObjectmodelExtenderTemplate* to *WorkshopObjectmodelExtender*, also the second part of *typeof*.
Also change the name of the DLL:

 ![Step6](assets/objectmodel_extender_template/Step6.jpg)
*Classname and DLL name changed*

## Step 7 - Add objectmodel extender settings

Within the ExtendModel methode the required settings can now be added. 
The available settings may differ due to the version of the referenced GUI DLL's.

For more information about the settings contact the Research and Development department.

## Step 8 - Build and use

When all settings are done you can build the project by clicking *Build > Build Solution*.

A DLL is now available in `\<Project folder>\bin\Debug` or `\<Project folder>\bin\Release`

In our example we have `WorkshopObjectmodelExtender.dll` available.

To use this extender in your project you have to move it to a specific folder in the GUI called *Projects*.
For both the Windows as Web GUI this folder is available in the root folder, if not create it.
In this *Projects* folder create a folder with the name of your SF project. In case you want to use the objectmodel extender for a branch in the SF, choose the branch name.

Now move the created DLL to this folder.

Restart the GUI and check if the objectmodel extender is working as expected. For the Web GUI you have to restart IIS.