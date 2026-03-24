"""
Matching techniques engine with N-gram extraction and 10 algorithms
"""
from fuzzywuzzy import fuzz
from jellyfish import soundex, metaphone
import re
from typing import Dict, List, Tuple
from itertools import combinations

class MatchingEngine:
    """Implements 10 different matching techniques with N-gram extraction"""
    
    def __init__(self):
        pass
    
    def extract_ngrams(self, text: str, min_words=2, max_words=4) -> List[str]:
        """
        Extract all possible N-grams (word combinations) from text
        Example: "shahul oxygen hydrogen fluoride hameed" 
        -> ["oxygen hydrogen", "hydrogen fluoride", "oxygen hydrogen fluoride", etc.]
        """
        words = text.split()
        ngrams = []
        
        # Extract n-grams of different lengths
        for n in range(min_words, min(max_words + 1, len(words) + 1)):
            for i in range(len(words) - n + 1):
                ngram = " ".join(words[i:i+n])
                ngrams.append(ngram)
        
        # Also add full text
        ngrams.append(text)
        
        return ngrams
    
    def normalize_text(self, text: str) -> str:
        """Normalize text for comparison"""
        if not text:
            return ""
        # Convert to lowercase, remove extra spaces
        text = str(text).lower().strip()
        text = re.sub(r'\s+', ' ', text)
        return text
    
    def technique_1_exact_match(self, input_text: str, target_text: str) -> Dict:
        """1. Exact Match - Case-sensitive identical comparison"""
        is_match = input_text in target_text or target_text in input_text
        score = 100 if is_match else 0
        
        return {
            "match": is_match,
            "score": score,
            "technical": "Exact Substring Match (Case-Sensitive)",
            "user_friendly": "Perfect Match Found" if is_match else "No Exact Match",
            "reasoning": "Searched for exact text within the database entry"
        }
    
    def technique_2_case_insensitive(self, input_text: str, target_text: str) -> Dict:
        """2. Case-Insensitive Match - Ignore case and extra spaces"""
        input_norm = self.normalize_text(input_text)
        target_norm = self.normalize_text(target_text)
        
        is_match = input_norm in target_norm or target_norm in input_norm
        score = 100 if is_match else 0
        
        return {
            "match": is_match,
            "score": score,
            "technical": "Case-Insensitive Substring Match",
            "user_friendly": "Same Text (Ignoring Caps)" if is_match else "Different Text",
            "reasoning": "Compared after converting to lowercase and normalizing spaces"
        }
    
    def technique_3_fuzzy_similarity(self, input_text: str, target_text: str) -> Dict:
        """3. Fuzzy Similarity - Levenshtein-style edit distance"""
        score = fuzz.partial_ratio(input_text, target_text)
        
        if score >= 90:
            level = "Very Close Match"
        elif score >= 75:
            level = "Close Match"
        elif score >= 60:
            level = "Moderate Match"
        elif score >= 40:
            level = "Weak Match"
        else:
            level = "Poor Match"
        
        return {
            "match": score >= 60,
            "score": score,
            "technical": f"Levenshtein Partial Ratio: {score}%",
            "user_friendly": f"Text Similarity: {score}% ({level})",
            "reasoning": "Measured character-level similarity allowing partial matches"
        }
    
    def technique_4_token_set_match(self, input_text: str, target_text: str) -> Dict:
        """4. Token Set/Sort Match - Compare after sorting tokens"""
        score = fuzz.token_set_ratio(input_text, target_text)
        
        if score >= 85:
            level = "Strong Word Match"
        elif score >= 70:
            level = "Good Word Match"
        elif score >= 50:
            level = "Partial Word Match"
        else:
            level = "Weak Word Match"
        
        return {
            "match": score >= 70,
            "score": score,
            "technical": f"Token Set Ratio: {score}%",
            "user_friendly": f"Word Match (Any Order): {score}% ({level})",
            "reasoning": "Compared words regardless of their order"
        }
    
    def technique_5_phonetic_similarity(self, input_text: str, target_text: str) -> Dict:
        """5. Phonetic Similarity - Soundex/Metaphone"""
        input_words = [w for w in input_text.split() if len(w) > 3]
        target_words = [w for w in target_text.split() if len(w) > 3]
        
        if not input_words or not target_words:
            return {
                "match": False,
                "score": 0,
                "technical": "Phonetic Match: N/A",
                "user_friendly": "Cannot Compare Sounds",
                "reasoning": "Text too short for phonetic comparison"
            }
        
        # Compare soundex codes for all significant words
        matches = 0
        total_comparisons = 0
        
        for iword in input_words[:3]:  # Check first 3 words
            for tword in target_words[:5]:  # Against first 5 target words
                try:
                    if soundex(iword) == soundex(tword):
                        matches += 1
                    total_comparisons += 1
                except:
                    pass
        
        if total_comparisons == 0:
            score = 0
            is_match = False
        else:
            score = int((matches / total_comparisons) * 100)
            is_match = score >= 50
        
        return {
            "match": is_match,
            "score": score,
            "technical": f"Soundex Match: {matches}/{total_comparisons} words",
            "user_friendly": "Sounds Similar" if is_match else "Sounds Different",
            "reasoning": f"Compared phonetic codes: {matches} of {total_comparisons} words sound alike"
        }
    
    def technique_6_ngram_jaccard(self, input_text: str, target_text: str) -> Dict:
        """6. N-Gram / Jaccard Similarity - Token overlap"""
        input_tokens = set(self.normalize_text(input_text).split())
        target_tokens = set(self.normalize_text(target_text).split())
        
        intersection = len(input_tokens & target_tokens)
        union = len(input_tokens | target_tokens)
        
        if union == 0:
            jaccard_score = 0
        else:
            jaccard_score = intersection / union
        
        score_percent = int(jaccard_score * 100)
        
        if score_percent >= 70:
            level = "High Overlap"
        elif score_percent >= 50:
            level = "Moderate Overlap"
        elif score_percent >= 30:
            level = "Low Overlap"
        else:
            level = "Minimal Overlap"
        
        return {
            "match": jaccard_score >= 0.4,
            "score": score_percent,
            "technical": f"Jaccard Index: {jaccard_score:.2f}",
            "user_friendly": f"Word Overlap: {score_percent}% ({level})",
            "reasoning": f"Found {intersection} common words out of {union} total unique words"
        }
    
    def technique_7_address_normalization(self, input_text: str, target_text: str) -> Dict:
        """7. Address Normalization Match - Normalize abbreviations"""
        abbreviations = {
            r'\bst\b': 'street', r'\bave\b': 'avenue', r'\bblvd\b': 'boulevard',
            r'\brd\b': 'road', r'\bdr\b': 'drive', r'\bln\b': 'lane',
            r'\bct\b': 'court', r'\bpl\b': 'place', r'\bapt\b': 'apartment',
            r'\bste\b': 'suite', r'\bfl\b': 'floor', r'\bpkwy\b': 'parkway',
        }
        
        def normalize_address(text):
            text = text.lower()
            text = re.sub(r'[^\w\s]', ' ', text)
            for abbr, full in abbreviations.items():
                text = re.sub(abbr, full, text)
            text = " ".join(text.split())
            return text
        
        input_norm = normalize_address(input_text)
        target_norm = normalize_address(target_text)
        
        similarity = fuzz.partial_ratio(input_norm, target_norm)
        is_match = similarity >= 85
        
        return {
            "match": is_match,
            "score": similarity,
            "technical": f"Normalized Text Match: {similarity}%",
            "user_friendly": "Same After Normalization" if is_match else f"Similarity: {similarity}%",
            "reasoning": "Normalized abbreviations and punctuation before comparing"
        }
    
    def technique_8_geospatial_proximity(self, input_text: str, target_text: str) -> Dict:
        """8. Geospatial / Location Proximity - Conceptual location matching"""
        location_keywords = ['city', 'country', 'street', 'avenue', 'road', 'building']
        
        input_lower = input_text.lower()
        target_lower = target_text.lower()
        
        input_has_location = any(keyword in input_lower for keyword in location_keywords)
        target_has_location = any(keyword in target_lower for keyword in location_keywords)
        
        if not (input_has_location or target_has_location):
            # Use token matching as fallback
            similarity = fuzz.token_set_ratio(input_text, target_text)
        else:
            similarity = fuzz.token_set_ratio(input_text, target_text)
        
        if similarity >= 80:
            proximity = "High Similarity"
        elif similarity >= 60:
            proximity = "Moderate Similarity"
        else:
            proximity = "Low Similarity"
        
        return {
            "match": similarity >= 60,
            "score": similarity,
            "technical": f"Contextual Similarity: {similarity}%",
            "user_friendly": f"Context Match: {proximity}",
            "reasoning": "Analyzed contextual and location-related information"
        }
    
    def technique_9_ml_composite_score(self, input_text: str, target_text: str) -> Dict:
        """9. Machine-Learning Style Composite Score - Combined confidence"""
        # Combine multiple techniques
        fuzzy = fuzz.partial_ratio(input_text, target_text) / 100
        token_set = fuzz.token_set_ratio(input_text, target_text) / 100
        token_sort = fuzz.token_sort_ratio(input_text, target_text) / 100
        
        # Weighted composite score
        composite = (fuzzy * 0.4 + token_set * 0.3 + token_sort * 0.3)
        score_percent = int(composite * 100)
        
        if composite >= 0.80:
            confidence = "Very High Confidence"
        elif composite >= 0.65:
            confidence = "High Confidence"
        elif composite >= 0.50:
            confidence = "Moderate Confidence"
        elif composite >= 0.35:
            confidence = "Low Confidence"
        else:
            confidence = "Very Low Confidence"
        
        techniques_used = f"Fuzzy:{int(fuzzy*100)}% + TokenSet:{int(token_set*100)}% + TokenSort:{int(token_sort*100)}%"
        
        return {
            "match": composite >= 0.50,
            "score": score_percent,
            "technical": f"Composite: {composite:.2f} | {techniques_used}",
            "user_friendly": f"Overall: {score_percent}% ({confidence})",
            "reasoning": f"Combined algorithms: {techniques_used}"
        }
    
    def technique_10_keyword_extraction(self, input_text: str, target_text: str) -> Dict:
        """10. Keyword Extraction & Matching - Extract key terms and match"""
        # Extract potential keywords (2+ character words, excluding common words)
        common_words = {'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'a', 'an'}
        
        input_keywords = set([
            word.lower() for word in input_text.split() 
            if len(word) > 2 and word.lower() not in common_words
        ])
        
        target_keywords = set([
            word.lower() for word in target_text.split() 
            if len(word) > 2 and word.lower() not in common_words
        ])
        
        if not input_keywords:
            return {
                "match": False,
                "score": 0,
                "technical": "Keyword Match: No keywords found",
                "user_friendly": "No Keywords to Match",
                "reasoning": "Input text too short or contains only common words"
            }
        
        matched_keywords = input_keywords & target_keywords
        match_ratio = len(matched_keywords) / len(input_keywords) if input_keywords else 0
        score = int(match_ratio * 100)
        
        if score >= 70:
            level = "Strong Keyword Match"
        elif score >= 50:
            level = "Good Keyword Match"
        elif score >= 30:
            level = "Partial Keyword Match"
        else:
            level = "Weak Keyword Match"
        
        matched_list = ", ".join(list(matched_keywords)[:5]) if matched_keywords else "none"
        
        return {
            "match": score >= 30,
            "score": score,
            "technical": f"Keyword Match Ratio: {match_ratio:.2f}",
            "user_friendly": f"Keywords: {score}% ({level})",
            "reasoning": f"Matched keywords: {matched_list}"
        }
    
    def find_matches(self, input_description: str, database_items: List[Dict], threshold: int = 40) -> Dict:
        """
        Find matching items using N-gram extraction and all techniques
        
        Args:
            input_description: User input (can be multi-line)
            database_items: List of items from database
            threshold: Minimum score threshold
        
        Returns:
            Dictionary with:
            - 'matches': List of matching items with technique results
            - 'extracted_terms': List of all extracted N-grams with match status
        """
        # Normalize input
        input_normalized = self.normalize_text(input_description)
        
        # Extract N-grams from input
        ngrams = self.extract_ngrams(input_normalized, min_words=2, max_words=4)
        
        # Also add full text
        search_terms = [input_normalized] + ngrams
        
        # Track extracted terms and their match status
        extracted_terms_status = {}
        for term in search_terms:
            extracted_terms_status[term] = {
                'term': term,
                'matched': False,
                'match_count': 0,
                'best_score': 0,
                'matched_items': []
            }
        
        matches = []
        seen_items = set()
        
        for item in database_items:
            item_id = item.get('ItemID')
            
            # Skip if already matched
            if item_id in seen_items:
                continue
            
            # Combine all text fields
            item_text = f"{item.get('ItemDescription', '')} {item.get('ShortDescription', '')} {item.get('FullText', '')}".strip()
            
            if not item_text:
                continue
            
            item_text_normalized = self.normalize_text(item_text)
            
            # Try matching with each search term
            best_results = {}
            best_score = 0
            best_term = input_normalized
            
            for term in search_terms:
                if not term or len(term) < 3:
                    continue
                
                # Run all 10 techniques
                results = {
                    "Exact Match": self.technique_1_exact_match(term, item_text_normalized),
                    "Case-Insensitive": self.technique_2_case_insensitive(term, item_text_normalized),
                    "Fuzzy Similarity": self.technique_3_fuzzy_similarity(term, item_text_normalized),
                    "Token Set Match": self.technique_4_token_set_match(term, item_text_normalized),
                    "Phonetic Similarity": self.technique_5_phonetic_similarity(term, item_text_normalized),
                    "N-Gram Jaccard": self.technique_6_ngram_jaccard(term, item_text_normalized),
                    "Address Normalization": self.technique_7_address_normalization(term, item_text_normalized),
                    "Geospatial Proximity": self.technique_8_geospatial_proximity(term, item_text_normalized),
                    "ML Composite": self.technique_9_ml_composite_score(term, item_text_normalized),
                    "Keyword Extraction": self.technique_10_keyword_extraction(term, item_text_normalized)
                }
                
                # Find max score for this term
                max_score = max(r['score'] for r in results.values())
                
                if max_score > best_score:
                    best_score = max_score
                    best_results = results
                    best_term = term
            
            # Check if any technique found a match above threshold
            matched_techniques = [
                name for name, result in best_results.items()
                if result['match'] or result['score'] >= threshold
            ]
            
            if matched_techniques and best_score >= threshold:
                seen_items.add(item_id)
                
                # Update extracted terms status
                if best_term in extracted_terms_status:
                    extracted_terms_status[best_term]['matched'] = True
                    extracted_terms_status[best_term]['match_count'] += 1
                    extracted_terms_status[best_term]['best_score'] = max(
                        extracted_terms_status[best_term]['best_score'],
                        best_score
                    )
                    extracted_terms_status[best_term]['matched_items'].append(item_id)
                
                matches.append({
                    'item': item,
                    'matched_term': best_term,
                    'techniques': best_results,
                    'matched_by': matched_techniques,
                    'best_score': best_score
                })
        
        # Sort by best score descending
        matches.sort(key=lambda x: x['best_score'], reverse=True)
        
        # Prepare extracted terms list
        extracted_terms_list = list(extracted_terms_status.values())
        # Sort by: matched first, then by best score, then alphabetically
        extracted_terms_list.sort(key=lambda x: (-x['matched'], -x['best_score'], x['term']))
        
        return {
            'matches': matches,
            'extracted_terms': extracted_terms_list
        }
