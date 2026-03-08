# Complete Test Coverage with Current Extraction

## What We Have

### 11 Subjects × 3 Types = 67,347 Total MCQs

| Subject | Practice | Most Important | Most Repeated | **Total** |
|---------|----------|----------------|---------------|-----------|
| Everyday Science | 9,137 | 4,570 | 2,385 | **16,092** |
| General Knowledge | 8,322 | 4,162 | 2,035 | **14,519** |
| Pakistan Studies | 6,854 | 3,427 | 1,705 | **11,986** |
| Islamiat | 3,504 | 1,750 | 34 | **5,288** |
| Basic Computer | 3,099 | 1,549 | 763 | **5,411** |
| General Math | 2,785 | 469 | 251 | **3,505** |
| English | 1,985 | 989 | 81 | **3,055** |
| Urdu | 1,262 | 627 | 375 | **2,264** |
| Geography | 1,098 | 550 | 363 | **2,011** |
| Ethics & Civics | 983 | 486 | 258 | **1,727** |
| Current Affairs | 850 | 425 | 214 | **1,489** |

---

## What We Can Launch: 15 Complete Tests

### TIER 1: National Level (1 test)
1. **CSS Model Paper Test** (200 MCQs, 200 min)
   - Pakistan Affairs, Current Affairs, Geography, Islamic Studies, Everyday Science, Mathematics, English, General Knowledge

### TIER 2: Provincial Management (3 tests)
2. **PMS Punjab Screening** (100 MCQs, 90 min, -0.25 marking)
3. **PMS Sindh Screening** (100 MCQs, 90 min, -0.25 marking)
4. **PMS KPK Screening** (100 MCQs, 90 min, -0.25 marking)

### TIER 3: PPSC Punjab (6 tests)
5. **PPSC Junior Clerk** (100 MCQs, 90 min)
6. **PPSC Senior Clerk** (100 MCQs, 90 min)
7. **PPSC Data Entry Operator** (100 MCQs, 90 min)
8. **PPSC Computer Operator** (100 MCQs, 90 min)
9. **PPSC Tehsildar** (100 MCQs, 90 min)
10. **PPSC Naib Tehsildar** (100 MCQs, 90 min)

### TIER 4: Federal Public Service (1 test)
11. **FPSC General Recruitment** (100 MCQs, 90 min)

### TIER 5: ETEA KPK (1 test)
12. **ETEA Primary School Teacher** (100 MCQs, 90 min)

### TIER 6: Provincial PSCs (3 tests)
13. **KPPSC General Posts** (100 MCQs, 90 min)
14. **SPSC Sindh General Posts** (100 MCQs, 90 min)
15. **BPSC Balochistan General Posts** (100 MCQs, 90 min)

---

## Feature Implementation

### For Each Test User Gets:

#### 1. Exam Dashboard
- View all subjects for that exam
- Quick mock test button
- Progress tracking

#### 2. For Each Subject, 3 Modes:

**Mode A: Practice (Past Papers)**
- Source: `type='practice'` from database
- Example: Pakistan Studies has 6,854 practice MCQs
- Organization: Sets of 20 (343 sets total)
- Free: First 10 sets (200 MCQs)
- Premium: All sets

**Mode B: Most Important**
- Source: `type='most_important'` from database
- Example: Pakistan Studies has 3,427 important MCQs
- Organization: Sets of 20 (172 sets total)
- Free: First 5 sets (100 MCQs)
- Premium: All sets

**Mode C: Most Repeated**
- Source: `type='most_repeated'` from database
- Example: Pakistan Studies has 1,705 repeated MCQs
- Organization: Sets of 20 (86 sets total)
- Free: First 3 sets (60 MCQs)
- Premium: All sets

#### 3. Mock Tests
- Full exam simulation
- Exact test pattern (MCQs, timing, sections)
- Negative marking where applicable
- Mix from all 3 modes (40% important + 40% practice + 20% repeated)
- Free: 1 mock test
- Premium: 5 mock tests
- Pro: Unlimited

---

## URL Structure (Dynamic Routes)

### 6 Page Files Handle Everything:

```
/                                           ← Home (15 tests)
/exam/css-mpt                              ← CSS dashboard
/exam/css-mpt/pakistan-affairs             ← Subject modes
/exam/css-mpt/pakistan-affairs/practice    ← Practice sets
/exam/css-mpt/pakistan-affairs/practice/set/1  ← MCQ practice
/mock/css-mpt                              ← Mock test
```

**Same structure works for all 15 tests**

---

## Database Structure

### 11 Tables (one per subject):
- pakistan_studies
- general_knowledge
- everyday_science
- current_affairs
- basic_computer
- general_math
- english
- urdu
- islamiat
- geography
- ethics_civics

### Each table has:
```sql
- id
- question_number
- question
- option_a, option_b, option_c, option_d
- correct_answer (A/B/C/D)
- type (practice/most_important/most_repeated)
```

---

## Implementation Steps

### Step 1: Database Setup
1. Create Supabase project
2. Run `schema.sql` to create 11 tables
3. Run `python import.py` to upload all CSVs
4. Verify: All 67,347 MCQs uploaded

### Step 2: Next.js App
1. Install dependencies
2. Add `lib/exam-configs.ts` (already created)
3. Build 6 page files with dynamic routes
4. Connect to Supabase

### Step 3: Launch
- Deploy to Vercel
- 15 tests live
- 67K+ MCQs available
- 4 practice modes per subject

---

## Target Market Size

| Test Category | Annual Applicants | Our Coverage |
|---------------|-------------------|--------------|
| CSS | 35,000 | ✅ 100% |
| PMS (all 3) | 50,000 | ✅ 100% |
| PPSC (all 6) | 200,000+ | ✅ 100% |
| FPSC | 60,000 | ✅ 100% |
| ETEA | 30,000 | ✅ 100% |
| Provincial PSCs | 100,000 | ✅ 100% |
| **TOTAL** | **475,000+** | **✅ Full Coverage** |

---

## Monetization

### Free Tier (Per Exam):
- 200 practice MCQs (10 sets)
- 100 most important MCQs (5 sets)
- 60 most repeated MCQs (3 sets)
- 1 mock test
- **Total: ~360 MCQs per exam**

### Premium (₨399/month):
- Unlimited practice sets
- All most important MCQs
- All most repeated MCQs
- 5 mock tests per exam
- **Total: All 67K MCQs**

### Pro (₨799/month):
- Everything in Premium
- Unlimited mock tests
- Performance analytics (future)
- AI explanations (future)

---

## What We're NOT Covering (Yet)

### Tests We CANNOT Launch:
- ❌ MDCAT (need Bio, Chem, Physics - medical level)
- ❌ NUST NET (need advanced Math, Physics, Chemistry)
- ❌ NTS GAT (70% coverage, missing Analytical Reasoning)
- ❌ Banking (85% coverage, missing Banking/Finance)
- ❌ Army/Navy/PAF (80% coverage, missing Verbal/Non-verbal Reasoning)

### Future Phase (Week 4+):
Add these via AI MCQ generation:
- Banking & Finance (2K MCQs)
- Analytical Reasoning (2K MCQs)
- Verbal/Non-verbal Reasoning (3K MCQs)
- Medical subjects for MDCAT (18K MCQs)

---

## Next Steps

✅ **TODAY**: Run schema.sql in Supabase
✅ **TODAY**: Run import.py to upload CSVs
✅ **TOMORROW**: Build Next.js pages
✅ **WEEK 1**: Complete app with 15 tests
✅ **WEEK 2**: Launch and market to 475K+ aspirants

**Current extraction = 15 solid tests ready to launch NOW**
