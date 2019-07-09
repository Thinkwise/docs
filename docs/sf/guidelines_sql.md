---
title: SQL formatting guidelines
sidebar_label: 📖 Guidelines
---

Well formatted code is easier to read and to maintain, resulting in a higher overall quality.
There are many good ways to format SQL code, however. This document provides some guidelines we use at Thinkwise to write legible and structured SQL code.

The guidelines are structured per statement. All guidelines are clarified with an example.

## General

- Always use 4 spaces instead of tabs
- Always indent using a multiple of 4 spaces
- Always align opening and closing parentheses `(` and `)`

## SELECT

### Guidelines

1. Keywords (`select`, `from`, `where`, `order by`) are left aligned
1. The select list is placed under the `select` keyword and indented using 4 spaces
1. Commas are placed in front of column names
1. An alias is provided for all columns without a clear name (constants, functions, composite columns), using the `as` keyword
1. An alias is provided for all tables, consisting of the first letter of every subname, without using the `as` keyword.
   If this is not sufficient, add a number or choose another meaningfull alias.
1. Do not use empty lines inside a query

### Example

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

### Guidelines

1. The order by list is placed under the `order by` keyword and indented using 4 spaces
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

### Guidelines

1. The `and` keyword is right aligned with the `where` keyword
1. The `or` keyword is always placed on its own line, left aligned with the previous line
1. Always use parentheses around `or` conditions
1. Align the closing parentheses with the opening parentheses
1. Indent conditions inside parentheses using a multiple of 4 spaces
1. Align comparison operators (`=`, `<`, etc.) for conditions of the same level

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

## Composite columns

### Guidelines

1. Place calculations in the SELECT on one line, unless the the line is too long.

### Example

```sql
select
    concat(e.last_name, ' ', e.first_name) as name
    ,e.email
from employee e
```

## CASE expressions

### Guidelines

1. Align the `end` and the `case` keywords
1. Indent the `when` and `else` expressions using 4 spaces
1. Place the `then` expression on the same line as the `when`, unless the line is too long. Then place the `then` on the next line and indent using 4 spaces.

### Example Simple CASE

```sql
select
    so.sales_order_id
    ,case so.order_status
        when 0 then 'not_approved'
        when 1 then 'approved'
        when 2 then 'sent'
        else 'delivered'
    end as order_status
from sales_order so
```

### Example Searched CASE

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
from sales_order so
```

## JOIN

### Guidelines

1. Left align the `join`, `left join` and  keyword
1. Right align the `on` and `and` conditions with the `join` keyword
1. Align comparison operators (`=`, `<`, etc.) for join conditions
1. Place the columns of the joined table to the left of the comparison operator
1. Prevent the use of right joins
1. Don't use `inner` for inner joins or `outer` for left joins

### Example `join`

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

### Example `left join`

```sql
select
    p.description
    ,sp.name
from project p
left join sub_project sp
  on sp.project_id = p.project_id
```

## UNION (ALL)

### Guidelines

1. Left align the `union` keyword
1. Place empty lines before and after the `union` keyword
1. Add comments to describe the select statements

### Example

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

### Guidelines

1. Place function calls on a single line, unless the line is too long. Then place the parameters on a new line, indented with a multiple of 4 spaces.
1. Align the opening and closing parentheses

### Example FUNCTION with few parameters

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
from sales_invoice si
```

## Subqueries

### Guidelines

1. Consider using APPLY instead of a subqueries to improve readability  
   Use OUTER APPLY for INNER JOINS and CROSS APPLY for LEFT JOINS
1. Place subqueries inside parentheses and indent using a multiple of 4 spaces

### Example subquery in SELECT

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

### Alternative using OUTER APPLY

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

### Alternative using CROSS APPLY

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

## Subqueries with IN and EXISTS

### Guidelines

