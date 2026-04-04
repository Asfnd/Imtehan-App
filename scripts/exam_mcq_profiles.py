"""
Syllabus slices and prompt DNA for scripts/exam_mcq_factory.py.

MCQ types align with the app / Supabase: most_repeated, most_important, practice
(see lib/exam-mock-specs.ts and scripts/import-mcqs-to-supabase.ts).
"""

from __future__ import annotations

# ── CSS / PPSC-style compulsory subjects (topic buckets for topic-wise generation) ──
CSS_PPSC_SUBJECT_TOPICS: dict[str, list[str]] = {
    "English": [
        "Parts of speech",
        "Tenses and agreement",
        "Prepositions and conjunctions",
        "Vocabulary in context",
        "Synonyms and antonyms",
        "Sentence correction",
        "Analogies",
        "Reading comprehension strategy",
    ],
    "Pakistan_Studies": [
        "Constitution of 1973",
        "Parliamentary system and amendments",
        "Freedom movement (1857–1947)",
        "Post-independence leaders and events",
        "Provinces and administrative structure",
        "Foreign policy and neighbours",
        "Natural resources and economy",
        "Culture and demographics",
    ],
    "General_Knowledge": [
        "World geography landmarks",
        "International organisations",
        "Awards and recognitions",
        "Sports and major events",
        "Books and authors",
        "Inventions and discoveries",
        "Basic astronomy and space",
        "Famous personalities",
    ],
    "Everyday_Science": [
        "Human body systems",
        "Nutrition and health",
        "Light, sound, and waves",
        "Heat and energy",
        "Electricity and magnetism basics",
        "Chemistry in daily life",
        "Ecology and environment",
        "Scientific method and measurements",
    ],
    "Current_Affairs": [
        "National headlines and policy",
        "International relations",
        "Economy and development projects",
        "Climate and summits",
        "Appointments and elections",
    ],
    "Islamiat": [
        "Quranic themes and surahs",
        "Hadith and seerah",
        "Pillars and ibadat",
        "Islamic history (Khulafa Rashidin onward)",
        "Ethics and social teachings",
    ],
    "Urdu": [
        "Grammar (صرف و نحو)",
        "ادبی اصطلاحات",
        "مشہور شعرا اور ان کی خصوصیات",
        "نثر اور نثری اصناف",
        "محاورے اور ضرب الامثال",
    ],
    "Basic_Computer": [
        "Hardware and software",
        "OS and file systems",
        "MS Office concepts",
        "Internet, email, and security",
        "Databases and networking basics",
        "Programming logic (not code-heavy)",
    ],
    "Geography": [
        "Physical geography",
        "Pakistan geography",
        "World capitals and rivers",
        "Climate and vegetation",
        "Maps and projections",
    ],
    "Ethics_Civics": [
        "Ethical theories and civic virtue",
        "Human rights and duties",
        "Governance and accountability",
        "Social justice themes",
    ],
    "General_Math": [
        "Arithmetic and percentages",
        "Ratios and proportions",
        "Algebraic simplification",
        "Geometry basics",
        "Data interpretation",
    ],
}

# ── Engineering entrance (topic list mirrors engineering_factory.py) ──
# Used only for discovery / prompts; full list stays in engineering_factory.SYLLABUS

ENGINEERING_STYLE_CYCLE = ["NET", "ECAT", "GIKI_PIEAS", "LUMS_SAT"]

# ── Prompt modifiers: what “type” means pedagogically (feeds the model, not stored as law) ──
MCQ_TYPE_BRIEF: dict[str, str] = {
    "most_repeated": (
        "Emulate questions that RECUR across real PPSC/FPSC/CSS-style MCQ banks: "
        "familiar fact patterns, classic distractors, and wording students see year after year. "
        "Do NOT copy any real question verbatim; capture the pattern and difficulty only."
    ),
    "most_important": (
        "Target HIGH-YIELD facts and concepts that shortlists and toppers prioritize: "
        "frequently examined definitions, dates, articles, formulas, and exceptions. "
        "One clear best answer; distractors must be plausible to a prepared candidate."
    ),
    "practice": (
        "Balanced TOPIC COVERAGE for drilling: mix recall, short application, and one harder synthesis item. "
        "Match the breadth of the stated topic/subtopic."
    ),
    "past_paper_pattern": (
        "Match STEM LENGTH, register, and trap style of official past papers for this exam family "
        "(scenario lead-in → four parallel options). No plagiarism of published items."
    ),
    "topic_wise": (
        "Strictly stay inside the named topic/subtopic; vary sub-skill (recall, apply, compare) "
        "so the batch still feels like a diagnostic worksheet."
    ),
}
