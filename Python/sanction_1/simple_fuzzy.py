"""
Simple built-in fuzzy matching without external dependencies
Alternative to rapidfuzz/fuzzywuzzy
"""

def simple_ratio(s1, s2):
    """
    Calculate simple similarity ratio between two strings
    Returns a score from 0 to 100
    """
    if not s1 or not s2:
        return 0
    
    s1 = s1.lower().strip()
    s2 = s2.lower().strip()
    
    if s1 == s2:
        return 100
    
    # Levenshtein distance calculation
    len1, len2 = len(s1), len(s2)
    
    # Create distance matrix
    matrix = [[0] * (len2 + 1) for _ in range(len1 + 1)]
    
    # Initialize first column and row
    for i in range(len1 + 1):
        matrix[i][0] = i
    for j in range(len2 + 1):
        matrix[0][j] = j
    
    # Calculate distances
    for i in range(1, len1 + 1):
        for j in range(1, len2 + 1):
            if s1[i-1] == s2[j-1]:
                cost = 0
            else:
                cost = 1
            
            matrix[i][j] = min(
                matrix[i-1][j] + 1,      # deletion
                matrix[i][j-1] + 1,      # insertion
                matrix[i-1][j-1] + cost  # substitution
            )
    
    # Calculate similarity ratio
    distance = matrix[len1][len2]
    max_len = max(len1, len2)
    
    if max_len == 0:
        return 100
    
    similarity = (1 - distance / max_len) * 100
    return round(similarity, 2)


def partial_ratio(s1, s2):
    """
    Calculate partial similarity (substring matching)
    Returns a score from 0 to 100
    """
    if not s1 or not s2:
        return 0
    
    s1 = s1.lower().strip()
    s2 = s2.lower().strip()
    
    if s1 == s2:
        return 100
    
    # Check if one is substring of another
    if s1 in s2 or s2 in s1:
        shorter = min(len(s1), len(s2))
        longer = max(len(s1), len(s2))
        return round((shorter / longer) * 100, 2)
    
    # Find best partial match
    shorter, longer = (s1, s2) if len(s1) < len(s2) else (s2, s1)
    
    best_score = 0
    for i in range(len(longer) - len(shorter) + 1):
        substring = longer[i:i + len(shorter)]
        score = simple_ratio(shorter, substring)
        best_score = max(best_score, score)
    
    return best_score


def token_sort_ratio(s1, s2):
    """
    Calculate similarity after sorting tokens
    Returns a score from 0 to 100
    """
    if not s1 or not s2:
        return 0
    
    # Tokenize and sort
    tokens1 = sorted(s1.lower().split())
    tokens2 = sorted(s2.lower().split())
    
    # Rejoin
    sorted1 = ' '.join(tokens1)
    sorted2 = ' '.join(tokens2)
    
    return simple_ratio(sorted1, sorted2)


def token_set_ratio(s1, s2):
    """
    Calculate similarity using token sets
    Returns a score from 0 to 100
    """
    if not s1 or not s2:
        return 0
    
    # Tokenize
    tokens1 = set(s1.lower().split())
    tokens2 = set(s2.lower().split())
    
    # Calculate intersection and union
    intersection = tokens1 & tokens2
    union = tokens1 | tokens2
    
    if not union:
        return 0
    
    # Jaccard similarity
    jaccard = len(intersection) / len(union)
    
    # Also check sorted tokens
    sorted_score = token_sort_ratio(s1, s2)
    
    # Return best score
    return max(round(jaccard * 100, 2), sorted_score)


# Create a fuzz-like object for compatibility
class fuzz:
    """Simple fuzzy matching class compatible with rapidfuzz.fuzz"""
    
    @staticmethod
    def ratio(s1, s2):
        """Simple ratio (Levenshtein-based)"""
        return simple_ratio(s1, s2)
    
    @staticmethod
    def partial_ratio(s1, s2):
        """Partial ratio (substring matching)"""
        return partial_ratio(s1, s2)
    
    @staticmethod
    def token_sort_ratio(s1, s2):
        """Token sort ratio"""
        return token_sort_ratio(s1, s2)
    
    @staticmethod
    def token_set_ratio(s1, s2):
        """Token set ratio"""
        return token_set_ratio(s1, s2)


# Test function
if __name__ == "__main__":
    # Test cases
    test_cases = [
        ("Vladimir Putin", "Vladimir Putin"),
        ("Vladimir Putin", "Putin Vladimir"),
        ("John Smith", "Jon Smith"),
        ("Barack Obama", "Obama"),
        ("Xi Jinping", "Jinping Xi"),
    ]
    
    print("Testing simple fuzzy matching:")
    print("-" * 60)
    
    for s1, s2 in test_cases:
        print(f"\nComparing: '{s1}' vs '{s2}'")
        print(f"  Ratio:           {fuzz.ratio(s1, s2):.1f}")
        print(f"  Partial Ratio:   {fuzz.partial_ratio(s1, s2):.1f}")
        print(f"  Token Sort:      {fuzz.token_sort_ratio(s1, s2):.1f}")
        print(f"  Token Set:       {fuzz.token_set_ratio(s1, s2):.1f}")
