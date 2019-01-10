---
title: Function point analysis
id: version-2018.2.0-function_points
original_id: function_points
---



With the Thinkwise platform, it is possible to automatically calculate the number of function points of your application. A function point is a unit of measurement to express the amount of business functionality an information system provides to a user. Function points are used to compute a functional size measurement of software. (Source: [wikipedia](https://en.wikipedia.org/wiki/Function_point))

The automated function point calculation of the Thinkwise Platform has been developed in collaboration with and verified by [QSM](http://www.qsm.com/), the leading authority on Quantitative Software Management. It satisfies the [Nesma](https://nesma.org/) counting practices at a global level.

![1537781463608](assets/sf/1537781463608.png)
*Example function point analysis*

By analyzing the model, the function point analysis can determine exactly which data and transactional functions are offered to a user by the user interface. Points are assigned to each of these functions to calculate the total number of function points. 

The analysis:

* identifies and counts internal logical data collections, taking into account cardinalities and optionalities
* identifies and counts FPA tables
* identifies and counts User Transactions
  * Input functions
  * Output functions
  * Inquiry functions
* assumes primary ILFs and looks for the associated functionality that is implemented in the specific model
* eliminates double counts

For more information, download the QSM report from our [website](https://offers.thinkwisesoftware.com/en-gb/qsm-rapport-download-page).