1. Use IN only with constant values, use EXISTS with subqueries
1. Place subqueries in EXIST or IN are placed between parentheses, on the next line and ident them 4 spaces.
2. Align the parentheses under each other.

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
select p.description  as description
from project p
where p.status in (1, 2, 3) --new, open, closed
```

## INSERT

### Guidelines

1. Use the insert statement without into.
2. Always use a column list
3. Align the columns in a column list under each other, comma's in front.
4. Align the parentheses of the column list left under INSERT.
5. Ident the column list 4 spaces
6. Align the query left under INSERT

### Example

```sql
insert into project
(
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

## UPDATE

### Guidelines

1. Use a FROM-clause. Give every table in the FROM an alias. In the UPDATE, update the alias.
2. Align UPDATE, SET, FROM, WHERE left under each other.
3. Place the columns in SET under each other, comma's in front.
4. Align the equal signs under each other.

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

### Guidelines

### Example

```sql
delete sp
from sub_project sp
     join project p
       on p.project_id = sp.project_id
where p.finished = 1
```

## Variables

### Guidelines

1. Place DECLARE to the left.
1. Place the first variable after the DECLARE.
1. Place the next variables on the next line, comma in front.
1. Place domains/datatypes after the variable, left aligned under each other.
1. Place the DECLARE at the top of the code template.

### Example

```sql
declare @project_id      project_id
       ,@project_vrs_id  project_vrs_id
```

## IF-statements

### Guidelines

1. Align IF, BEGIN, END left, under each other.
2. After BEGIN place an empty line.
3. Place before and after END an empty line.
4. Always use BEGIN and END in an IF-statement.
5. IF condition: Align the equal signs under each other.
6. Place AND at the end of the line, align ANDs left under each other.
7. Place OR on a new line. The next condition must also be on a new line. The entire OR clause must be placed between parentheses. Ident 4 spaces inside the parentheses.
8. Align parentheses left, under each other and always on a new line.
9. If parentheses are nested, ident them 4 spaces.

### Example 1, AND

```sql
if @project_id     = 1     and
   @project_vrs_id = 'DB'
begin

    set @project_vrs_id = 'DBA'

end
```

### Example 2, OR

```sql
if (
       @project_id     = 1
       or
       @project_vrs_id = 'DB'
   )
begin

    --comment
    set @project_vrs_id = 'DBA'

end
```

### Example 3, nested parentheses

```sql
if (
       (
           @project_id     = 1     and
           @project_vrs_id = 'DB'
       )
       or
       (
           @project_id     = 2     and
           @project_vrs_id = 'UP'
       )
   )
begin

    --My comment
    set @project_vrs_id = 'DBA'

end
```

## WHILE-Loops

### Guidelines

1. Align WHILE, BEGIN, END left, under each other.
2. After BEGIN place an empty line.
3. Place before and after END an empty line.
4. Always use BEGIN and END in an IF-statement.
5. WHILE condition: Align the equal signs under each other.
6. Place AND at the end of the line, align ANDs left under each other.
7. Place OR on a new line. The next condition must also be on a new line. The entire OR clause must be placed between parentheses. Ident 4 spaces inside the parentheses.
8. Parentheses are aligned left, under each other and always on a new line.
9. If parentheses are nested, ident them 4 spaces.

### Example

```sql
while @counter >= 1
begin

    set @counter = @counter + 1

end
```

## Temporary Table

### Guidelines

1. Align parentheses left, under each other.
2. Ident the column list 4 spaces.
3. Align (user defined) dataypes under each other.

### Example

```sql
create table #project
(
    project_id     int
   ,description    varchar(200)
)

drop table #project
```

## Table variable

### Guidelines

1. Place table after the variable.
2. Align parentheses under each other.
3. Ident the column list 4 spaces.
4. Align (user defined) dataypes under each other.

### Example

```sql
declare @project table (
                           project_id     int
                          ,description    varchar(200)
                       )
```

## Common table expressions (CTEs)

### Guidelines

1. Align WITH to the left.
2. Always use a column list between parentheses.
3. Align parentheses to the left. Ident the column list with 4 spaces.
4. Align AS to the left.
5. Ident the SELECT of the CTE four spaces.

### Example

```sql
--CTE layout
;with sales_invoices
(
    sales_invoice_id
   ,vat_percentage
)
as
(
    select sales_invoice_id                                             as sales_invoice_id
          ,100 * ((amount_incl_vat - amount_excl_vat)/amount_excl_vat)  as vat_percentage
    from sales_invoice
    where amount_excl_vat <> 0
)
select vat_percentage                                            as vat_percentage
      ,amount_excl_vat + (vat_percentage * amount_excl_vat/100)  as amount_incl_vat
from sales_invoice si
     left join sales_invoices sis
       on sis.sales_invoice_id = si.sales_invoice_id
```

## CURSOR

### Guidelines

1. Place the cursor parameters on the same line as the DECLARE.
2. Align SELECT left under the DECLARE.
3. Align OPEN left.
4. Align FETCH left.
5. In a fetch, place all column on the same line, unless there are too many parameters. In that case, place them under eachother.
6. Align CLOSE left.
7. Align DEALLOCATE left.

### Example

```sql
declare @country_id    id
       ,@country_name  name

declare countries cursor local static read_only forward_only for
select c.country_id
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

### Guidelines

1. Align BEGIN TRAN left.
2. Align COMMIT TRAN left.
3. Align ROLLBACK TRAN left.
4. Don't give the transaction a name, unless you need to work with nested transactions.
5. Align the code within the transaction to the left

### Example

```sql
begin tran

insert country
(
    name
)
values ('United States of America')

insert country
(
    name
)
values ('The Netherlands')

commit tran
```

## TRY CATCH

### Guidelines

1. Align BEGIN TRY to the left.
2. Align END TRY to the left.
3. Align BEGIN CATCH to the left.
4. Align END CATCH to the left.
5. Ident code 4 spaces.

### Example TRY CATCH

```sql
begin try

    insert country
    (
        name
    )
    values ('United States of America')

    insert country
    (
        name
    )
    values ('The Netherlands')

end try
begin catch

    declare @tsf_tran_error_message  nvarchar(4000)
    declare @tsf_tran_error_severity int
    declare @tsf_tran_error_state    int

    set @tsf_tran_error_message  = error_message()
    set @tsf_tran_error_severity = error_severity()
    set @tsf_tran_error_state    = error_state()

    raiserror(@tsf_tran_error_message, @tsf_tran_error_severity, @tsf_tran_error_state)

end catch
```

### Example TRY CATCH and BEGIN TRAN

```sql
begin try

    begin tran

    insert country
    (
        name
    )
    values ('United States of America')

    insert country
    (
        name
    )
    values ('The Netherlands')

    commit tran

end try
begin catch

    rollback tran

    declare @tsf_tran_error_message  nvarchar(4000)
    declare @tsf_tran_error_severity int
    declare @tsf_tran_error_state    int

    set @tsf_tran_error_message  = error_message()
    set @tsf_tran_error_severity = error_severity()
    set @tsf_tran_error_state    = error_state()

    raiserror(@tsf_tran_error_message, @tsf_tran_error_severity, @tsf_tran_error_state)

end catch
```

## Procedure call

### Guidelines

1. Place the first parameter after the procedure name
2. Place parameters under each other, comma in front
3. Place OUTPUT after the parameter, align OUTPUTs with each other

### Example

```sql
exec task_kopieer_project @project_id
                         ,@klant_id
                         ,@datum
                         ,@verwachte_kosten     output
                         ,@verwachte_einddatum  output
```

## Comments

### Guidelines

1. Create comments always with --, not /* and */. When you follow this guideline, you can use /* and */ for debugging purposes.
2. On top of a code template: Describe in comment what the code does.
3. Write comment for every statement.
4. Comments tell what the code does, not what it used to do or what has been changed.
5. Don’t leave old code in comments in your code.
6. IMPORTANT: Never use -- in expression fields and prefilters. Only use /* and */. -- will result in errors.

### Example

```sql
-----------------------------------------------------------------------------------------
-- In the settings table the field todays_date is set to the date of today
-----------------------------------------------------------------------------------------

--Is todays_date different from today?
if exists (
              select 1
              from settings i
              where i.todays_date <> cast(getdate() as date)
          )
begin

    --Set field todays_date to today's date
    update i
    set todays_date = cast(getdate() as date)
    from settings i

end
```