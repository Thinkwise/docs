---
title: SQL formatting guidelines
sidebar_label: 📖 SQL formatting
---

Well formatted code is easier to read and to maintain, resulting in a higher overall quality.
There are many good ways to format SQL code. This document provides some guidelines we use at Thinkwise to write legible and structured SQL code.

The guidelines are structured per statement. All guidelines are clarified with an example.

## General guidelines

- Use 4 spaces instead of tabs
- Indent using a multiple of 4 spaces
- Align opening and closing keywords (`begin` and `end`, `case` and `end`, etc.)
- Align closing parantheses `)` with the keyword of the opening parantheses (`and`, `datediff`, etc.)
- Do not use empty lines inside a statement

## SELECT

1. Left align the `select`, `from`, `where`, `order by`, `having` and `group by` keywords.
1. Place the select list under the `select` keyword and indented using 4 spaces.
1. Place commas in front of the column names
1. Provide an alias for all columns without a name (constants, functions, composite columns), using the `as` keyword
1. Provide an alias for all tables, consisting of the first letter of every subname, without using the `as` keyword.
   If this is not sufficient, add a number or choose another meaningfull alias.

### Example SELECT

```sql
select
    si.sales_invoice_id
    ,si.customer_id
    ,si.invoice_date
    ,getdate() as due_date
    ,si.amount_excl_vat
    ,si.amount_incl_vat
    ,1 as invoice_status
from sales_invoice si
```

## ORDER BY and GROUP BY

1. The *order by* or *group by* list is placed under the `order by` or `group by` keyword and indented using 4 spaces
1. Commas are placed in front of the column names

### Example ORDER BY

```sql
select
    si.sales_invoice_id
    ,si.customer_id
    ,si.invoice_date
    ,getdate() as due_date
    ,si.amount_excl_vat
    ,si.amount_incl_vat
    ,1 as invoice_status
from sales_invoice si
order by
    si.customer_id
    ,si.invoice_date
    ,si.invoice_status
```

### Example GROUP BY

```sql
select
    p.project_id
    ,h.date
    ,avg(h.number_of_hours) as avg_number_of_hours
from project p
join hour h
  on h.project_id  = p.project_id
group by
    p.project_id
    ,p.description
    ,h.date
```

## WHERE and HAVING

1. Place `and` keywords in front of the condition.
1. Right align the top level `and` keywords with the `where` or `having` keyword.
1. Place `or` keywords on a separate line, left aligned with the previous line.
1. Always use parentheses around `or` conditions.
1. Indent conditions inside parentheses using a multiple of 4 spaces.
1. Align the closing parentheses with the opening parentheses.
1. Align comparison operators (`=`, `<`, etc.) for conditions of the same level.

### Example WHERE

```sql
select
    si.sales_invoice_id
    ,si.customer_id
    ,si.invoice_date
    ,getdate() as due_date
    ,si.amount_excl_vat
    ,si.amount_incl_vat
    ,1 as invoice_status
from sales_invoice si
where si.invoice_date = '2019-1-1'
  and si.customer_id  = 15
  and (
    si.invoice_status  = 1
    or
    si.amount_excl_vat > 10.000
  )
```

### Example HAVING

```sql
select
    p.project_id
    ,h.date
    ,avg(h.number_of_hours) as avg_number_of_hours
    ,max(h.number_of_hours) as max_number_of_hours
from project p
join hour h
  on h.project_id  = p.project_id
group by
    p.project_id
    ,p.description
    ,h.date
having avg(h.number_of_hours) > 5
   and max(h.number_of_hours) < 12
```

## Calculated columns

1. Place calculations in column list on one line, unless the the line is too long.

### Example calculated column

```sql
select
    concat(e.last_name, ' ', e.first_name) as name
    ,e.email
from employee e
```

## CASE expressions

1. Align the `end` and the `case` keywords
1. Indent the `when` and `else` expressions using 4 spaces
1. Place the `then` expression on the same line as the `when`, unless the line is too long. Then place the `then` on the next line and indent using 4 spaces.

### Example simple CASE

