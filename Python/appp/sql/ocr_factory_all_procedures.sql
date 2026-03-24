USE universal;
GO
/* =========================================================
   1️⃣ CASE SEQUENCE (CASE ID GENERATION)
   ========================================================= */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_case_sequence' AND xtype='U')
BEGIN
    CREATE TABLE OF_case_sequence (
        product VARCHAR(50),
        seq_date CHAR(8),
        last_seq INT,
        CONSTRAINT PK_OF_case_sequence PRIMARY KEY (product, seq_date)
    );
END;
GO  
/* =========================================================  
    B DOCUMENT SEQUENCE (DOC ID GENERATION)   
   ========================================================== */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_document_sequence' AND xtype='U')BEGIN
    CREATE TABLE OF_document_sequence (
        case_id VARCHAR(100) PRIMARY KEY,
        last_seq INT
    );
END;
GO
/*case_id_generationSP*/
CREATE OR ALTER PROCEDURE sp_generate_case_id
    @product VARCHAR(50),
    @case_id VARCHAR(100) OUTPUT
AS
BEGIN
    DECLARE @today CHAR(8) = CONVERT(CHAR(8), GETDATE(), 112);
    DECLARE @next_seq INT;

    IF EXISTS (
        SELECT 1 FROM OF_case_sequence
        WHERE product = @product AND seq_date = @today
    )
    BEGIN
        UPDATE OF_case_sequence
        SET last_seq = last_seq + 1
        WHERE product = @product AND seq_date = @today;

        SELECT @next_seq = last_seq
        FROM OF_case_sequence
        WHERE product = @product AND seq_date = @today;
    END
    ELSE
    BEGIN
        INSERT INTO OF_case_sequence (product, seq_date, last_seq)
        VALUES (@product, @today, 1);
        SET @next_seq = 1;
    END

    SET @case_id = CONCAT(
        'CASE-', UPPER(@product), '-', @today, '-', FORMAT(@next_seq, '0000')
    );
END;
GO

/* =========================================================
   2️⃣ DOCUMENT JOB STATUS
   ========================================================= */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_document_job_status' AND xtype='U')
