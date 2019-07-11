---
title: SQL coding guidelines
sidebar_label: 📖 SQL coding
---

The goal of these guidelines is to provide the SF developer best practices for programming control procedure templates in T-SQL.

### General

1. If you need to program on database values, always use a domain with domain elements.
2. Every template should contain comments.
3. Don’t use keyword DISTINCT
4. Don’t use keyword UNION without ALL
5. Use comments with --, don’t use /* */
6. Use cursors always with the following options: local static read_only forward_only
7. In an IF statement always use BEGIN and END.
8. In a WHILE loop always use BEGIN and END.
9. Use tsf_send_message for messages, don’t use raiserror
10. Transactions in procedures and tasks need begin tran, rollback tran, and commit tran
11. Only use keyword APPLY when joining a table valued function

### Triggers

1.	Used voor checking functional integrity of data
2.	Every query should use either inserted or deleted
3.	Don’t use cursors
4.	Don’t use explicit transactions (begin tran - commit tran)
5.	Don’t use variables
6.	Don’t change data in inserted and deleted
7.	Don’t use temporary Tables

### Defaults

1.	Every template should contain an if-statement
2.	Don’t reset input parameter values
3.	Don’t use cursors
4.	Don’t use explicit transactions (begin tran - commit tran)
5.	Don’t do inserts, updates, or deletes on tables
6.	Don’t use temporary tables

### Layouts, Contexts, Processes

1.	Every template should contain an if-statement
2.	Don’t reset input parameter values
3.	Don’t use cursors
4.	Don’t use explicit transactions (begin tran - commit tran)
5.	Don’t do inserts, updates, or deletes on tables
6.	Don’t use temporary tables
7.	Don’t create error messages

### Tasks and Subroutines (stored procedures)

1.	Always create an explicit transaction
    - When there is a cursor in the task
        - Every iteration a transaction
    - When there is no cursor in the task
        - Whole task is one transaction

### Subroutines (user defined functions)

1.	Don’t use cursors
2.	Don’t use explicit transactions (begin tran - commit tran)
3.	Don’t do inserts, updates, or deletes on tables
4.	Don’t create error messages