```sql
select
    so.sales_order_id
    ,case so.order_status
        when 0 then 'not_approved'
        when 1 then 'approved'
        when 2 then 'sent'
        else 'delivered'
     end as order_status
    ,so.customer_id
from sales_order so
```

### Example searched CASE

```sql
select
    so.sales_order_id
    ,case
        when so.order_status = 0 or so.order_status is null
            then 'not_approved'
        when so.order_status = 1 then 'approved'
        when so.order_status = 2 then 'sent'
        else 'delivered'
     end as order_status
    ,so.customer_id
from sales_order so
```

## JOIN

1. Prevent the use of right joins
1. Don't use `inner` for inner joins or `outer` for left joins
1. Left align the `join`, `left join` or `cross join` keyword
1. Right align the `on` and `and` conditions with the `join` keyword
1. Align comparison operators (`=`, `<`, etc.) for join conditions
1. Place the columns of the joined table to the left of the comparison operator

### Example JOIN

```sql
select
    p.description
    ,sp.name
    ,h.number_of_hours
from project p
join sub_project sp
  on sp.project_id = p.project_id
join hour h
  on h.project_id     = sp.project_id
 and h.sub_project_id = sp.sub_project_id
```

### Example LEFT JOIN

```sql
select
    p.description
    ,sp.name
from project p
left join sub_project sp
  on sp.project_id = p.project_id
```

## UNION

1. Left align the `union` or `union all` keyword
1. Place empty lines before and after the `union` keyword
1. Add comments to describe the select statements

### Example UNION ALL

```sql
--Approved sales invoices
select
    si.sales_invoice_id
    ,'Approved' as status
from sales_invoice si
where si.invoice_status = 1 --Approved

union all

--Not approved sales invoices
select
    si.sales_invoice_id
    ,'Not Approved' as status
from sales_invoice si
where si.invoice_status = 0 --Not approved
```

## FUNCTIONS

1. Place function calls on a single line, unless the line is too long.
1. Indent the parameters relative to the function name, using a multiple of 4 spaces.
1. Left align the closing parentheses with the function name.

### Example FUNCTION

```sql
select
    si.sales_invoice_id
    ,si.invoice_date
    ,si.due_date
    ,datediff(day, si.invoice_date, si.due_date) as number_of_days
from sales_invoice si
```

### Example FUNCTION with many parameters

```sql
select
    si.sales_invoice_id
    ,si.invoice_date
    ,si.due_date
    ,datediff(
        day
        ,si.invoice_date
        ,si.due_date
     ) as number_of_days
    ,si.invoice_status
from sales_invoice si
```

## Subqueries

1. Consider using `APPLY` instead of a subqueries to improve readability. Use `OUTER APPLY` for INNER JOINS and `CROSS APPLY` for LEFT JOINS.
1. Indent subqueries relative to the opening parentheses in SELECT statements or to the `APPLY` keyword, using a multiple of 4 spaces.
1. Align the opening and closing parentheses in SELECT statements.

### Example subquery in SELECT

> Use OUTER APPLY instead

```sql
select
    p.project_id
    ,(
        select sum(h.number_of_hours)
        from hour h
        where h.project_id = p.project_id
     ) as number_of_hours
from project p
```

#### Alternative using OUTER APPLY

```sql
select
    p.project_id
    ,s.number_of_hours
from project p
outer apply (
        select sum(h.number_of_hours) as number_of_hours
        from hour h
        where h.project_id = p.project_id
    ) s
```

### Example subquery in FROM

> Use CROSS APPLY instead

```sql
select
    p.project_id
    ,h.number_of_hours
from project p
join (
        select
            h.project_id
            ,sum(h.number_of_hours) as number_of_hours
        from hour h
        group by h.project_id
    ) h
  on h.project_id = p.project_id
```

#### Alternative using CROSS APPLY

```sql
select
    p.project_id
    ,s.number_of_hours
from project p
cross apply (
        select sum(h.number_of_hours) as number_of_hours
        from hour h
        where h.project_id = p.project_id
    ) s
```

### Example subquery in WHERE

> Use CROSS or OUTER APPLY instead

```sql
select p.project_id           as project_id
from project p
where p.finished   = 0
  and 100         >= (
                         select sum(h.number_of_hours) as number_of_hours
                         from hour h
                         where h.project_id = p.project_id
                     )
```

