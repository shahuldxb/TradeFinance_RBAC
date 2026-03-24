SELECT_PENDING_DISCREPANCIES_SQL = """
SELECT TOP (1000)
    [id],
    [transaction_no],
    [cifno],
    [lc_number],
    [UserID],
    [Own_Standards_discrepancy],
    [Cross_Document_Validation_discrepancy],
    [Multihop_Discrepancy],
    [Status],
    [Model],
    [created_at],
    [updated_at],
    [main_document],
    [sub_document]
FROM [TF_genie].[dbo].[tool_Whole_discrepancy]
WHERE [Status] = ?
ORDER BY [id] DESC;
"""

UPDATE_DISCREPANCY_STATUS_SQL = """
UPDATE [TF_genie].[dbo].[tool_Whole_discrepancy]
SET [Status] = ?, [updated_at] = GETDATE()
WHERE [id] = ?;
"""
