"""
Reasoning Generator Module
Generates executive summary and classification for search results
"""

class ReasoningGenerator:
    """Generates executive summary reasoning for match results"""
    
    def __init__(self):
        """Initialize reasoning generator"""
        pass
    
    def generate_executive_summary(self, matches, extracted_terms, input_description, threshold):
        """
        Generate executive summary with classification and reasoning
        
        Args:
            matches: List of match results
            extracted_terms: List of extracted term information
            input_description: Original input text
            threshold: Match threshold used
            
        Returns:
            dict: Executive summary with classification, reasoning, and recommendation
        """
        # Calculate metrics
        total_matches = len(matches)
        total_terms = len(extracted_terms)
        matched_terms = sum(1 for t in extracted_terms if t['matched'])
        
        # Get highest score
        highest_score = max([m['best_score'] for m in matches]) if matches else 0
        
        # Get matched term names
        matched_term_names = [t['term'] for t in extracted_terms if t['matched']]
        
        # Classify based on highest score
        if highest_score >= 90:
            classification = "CONTROLLED ITEMS FOUND"
            classification_icon = "🔴"
            classification_color = "red"
            confidence_level = "HIGH"
            recommendation = "Export license required. Immediate compliance review recommended."
        elif highest_score >= 70:
            classification = "REQUIRES REVIEW"
            classification_icon = "🟡"
            classification_color = "orange"
            confidence_level = "MEDIUM"
            recommendation = "Compliance team review needed before proceeding."
        elif highest_score >= 50:
            classification = "POTENTIAL CONCERN"
            classification_icon = "🟠"
            classification_color = "yellow"
            confidence_level = "MEDIUM-LOW"
            recommendation = "Additional analysis recommended. Consider alternative suppliers."
        else:
            classification = "CLEAN GOODS"
            classification_icon = "🟢"
            classification_color = "green"
            confidence_level = "LOW"
            recommendation = "No immediate control concerns identified. Proceed with standard process."
        
        # Generate reasoning paragraph
        if total_matches > 0:
            # Get top matching items
            top_items = sorted(matches, key=lambda x: x['best_score'], reverse=True)[:3]
            top_item_ids = [str(m['item'].get('ItemID', 'N/A')) for m in top_items]
            top_regulations = list(set([m['item'].get('SourceRegulation', 'N/A') for m in top_items]))
            
            matched_terms_str = ', '.join([f'"{t}"' for t in matched_term_names[:3]])
            if len(matched_term_names) > 3:
                matched_terms_str += f", and {len(matched_term_names) - 3} more"
            
            reasoning = f"""The search identified {total_matches} matching item(s) in the export control database with a highest confidence score of {highest_score}%. The system extracted {total_terms} potential search terms from the input, of which {matched_terms} term(s) produced matches: {matched_terms_str}.

The top matching items (IDs: {', '.join(top_item_ids)}) are listed under the following regulatory frameworks: {', '.join(top_regulations)}. """
            
            if highest_score >= 90:
                reasoning += f"""High-risk keywords were identified with strong technical specifications matching export control lists. The confidence level in this determination is high due to direct database matches with established control codes and regulatory alignment. The matched terms show significant overlap with controlled item descriptions, indicating potential export restrictions."""
            elif highest_score >= 70:
                reasoning += f"""Moderate-risk indicators were identified with partial matches to export control databases. The confidence level is medium due to some database matches, though additional verification is recommended. The matched terms show moderate similarity to controlled item descriptions."""
            elif highest_score >= 50:
                reasoning += f"""Low-to-moderate risk indicators were identified with weak matches to export control databases. The confidence level is medium-low due to limited database matches and ambiguous terminology. Further investigation is needed to determine if export controls apply."""
            else:
                reasoning += f"""No significant risk indicators were identified. The confidence level is low due to minimal database matches."""
                
        else:
            # No matches found
            reasoning = f"""No matching items were found in the export control database above the {threshold}% threshold. The system extracted {total_terms} potential search terms from the input, but none produced matches above the minimum confidence level.

The absence of database matches, control codes, or dynamic indicators limits the robustness of this classification. While no high-risk keywords were identified in the current search, this does not definitively rule out potential export control concerns. The lack of matches may be due to:

1. The item genuinely not being controlled under current regulations
2. Terminology differences between the input description and database entries
3. Insufficient technical detail in the input description
4. The item being controlled under regulations not yet in the database

The classification is based on the absence of relevant database matches and regulatory alignment. However, given the limitations of automated matching, manual review by compliance experts is recommended for high-value or sensitive transactions."""
            
            if threshold >= 80:
                reasoning += f""" Note that the high threshold ({threshold}%) may have excluded potential matches. Consider lowering the threshold if you suspect the item may be controlled."""
        
        return {
            'classification': classification,
            'classification_icon': classification_icon,
            'classification_color': classification_color,
            'confidence_level': confidence_level,
            'reasoning': reasoning,
            'recommendation': recommendation,
            'metrics': {
                'total_matches': total_matches,
                'highest_score': highest_score,
                'total_terms': total_terms,
                'matched_terms': matched_terms
            }
        }