#### Example using CROSS APPLY

```sql
select p.project_id           as project_id
from project p
cross apply (
        select sum(h.number_of_hours) as number_of_hours
        from hour h
        where h.project_id = p.project_id
    ) s
where p.finished   = 0
  and s.number_of_hours < 100
```

## IN and EXISTS

1. Use `IN` with constant values only and `EXISTS` with subqueries.
1. Indent subqueries relative to the `EXISTS` keyword, using a multiple of 4 spaces.

### Example EXISTS

```sql
select p.description
from project p
where exists (
        select 1
        from sub_project sp
        where sp.project_id = p.project_id
    )
```

### Example IN

```sql
select p.description
from project p
where p.status in (1, 2, 3) --new, open, closed
```

## INSERT

1. Don't use the `into` keyword.
1. Always use a column list.
1. Left align the closing parentheses with the `insert` keyword.
1. Ident the column list using 4 spaces.
1. Place commas in front of the column names.
1. Left align the `select` or `values` part with the `insert` keyword.

### Example

```sql
insert project (
    customer_id
    ,description
    ,planned_start_date
    ,planned_end_date
    ,actual_start_date
    ,finished
    ,finished_on_date
)
select
    p.customer_id
    ,p.description
    ,p.planned_start_date
    ,p.planned_end_date
    ,null as actual_start_date
    ,0 as finished
    ,null as finished_on_date
from project p
where p.project_id = 3
```

```sql
insert project (
    customer_id
    ,description
)
values (
    (1, 'project 1')
    ,(2, 'project 2')
    ,(3, 'project 3')
)
```

## UPDATE

1. Use a from-clause with joins instead of subqueries.
1. Always use the alias of the table to update in the `update` statement.
1. Left align the `set` keyword with the `update` keyword.
1. Indent the column list using 4 spaces.
1. Align the assignment operators `=` of the column list.

### Example

```sql
update sp
set sp.finished       = p.finished
    ,finished_on_date = p.finished_on_date
from sub_project sp
join project p
  on p.project_id = sp.project_id
where p.finished = 1
```

## DELETE

1. Use a from-clause with joins instead of subqueries.
1. Always use the alias of the table to delete from in the `delete` statement.

### Example

```sql
delete sp
from sub_project sp
join project p
  on p.project_id = sp.project_id
where p.finished = 1
```

## DECLARE variables

1. Place the DECLARE at the top of the code template.
1. Place the variable list under the `declare` keyword and indented using 4 spaces.
1. Place commas in front of the column names.
1. Left align the data types for all variables.

### Example DECLARE

```sql
declare
    @project_id       project_id
    ,@project_vrs_id  project_vrs_id
    ,@tab_id          tab_id
```

## IF and WHILE statements

1. Always use `BEGIN` and `END` in an IF or WHILE statement.
1. Left align the `IF`, `WHILE`, `BEGIN` and `END` keywords.
1. Don't use empty lines after the `BEGIN` and before the `END`. It is allowed to use empty lines between statements within `BEGIN` and `END`.
1. Place `and` keywords in front of the condition.
1. Left align top level `and` keywords with the first condition.
1. Place `or` keywords on a separate line, left aligned with the previous line.
1. Always use parentheses around `or` conditions.
1. Indent conditions inside parentheses using a multiple of 4 spaces.
1. Align the closing parentheses with the opening parentheses.
1. Align comparison operators (`=`, `<`, etc.) for conditions of the same level.

### Example IF

```sql
if @project_id         = 1
   and @project_vrs_id = 'DB'
   and (
        @project_status = 3
        or
        @project_status = 5
   )
begin
    set @project_vrs_id = 'DBA'
end
```

### Example IF with nested parentheses

```sql
if (
        (
            @project_id         = 1
            and @project_vrs_id = 'DB'
        )
        or
        @project_status = 3
   )
begin
    set @project_vrs_id = 'DBA'
end
```

### Example WHILE

```sql
while @status       = 3
      and @counter >= 1
begin
    set @counter = @counter + 1
end
```

## Table variables and temporary tables

