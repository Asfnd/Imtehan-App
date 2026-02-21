-- Check existing quiz_attempts table structure
SELECT
    column_name,
    data_type,
    is_nullable
FROM
    information_schema.columns
WHERE
    table_name = 'quiz_attempts'
ORDER BY
    ordinal_position;
