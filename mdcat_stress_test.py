import os
import csv
import json
import time
import pandas as pd
from typing import List, Literal, Optional
from pydantic import BaseModel, Field
import google.generativeai as genai

# --- CONFIGURATION ---
API_KEY = os.environ.get("GOOGLE_API_KEY", "AIzaSyDuHmCX-AMYjjA4DdUCPRYrvvLoUEgD9SQ")
genai.configure(api_key=API_KEY)

# --- DATA MODELS ---
class MCQ(BaseModel):
    question: str = Field(description="MDCAT-style question. Direct, conceptually focused, and avoids ambiguous wording.")
    option_a: str = Field(description="Option A")
    option_b: str = Field(description="Option B")
    option_c: str = Field(description="Option C")
    option_d: str = Field(description="Option D")
    correct_answer: Literal["A", "B", "C", "D"] = Field(description="Correct option letter.")
    explanation: str = Field(description="Brutally crisp explanation. Max 2 sentences. Must explain the 'Why' and clarify the most common 'Trap' students fall into.")
    reference: str = Field(description="Specific book reference (e.g., PTB Bio XI, Ch 11, P. 211).")
    difficulty: Literal["Easy", "Moderate", "Hard"] = Field(description="PMDC difficulty level.")
    topic: str = Field(description="Syllabus topic.")
    board: str = Field(description="Target board.")

class MCQBatch(BaseModel):
    mcqs: List[MCQ]

# --- THE FACTORY ---
class MDCATFactory:
    def __init__(self, model_name="models/gemini-flash-latest"):
        self.model = genai.GenerativeModel(model_name)

    def generate_stress_batch(self, subject: str, topic: str, board: str, count: int = 10) -> List[MCQ]:
        """
        STRESS TEST MODE: Forces the AI to identify the most common student mistakes 
        and build questions around those traps.
        """
        
        prompt = f"""
        Act as a Senior MDCAT Paper Setter with 20 years of experience. 
        Your goal is to set a 'Conceptual' batch of {count} MCQs for the PMDC 2025 exam.
        Subject: {subject} | Topic: {topic} | Board: {board}

        STRESS TEST REQUIREMENTS:
        1. THE TRAP: For every question, identify a common misconception or 'Typical MDCAT Trap'. Build the question and distractors to EXPOSE this trap.
        2. BRUTALLY HONEST EXPLANATIONS: No filler. 
           - Sentence 1: The core scientific fact.
           - Sentence 2: The 'Trap' warning.
        3. HIGH-YIELD DISTRACTORS: Options must be conceptually related and equally plausible.
        4. TEXTBOOK PRECISION: Use only {board} (PTB) values.

        Return response as JSON.
        """

        try:
            response = self.model.generate_content(
                prompt,
                generation_config={
                    "response_mime_type": "application/json",
                    "response_schema": MCQBatch
                }
            )
            return MCQBatch.model_validate_json(response.text).mcqs
        except Exception as e:
            print(f"Error during Stress Test: {e}")
            return []

if __name__ == "__main__":
    factory = MDCATFactory()
    
    SUBJECT = "Biology"
    TOPIC = "Bioenergetics"
    BOARD = "Punjab"
    
    print(f"🧪 INITIATING STRESS TEST: {TOPIC} (Punjab Board)...")
    print("🎯 Goal: Verify that questions target actual 'Student Traps' and use human-coach explanations.")
    
    stress_results = factory.generate_stress_batch(SUBJECT, TOPIC, BOARD, 5)
    
    if stress_results:
        for i, res in enumerate(stress_results):
            print(f"\n[STRESS-{i+1}] {res.question}")
            print(f"Options: A: {res.option_a} | B: {res.option_b} | C: {res.option_c} | D: {res.option_d}")
            print(f"Key: {res.correct_answer} | Difficulty: {res.difficulty}")
            print(f"💡 COACH: {res.explanation}")
            print(f"📚 REF: {res.reference}")
    else:
        print("❌ Stress test failed.")
