IF OBJECT_ID('dbo.mt_validation_context', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.mt_validation_context (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        transaction_no NVARCHAR(50) NOT NULL,
        selected_ctx_json NVARCHAR(MAX) NULL,
        message_type_code NVARCHAR(20) NULL,
        mt_text NVARCHAR(MAX) NULL,
        discrepancies_json NVARCHAR(MAX) NULL,
        is_network_valid BIT NULL,
        is_ai_valid BIT NULL,
        user_id INT NULL,
        cifno NVARCHAR(50) NULL,
        customer_name NVARCHAR(255) NULL,
        validation_prompt NVARCHAR(MAX) NULL,
        created_at DATETIME2 NOT NULL CONSTRAINT DF_mt_validation_context_created_at
            DEFAULT CONVERT(DATETIME2, SYSUTCDATETIME() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time')
    );
END
GO

IF COL_LENGTH('dbo.mt_validation_context', 'attrs_json') IS NOT NULL
BEGIN
    ALTER TABLE dbo.mt_validation_context DROP COLUMN attrs_json;
END
GO

IF OBJECT_ID('dbo.mt_validation_context', 'U') IS NOT NULL
BEGIN
    DECLARE @df_name SYSNAME;
    SELECT @df_name = dc.name
    FROM sys.default_constraints dc
    JOIN sys.columns c
      ON c.default_object_id = dc.object_id
    JOIN sys.tables t
      ON t.object_id = c.object_id
    WHERE t.name = 'mt_validation_context'
      AND SCHEMA_NAME(t.schema_id) = 'dbo'
      AND c.name = 'created_at';

    IF @df_name IS NOT NULL
    BEGIN
        DECLARE @sql NVARCHAR(MAX);
        SET @sql = N'ALTER TABLE dbo.mt_validation_context DROP CONSTRAINT ' + QUOTENAME(@df_name);
        EXEC sp_executesql @sql;
    END;

    ALTER TABLE dbo.mt_validation_context
    ADD CONSTRAINT DF_mt_validation_context_created_at
        DEFAULT CONVERT(DATETIME2, SYSUTCDATETIME() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time')
        FOR created_at;
END
GO

CREATE OR ALTER PROCEDURE dbo.sp_insert_mt_validation_context
    @transaction_no NVARCHAR(50),
    @selected_ctx_json NVARCHAR(MAX) = NULL,
    @message_type_code NVARCHAR(20) = NULL,
    @mt_text NVARCHAR(MAX) = NULL,
    @discrepancies_json NVARCHAR(MAX) = NULL,
    @is_network_valid BIT = NULL,
    @is_ai_valid BIT = NULL,
    @user_id INT = NULL,
    @cifno NVARCHAR(50) = NULL,
    @customer_name NVARCHAR(255) = NULL,
    @validation_prompt NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.mt_validation_context (
        transaction_no,
        selected_ctx_json,
        message_type_code,
        mt_text,
        discrepancies_json,
        is_network_valid,
        is_ai_valid,
        user_id,
        cifno,
        customer_name,
        validation_prompt,
        created_at
    )
    VALUES (
        @transaction_no,
        @selected_ctx_json,
        @message_type_code,
        @mt_text,
        @discrepancies_json,
        @is_network_valid,
        @is_ai_valid,
        @user_id,
        @cifno,
        @customer_name,
        @validation_prompt,
        CONVERT(DATETIME2, SYSUTCDATETIME() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time')
    );

    SELECT CAST(SCOPE_IDENTITY() AS BIGINT) AS id;
END
GO