BEGIN
    CREATE TABLE OF_document_job_status (
        doc_id VARCHAR(100) PRIMARY KEY,
        case_id VARCHAR(100),
        file_path NVARCHAR(500),
        status NVARCHAR(30),
        error_message NVARCHAR(MAX),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_create_job
    @doc_id VARCHAR(100),
    @case_id VARCHAR(100),
    @file_path NVARCHAR(500)
AS
BEGIN
    INSERT INTO OF_document_job_status
        (doc_id, case_id, file_path, status)
    VALUES
        (@doc_id, @case_id, @file_path, 'QUEUED');
END;
GO

CREATE OR ALTER PROCEDURE sp_update_job_status
    @doc_id VARCHAR(100),
    @status NVARCHAR(30),
    @error_message NVARCHAR(MAX) = NULL
AS
BEGIN
    UPDATE OF_document_job_status
    SET status = @status,
        error_message = @error_message,
        updated_at = GETDATE()
    WHERE doc_id = @doc_id;
END;
GO

/* =========================================================
   3️⃣ DRAFT
   ========================================================= */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_draft' AND xtype='U')
BEGIN
    CREATE TABLE OF_draft (
        session_id VARCHAR(100),
        case_id VARCHAR(100),
        doc_id VARCHAR(100) PRIMARY KEY,
        document_name NVARCHAR(255),
        file_path NVARCHAR(500),
        processed_at DATETIME DEFAULT GETDATE(),
        doc_type VARCHAR(50)
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_create_draft
    @session_id VARCHAR(100),
    @case_id VARCHAR(100),
    @doc_id VARCHAR(100),
    @document_name NVARCHAR(255),
    @file_path NVARCHAR(500),
    @doc_type VARCHAR(50)
AS
BEGIN
    INSERT INTO OF_draft
        (session_id, case_id, doc_id, document_name, file_path,doc_type)
    VALUES
        (@session_id, @case_id, @doc_id, @document_name, @file_path,@doc_type);
END;
GO

/* =========================================================
   4️⃣ OCR
   ========================================================= */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_ocr' AND xtype='U')
BEGIN
    CREATE TABLE OF_ocr (
        case_id VARCHAR(100),
        doc_id VARCHAR(100),
        file_path NVARCHAR(500),
        page_no INT,
        extracted_text NVARCHAR(MAX),
        signature_stamp NVARCHAR(MAX),
        page_image VARBINARY(MAX),
        CONSTRAINT PK_OF_ocr PRIMARY KEY (doc_id, page_no)
    );
END;
GO

IF COL_LENGTH('OF_ocr', 'page_image') IS NULL
BEGIN
    ALTER TABLE OF_ocr ADD page_image VARBINARY(MAX) NULL;
END;
GO

CREATE OR ALTER PROCEDURE sp_insert_ocr_page
    @case_id VARCHAR(100),
    @doc_id VARCHAR(100),
    @file_path NVARCHAR(500),
    @page_no INT,
    @extracted_text NVARCHAR(MAX),
    @signature_stamp NVARCHAR(MAX),
    @page_image VARBINARY(MAX) = NULL
AS
BEGIN
    INSERT INTO OF_ocr
        (case_id, doc_id, file_path, page_no, extracted_text, signature_stamp, page_image)
    VALUES
        (@case_id, @doc_id, @file_path, @page_no, @extracted_text, @signature_stamp, @page_image);
END;
GO

/* =========================================================
   5️⃣ CLASSIFICATION
   ========================================================= */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_classification' AND xtype='U')
BEGIN
    CREATE TABLE OF_classification (
        case_id VARCHAR(100),
        doc_id VARCHAR(100),
        file_path NVARCHAR(500),
        page_no INT,
        classified_code VARCHAR(50),
        classified_name NVARCHAR(255),
        extracted_text NVARCHAR(MAX),
        is_external BIT,
        CONSTRAINT PK_OF_classification PRIMARY KEY (doc_id, page_no)
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_insert_classification
    @case_id VARCHAR(100),
    @doc_id VARCHAR(100),
    @file_path NVARCHAR(500),
    @page_no INT,
    @code VARCHAR(50),
    @name NVARCHAR(255),
    @text NVARCHAR(MAX),
    @is_external BIT
AS
BEGIN
    INSERT INTO OF_classification
        (case_id, doc_id, file_path, page_no,
         classified_code, classified_name, extracted_text, is_external)
    VALUES
        (@case_id, @doc_id, @file_path, @page_no,
         @code, @name, @text, @is_external);
END;
GO

/* =========================================================
   6️⃣ FINAL OCR
   ========================================================= */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_final_ocr' AND xtype='U')
BEGIN
    CREATE TABLE OF_final_ocr (
        case_id VARCHAR(100),
        doc_id VARCHAR(100) PRIMARY KEY,
        file_path NVARCHAR(500),
        whole_text NVARCHAR(MAX),
        documents_json NVARCHAR(MAX),
        processed_at DATETIME DEFAULT GETDATE()
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_insert_final_ocr
    @case_id VARCHAR(100),
    @doc_id VARCHAR(100),
    @file_path NVARCHAR(500),
    @whole_text NVARCHAR(MAX),
    @documents_json NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO OF_final_ocr
        (case_id, doc_id, file_path, whole_text, documents_json)
    VALUES
        (@case_id, @doc_id, @file_path, @whole_text, @documents_json);
END;
GO

/* =========================================================
   7️⃣ DOCUMENT SUMMARY
   ========================================================= */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_document_summary' AND xtype='U')
BEGIN
    CREATE TABLE OF_document_summary (
        case_id VARCHAR(100),
        doc_id VARCHAR(100) PRIMARY KEY,
        file_path NVARCHAR(500),
        document_name NVARCHAR(255),
        product NVARCHAR(50),
        document_list NVARCHAR(500),
        documents_json NVARCHAR(MAX),
        required_documents_json NVARCHAR(MAX),
        missing_documents_json NVARCHAR(MAX),
        required_block NVARCHAR(MAX),
        created_at DATETIME DEFAULT GETDATE(),
        approved_version INT,
        approved_by VARCHAR(MAX),
        doc_type VARCHAR(50)
    );
END;
GO


CREATE OR ALTER PROCEDURE [dbo].[sp_insert_document_summary]
    @case_id VARCHAR(100),
    @doc_id VARCHAR(100),
    @file_path NVARCHAR(500),
    @document_name NVARCHAR(255),
    @product NVARCHAR(50),
    @document_list NVARCHAR(500),
    @documents_json NVARCHAR(MAX),
    @required_documents_json NVARCHAR(MAX),
    @missing_documents_json NVARCHAR(MAX),
    @required_block NVARCHAR(MAX),
    @approved_version INT,
    @approved_by VARCHAR(MAX),
    @doc_type VARCHAR(50)
AS
BEGIN
    INSERT INTO OF_document_summary
        (case_id, doc_id, file_path, document_name,
         product, document_list, documents_json,
         required_documents_json, missing_documents_json, required_block,
         approved_version,approved_by,doc_type)
    VALUES
        (@case_id, @doc_id, @file_path, @document_name,
         @product, @document_list, @documents_json,
         @required_documents_json, @missing_documents_json, @required_block,
         @approved_version,@approved_by,@doc_type);
END;
GO




/* =========================================================
   8️⃣ AUDIT LOG
   ========================================================= */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_audit_log' AND xtype='U')
BEGIN
    CREATE TABLE OF_audit_log (
        id INT IDENTITY PRIMARY KEY,
        case_id VARCHAR(100),
        doc_id VARCHAR(100),
        action NVARCHAR(100),
        message NVARCHAR(MAX),
        source NVARCHAR(50),
        created_at DATETIME DEFAULT GETDATE()
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_write_audit_log
    @case_id VARCHAR(100),
    @doc_id VARCHAR(100),
    @action NVARCHAR(100),
    @message NVARCHAR(MAX),
    @source NVARCHAR(50)
AS
BEGIN
    INSERT INTO OF_audit_log
        (case_id, doc_id, action, message, source)
    VALUES
        (@case_id, @doc_id, @action, @message, @source);
END;
GO

/* =========================================================
   9️⃣ ERROR LOG
   ========================================================= */
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OF_error_log' AND xtype='U')
BEGIN
    CREATE TABLE OF_error_log (
        id INT IDENTITY PRIMARY KEY,
        case_id VARCHAR(100),
        doc_id VARCHAR(100),
        step NVARCHAR(100),
        error_message NVARCHAR(MAX),
        stack_trace NVARCHAR(MAX),
        created_at DATETIME DEFAULT GETDATE()
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_write_error_log
    @case_id VARCHAR(100),
    @doc_id VARCHAR(100),
    @step NVARCHAR(100),
    @error_message NVARCHAR(MAX),
    @stack_trace NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO OF_error_log
        (case_id, doc_id, step, error_message, stack_trace)
    VALUES
        (@case_id, @doc_id, @step, @error_message, @stack_trace);
END;
GO


/* =========================================================
   🔟 Customer tabe
   ========================================================= */

CREATE OR ALTER PROCEDURE sp_insert_customer
    @sessionId NVARCHAR(50),
    @cifno NVARCHAR(50),
    @customer_ID NVARCHAR(50),
    @customer_name NVARCHAR(255),
    @accountName NVARCHAR(255),
    @customer_type NVARCHAR(100),
    @lc_number NVARCHAR(50),
    @instrument NVARCHAR(100),
    @lifecycle NVARCHAR(255),
    @createdAt DATETIME,
    @updatedAt DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO OF_Customer_details (
        sessionId,
        cifno,
        customer_ID,
        customer_name,
        accountName,
        customer_type,
        lc_number,
        instrument,
        lifecycle,
        createdAt,
        updatedAt
    )
    VALUES (
        @sessionId,
        @cifno,
        @customer_ID,
        @customer_name,
        @accountName,
        @customer_type,
        @lc_number,
        @instrument,
        @lifecycle,
        @createdAt,
        @updatedAt
    );
END;
GO


/* =========================================================
   1️⃣1️⃣ Magic box table
   ========================================================= */

   CREATE OR ALTER PROCEDURE sp_insert_magic_box
    @case_id NVARCHAR(50),
    @doc_id NVARCHAR(50),
    @file_path NVARCHAR(MAX),
    @document_name NVARCHAR(255),
    @product NVARCHAR(100),
    @document_list NVARCHAR(100),
    @documents_json NVARCHAR(MAX),
    @required_documents_json NVARCHAR(MAX) = NULL,
    @missing_documents_json NVARCHAR(MAX) = NULL,
    @required_block NVARCHAR(MAX) = NULL,
    @approved_version INT = NULL,
    @approved_by NVARCHAR(100) = NULL,
    @approved_at DATETIME = NULL,
    @created_at DATETIME = NULL,
    @sessionId NVARCHAR(50),
    @cifno NVARCHAR(50),
    @customer_ID NVARCHAR(50),
    @customer_name NVARCHAR(255),
    @accountName NVARCHAR(255),
    @customer_type NVARCHAR(100),
    @lc_number NVARCHAR(50),
    @instrument NVARCHAR(100),
    @lifecycle NVARCHAR(100),
    @doc_type NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO magic_box
    (
        case_id,
        doc_id,
        file_path,
        document_name,
        product,
        document_list,
        documents_json,
        required_documents_json,
        missing_documents_json,
        required_block,
        approved_version,
        approved_by,
        approved_at,
        created_at,
        sessionId,
        cifno,
        customer_ID,
        customer_name,
        accountName,
        customer_type,
        lc_number,
        instrument,
        lifecycle,
        doc_type
    )
    VALUES
    (
        @case_id,
        @doc_id,
        @file_path,
        @document_name,
        @product,
        @document_list,
        @documents_json,
        @required_documents_json,
        @missing_documents_json,
        @required_block,
        @approved_version,
        @approved_by,
        @approved_at,
        ISNULL(@created_at, GETDATE()),
        @sessionId,
        @cifno,
        @customer_ID,
        @customer_name,
        @accountName,
        @customer_type,
        @lc_number,
        @instrument,
        @lifecycle,
        @doc_type
    );

    SELECT SCOPE_IDENTITY() AS inserted_id;
END;
GO  

/* =========================================================
   7.1 Add missing columns if table already exists
   ========================================================= */
IF COL_LENGTH('OF_document_summary', 'required_documents_json') IS NULL
    ALTER TABLE OF_document_summary ADD required_documents_json NVARCHAR(MAX);
IF COL_LENGTH('OF_document_summary', 'missing_documents_json') IS NULL
    ALTER TABLE OF_document_summary ADD missing_documents_json NVARCHAR(MAX);
IF COL_LENGTH('OF_document_summary', 'required_block') IS NULL
    ALTER TABLE OF_document_summary ADD required_block NVARCHAR(MAX);
GO

IF COL_LENGTH('magic_box', 'required_documents_json') IS NULL
    ALTER TABLE magic_box ADD required_documents_json NVARCHAR(MAX);
IF COL_LENGTH('magic_box', 'missing_documents_json') IS NULL
    ALTER TABLE magic_box ADD missing_documents_json NVARCHAR(MAX);
IF COL_LENGTH('magic_box', 'required_block') IS NULL
    ALTER TABLE magic_box ADD required_block NVARCHAR(MAX);
GO
