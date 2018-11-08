# Database Deletion

This section will help you if you want to start a brand new database from an existing database.
(you might need to turn SAFE UPDATE off)

1. MySql Workbench > Preferences > SQL EDITOR > (bottom of settings)
2. turn the SAFE UPDATE off
3. then log out of your connection and reconnect

## Steps to start new

1. Delete all data from tables

```
SELECT concat('DELETE FROM ',table_schema,'.',table_name,';')
FROM information_schema.table_constraints
WHERE table_schema='BovsiTime';
// This MySQL script will create a DELETE FROM script for each table in your database.
```

Copy the output of this and run it. You might need this line-by-line.

2. Delete all Foreign Keys from your tables

```
SELECT concat('alter table ',table_schema,'.',table_name,' DROP FOREIGN KEY ',constraint_name,';')
FROM information_schema.table_constraints
WHERE constraint_type='FOREIGN KEY'
AND table_schema='BovsiTime';
// This MySql script will create na ALTER TABLE _ DROP FOREIGN KEY script for each table in your database.
```

Copy the output of this and run it. You might need this line-by-line.

# Database Migrations

If you are having issues reverting migrations. Try using:

```
dotnet ef database update 0 -c AppDbContext
dotnet ef migrations remove -c AppDbContext

dotnet ef database update 0 -c AppIdentityDbContext
dotnet ef migrations remove -c AppIdentityDbContext
```

If that is the 1st migration (as the name implies) then you can use `dotnet ef database update 0` to revert(unapply) all migrations from the database. You should then be able to run `dotnet ef migrations remove`.

## Initial Migrations

```
dotnet ef migrations add Initial  -c AppDbContext
dotnet ef migrations add Initial  -c AppIdentityDbContext

dotnet ef database update -c AppDbContext
dotnet ef database update -c AppIdentityDbContext
```
