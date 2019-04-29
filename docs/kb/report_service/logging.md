---
title: Logging/Debugging
---

The Thinkwise Reporting Service uses the [NLog](https://nlog-project.org/) framework for logging.
NLog can be configured by modifying the NLog.config file in the service's installation directory.

By default the service is configured to log warnings, errors and fatal errors to a file named *thinkwise.log*.
This should be enough to detect when something goes wrong in the service.

The standalone console application also has an extra logger configurated to output log statements at the Infomation level to the console window.

To enable logging at lower levels than warnings, open the NLog.config file and change the minlevel attribute of the following rule to the desired log level:

```xml
<logger name="*" minlevel="Warn" writeTo="logfile" />
```

NLog's log level values, going from most to least detailed, are as follows: Trace, Debug, Info, Warn, Error, Fatal.

For more advanced logging configuration, consult the [NLog documentation](https://github.com/nlog/nlog/wiki).
