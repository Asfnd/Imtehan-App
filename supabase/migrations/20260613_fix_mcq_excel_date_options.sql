-- Fix Excel serial numbers and DD-Mon-YY strings stored as MCQ options.
-- See migration fix_mcq_excel_date_options applied via Supabase MCP.

CREATE OR REPLACE FUNCTION public.mcq_row_is_date_context(
  question text,
  explanation text,
  option_a text,
  option_b text,
  option_c text,
  option_d text
) RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT
    COALESCE(question, '') ~* '(when|what day|what date|on which date|year did|year was|born|died|held|observed|started|announced|independence|session|conference|launch|resign|celebrate|emerge|passed away|gain|arrive| elected|officially|emerged|inaugurat|partition|movement|midnight)'
    OR COALESCE(explanation, '') ~* '(January|February|March|April|May|June|July|August|September|October|November|December|[0-9]{1,2} (January|February|March|April|May|June|July|August|September|October|November|December))'
    OR COALESCE(option_a, '') ~ '^[0-9]{1,2}-[A-Za-z]{3}-[0-9]{2}$'
    OR COALESCE(option_b, '') ~ '^[0-9]{1,2}-[A-Za-z]{3}-[0-9]{2}$'
    OR COALESCE(option_c, '') ~ '^[0-9]{1,2}-[A-Za-z]{3}-[0-9]{2}$'
    OR COALESCE(option_d, '') ~ '^[0-9]{1,2}-[A-Za-z]{3}-[0-9]{2}$'
    OR (
      (
        CASE WHEN COALESCE(option_a, '') ~ '^[0-9]{5}$' AND option_a::int BETWEEN 10001 AND 24999 AND option_a::int % 1000 <> 0 THEN 1 ELSE 0 END +
        CASE WHEN COALESCE(option_b, '') ~ '^[0-9]{5}$' AND option_b::int BETWEEN 10001 AND 24999 AND option_b::int % 1000 <> 0 THEN 1 ELSE 0 END +
        CASE WHEN COALESCE(option_c, '') ~ '^[0-9]{5}$' AND option_c::int BETWEEN 10001 AND 24999 AND option_c::int % 1000 <> 0 THEN 1 ELSE 0 END +
        CASE WHEN COALESCE(option_d, '') ~ '^[0-9]{5}$' AND option_d::int BETWEEN 10001 AND 24999 AND option_d::int % 1000 <> 0 THEN 1 ELSE 0 END
      ) >= 2
      AND NOT COALESCE(question, '') ~* '(km|kilomet|population|long|rate|ushr|percent|amount|how many|number of|members|seats|million|billion|wall)'
    );
$$;

CREATE OR REPLACE FUNCTION public.format_mcq_option(
  val text,
  is_date_context boolean
) RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  n int;
  d date;
  parsed date;
  day_part text;
  mon_part text;
  yr_part text;
  yr int;
BEGIN
  IF val IS NULL OR btrim(val) = '' THEN
    RETURN val;
  END IF;

  IF val ~ '^[0-9]{1,2}-[A-Za-z]{3}-[0-9]{2,4}$' THEN
    BEGIN
      day_part := split_part(val, '-',  1);
      mon_part := split_part(val, '-', 2);
      yr_part := split_part(val, '-', 3);
      IF length(yr_part) = 2 THEN
        yr := 1900 + yr_part::int;
      ELSE
        yr := yr_part::int;
      END IF;
      parsed := to_date(day_part || '-' || mon_part || '-' || yr::text, 'DD-Mon-YYYY');
      RETURN to_char(parsed, 'FMDD FMMonth YYYY');
    EXCEPTION WHEN OTHERS THEN
      RETURN val;
    END;
  END IF;

  IF is_date_context AND val ~ '^[0-9]{5}$' THEN
    n := val::int;
    IF n BETWEEN 10001 AND 24999 AND n % 1000 <> 0 THEN
      d := '1900-01-01'::date + (n - 2);
      IF d >= DATE '1900-01-01' AND d <= DATE '2030-12-31' THEN
        RETURN to_char(d, 'FMDD FMMonth YYYY');
      END IF;
    END IF;
  END IF;

  RETURN val;
END;
$$;
