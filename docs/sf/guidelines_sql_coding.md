---
title: SQL coding guidelines
sidebar_label: 📖 SQL coding
---

The purpose of these guidelines is to provide Thinkwise Platform developer with best practices for programming *control procedure templates* in T-SQL.

### General

1. Use a domain with domain elements if you need to program on values.
1. Avoid the use of the `distinct` keyword.
1. Avoid the use of `union` without `all`.
1. Use `local static read_only forward_only` cursors.
1. Use `begin` and `end` in IF and WHILE statements.
1. Use `tsf_send_message` to send messages instead of `raiserror`.
1. Only use `apply` when joining a table valued function or a subquery.
1. Make sure every task and procedure containing a `begin tran` has corresponding `rollback tran` and `commit tran` statements.

### Triggers

1. Avoid using triggers for complex data mutations. Do use triggers for checking functional integrity of data.
1. Every statement should make use of the `inserted` or `deleted` table.
1. Avoid the use of cursors.
1. Avoid the use of explicit transactions (`begin tran`).
1. Avoid the use of variables.
1. Avoid the use of temporary tables.
1. Don't update the `inserted` or `deleted` tables.

### Defaults

1. Templates should contain an IF statement.
1. Don't reset input parameter values.
1. Avoid the use of cursors.
1. Avoid the use of explicit transactions (`begin tran`).
3. Don't do inserts, updates or deletes on tables.
1. Avoid the use of temporary tables.

### Layouts, Contexts, Processes

1. Templates should contain an IF statement.
1. Don't reset input parameter values.
1. Avoid the use of cursors.
1. Avoid the use of explicit transactions (`begin tran`).
1. Don't do inserts, updates or deletes on tables.
1. Avoid the use of temporary tables.
1. Don't send messages (using `tsf_send_message` or `raiserror`).

### Tasks and Subroutines (stored procedures)

1. Avoid the use of cursors.
1. Always use explicit transactions (`begin tran`, `commit tran`, `rollback tran`).
1. When using cursors, every iteration should be a new transaction.

### Subroutines (functions)

1. Avoid the use of cursors.
1. Avoid the use of explicit transactions (`begin tran`).
1. Don't do inserts, updates or deletes on tables.
1. Don't send messages (using `tsf_send_message` or `raiserror`).