1. Place the column list under the `select` keyword and indented using 4 spaces.
1. Place commas in front of the column names
1. Left align the data types for all variables.

### Example temporary table

```sql
create table #project (
    project_id   int
    ,description varchar(200)
)

drop table #project
```

### Example table variable

```sql
declare @project table (
    project_id   int
    ,description varchar(200)
)
```




## Common table expressions (CTEs)

1. Left align the `with`, `as` and `select`, `update` or `insert` keywords.
1. Place the column list under the `with` keyword and indented using 4 spaces.
1. Place commas in front of the column names

### Example

```sql
;with sales_invoice_vat (
    sales_invoice_id
    ,vat_percentage
)
as (
    select
        sales_invoice_id
        ,100 * ((amount_incl_vat - amount_excl_vat)/amount_excl_vat) as vat_percentage
    from sales_invoice
    where amount_excl_vat <> 0
)
select
    si.sales_invoice_id,
    siv.vat_percentage
from sales_invoice si
left join sales_invoice_vat siv
  on siv.sales_invoice_id = si.sales_invoice_id
```

## CURSOR

1. Place the cursor parameters on the same line as the `declare` keyword.
1. Left align the `declare` and `select` keywords
1. Place all variables on the same line as the `fetch` keyword.

### Example

```sql
declare
    @country_id    id
    ,@country_name name

declare countries cursor local static read_only forward_only for
select
    c.country_id
    ,c.name
from country c
order by c.name

open countries

fetch next from countries into @country_id, @country_name
while @@fetch_status = 0
begin
    print @country_name
    print @country_id

    fetch next from countries into @country_id, @country_name
end

close countries
deallocate countries
```

## Transactions

1. Left align the `begin tran`, `commit tran` and `rollback tran` keywords.
1. Left align the code within the transaction.
1. Don't name the transation unless there are nested transactions.

### Example

```sql
begin tran

insert project (
    customer_id
    ,description
    ,planned_start_date
    ,planned_end_date
    ,actual_start_date
    ,finished
    ,finished_on_date
)
select
    p.customer_id
    ,p.description
    ,p.planned_start_date
    ,p.planned_end_date
    ,null as actual_start_date
    ,0 as finished
    ,null as finished_on_date
from project p
where p.project_id = 3

commit tran
```

## TRY CATCH

1. Left align the `begin try`, `end try`, `begin catch` and `end catch` keywords.
1. Indent the code within the try and catch using 4 spaces.

### Example TRY CATCH with transaction

```sql
begin try
    begin tran

    insert project (
        customer_id
        ,description
        ,planned_start_date
        ,planned_end_date
        ,actual_start_date
        ,finished
        ,finished_on_date
    )
    select
        p.customer_id
        ,p.description
        ,p.planned_start_date
        ,p.planned_end_date
        ,null as actual_start_date
        ,0 as finished
        ,null as finished_on_date
    from project p
    where p.project_id = 3

    commit tran
end try
begin catch
    rollback tran

    throw
end catch
```

## Procedure calls

1. Place the parameters on the same line unless there are many parameters. Then place the parameters under the `exec` keyword and indented using 4 spaces.
2. Place commas in front of the parameters.
3. Align the `output` keywords.

### Example

```sql
exec task_kopieer_project @project_id
```

### Example with output parameters

```sql
exec task_kopieer_project
    @project_id
    ,@klant_id
    ,@datum
    ,@verwachte_kosten    output
    ,@verwachte_einddatum output
```

## Comments

1. Use `--` for single line comments and `/* ... */` for multiline comments.
   > To quickly comment or uncomment a block of code for debugging purposes, select the code and use your editors' shortcut.  
   > For SQL Server Management Studio and Azure Data Studio, this is `Ctrl+K,C` and `Ctrl+K,U`.
1. Only add comments for non-trivial statements.
1. Don't describe what code used to do or what has changed.
1. Don't leave commented-out code in templates.

### Example

```sql
/*
This is an example
of multiline comment
*/

-- Update today if it is different from the current date
if exists (
        select 1
        from settings i
        where i.today <> cast(getdate() as date)
   )
begin
    update settings
    set today = cast(getdate() as date)
end
```