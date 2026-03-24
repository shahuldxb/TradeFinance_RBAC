"""
Test script to verify all components work correctly
"""
import os
from dotenv import load_dotenv
from logger import AuditLogger
from matcher import MatchingEngine

# Load environment variables
load_dotenv()

print("=" * 60)
print("GOODS MATCHING SYSTEM - COMPONENT TEST")
print("=" * 60)
print()

# Test 1: Logger
print("Test 1: Logger Module")
print("-" * 60)
try:
    logger = AuditLogger()
    logger.log_activity("Test", "Component test started")
    logger.log_sql("SELECT * FROM test", result_count=10)
    logger.log_error("Test Error", "This is a test error")
    print("✓ Logger module working correctly")
    print(f"  Log file: {logger.log_file}")
except Exception as e:
    print(f"✗ Logger module failed: {e}")
print()

# Test 2: Matching Engine
print("Test 2: Matching Engine")
print("-" * 60)
try:
    matcher = MatchingEngine()
    
    # Test each technique
    text1 = "Aluminum tubes for industrial use"
    text2 = "aluminum tubes for industrial applications"
    
    print(f"Input 1: {text1}")
    print(f"Input 2: {text2}")
    print()
    
    # Test technique 1
    match, score, exp = matcher.technique_1_exact_match(text1, text2)
    print(f"  Technique 1 (Exact Match): Score={score}%, Match={match}")
    print(f"    Explanation: {exp}")
    
    # Test technique 2
    match, score, exp = matcher.technique_2_case_insensitive(text1, text2)
    print(f"  Technique 2 (Case-Insensitive): Score={score}%, Match={match}")
    print(f"    Explanation: {exp}")
    
    # Test technique 3
    match, score, exp = matcher.technique_3_fuzzy_similarity(text1, text2)
    print(f"  Technique 3 (Fuzzy Similarity): Score={score}%, Match={match}")
    print(f"    Explanation: {exp}")
    
    # Test technique 4
    match, score, exp = matcher.technique_4_token_set_match(text1, text2)
    print(f"  Technique 4 (Token Set): Score={score}%, Match={match}")
    print(f"    Explanation: {exp}")
    
    # Test technique 5
    match, score, exp = matcher.technique_5_phonetic_similarity(text1, text2)
    print(f"  Technique 5 (Phonetic): Score={score}%, Match={match}")
    print(f"    Explanation: {exp}")
    
    # Test technique 6
    match, score, exp = matcher.technique_6_ngram_jaccard(text1, text2)
    print(f"  Technique 6 (N-Gram): Score={score}%, Match={match}")
    print(f"    Explanation: {exp}")
    
    # Test technique 9
    match, score, exp = matcher.technique_9_composite_score(text1, text2)
    print(f"  Technique 9 (Composite): Score={score}%, Match={match}")
    print(f"    Explanation: {exp}")
    
    print()
    print("✓ All matching techniques working correctly")
except Exception as e:
    print(f"✗ Matching engine failed: {e}")
    import traceback
    traceback.print_exc()
print()

# Test 3: Environment Variables
print("Test 3: Environment Variables")
print("-" * 60)
env_vars = [
    "DB_SERVER",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "AZURE_OPENAI_ENDPOINT",
    "AZURE_OPENAI_API_KEY"
]

for var in env_vars:
    value = os.getenv(var)
    if value:
        masked = value[:10] + "..." if len(value) > 10 else value
        print(f"  ✓ {var}: {masked}")
    else:
        print(f"  ⚠ {var}: Not set")
print()

# Test 4: Database Connection (without actual connection)
print("Test 4: Database Module Import")
print("-" * 60)
try:
    from database import DatabaseManager
    db_manager = DatabaseManager(logger)
    print("✓ Database module imported successfully")
    print(f"  Server: {db_manager.server}")
    print(f"  Database: {db_manager.database}")
    print(f"  User: {db_manager.username}")
    print()
    print("  Note: Actual database connection test will be performed in the UI")
except Exception as e:
    print(f"✗ Database module failed: {e}")
print()

# Summary
print("=" * 60)
print("COMPONENT TEST COMPLETED")
print("=" * 60)
print()
print("Next steps:")
print("1. Start the Streamlit application: streamlit run app.py")
print("2. Test database connectivity through the UI")
print("3. Try sample descriptions for matching")
print()
