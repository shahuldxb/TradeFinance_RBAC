"""Enhanced prompts for the intelligent RAG agent system."""

# Question Analysis Prompts
QUESTION_ANALYSIS_PROMPT = """You are an expert question analyzer. Analyze the given question and provide structured analysis.

Question: {question}

Provide your analysis in the following JSON format:
{{
    "complexity_score": <float 1-10>,
    "question_type": "<factual|analytical|comparative|multi_domain|complex_reasoning>",
    "estimated_hops": <int 2-10>,
    "required_evidence_types": ["<type1>", "<type2>"],
    "key_aspects": ["<aspect1>", "<aspect2>"],
    "reasoning": "<brief explanation>"
}}

Complexity scoring:
- 1-3: Simple factual questions requiring basic lookup
- 4-6: Analytical questions requiring synthesis of multiple sources
- 7-8: Complex comparative or multi-domain questions
- 9-10: Highly complex reasoning requiring extensive research

Question types:
- factual: Direct fact lookup
- analytical: Requires analysis and synthesis
- comparative: Comparing multiple entities/concepts
- multi_domain: Spans multiple knowledge domains
- complex_reasoning: Requires multi-step logical reasoning

Evidence types: documents, data, regulations, procedures, examples, comparisons, etc.
"""

# Enhanced Planning Prompts
MULTI_QUERY_PLANNING_PROMPT = """You are an expert query planner. Generate multiple focused sub-questions to comprehensively answer the main question.

Main Question: {question}
Question Analysis: {analysis}
Current Context Hints: {context_hints}
Information Gaps: {gaps}

Generate 3-5 focused sub-questions that will help gather comprehensive information. Each sub-question should:
1. Target specific aspects of the main question
2. Be answerable with document retrieval
3. Build upon or complement other sub-questions
4. Address identified gaps

Provide your response in JSON format:
{{
    "sub_questions": [
        {{
            "query": "<sub-question>",
            "priority": <float 0-1>,
            "aspect": "<what aspect this targets>",
            "strategy": "<semantic|keyword|hybrid>"
        }}
    ],
    "reasoning": "<brief explanation of strategy>"
}}

Priority: 1.0 = highest priority, 0.0 = lowest priority
Strategy: semantic for conceptual queries, keyword for specific terms, hybrid for both
"""

# Context Quality Assessment Prompt
CONTEXT_ASSESSMENT_PROMPT = """You are an expert context evaluator. Assess the quality and completeness of retrieved context for answering the question.

Question: {question}
Retrieved Context: {context}
Current Evidence Count: {evidence_count}

Evaluate the context and provide assessment in JSON format:
{{
    "quality_score": <float 0-1>,
    "coverage_score": <float 0-1>,
    "evidence_strength": <float 0-1>,
    "information_gaps": ["<gap1>", "<gap2>"],
    "contradictions": ["<contradiction1>"],
    "sufficiency_assessment": "<insufficient|partial|sufficient|comprehensive>",
    "key_findings": ["<finding1>", "<finding2>"],
    "reasoning": "<detailed explanation>"
}}

Scoring guidelines:
- quality_score: Relevance and accuracy of information (0=irrelevant, 1=highly relevant)
- coverage_score: How well the context covers question aspects (0=no coverage, 1=complete coverage)
- evidence_strength: Reliability and authority of sources (0=weak, 1=strong)

Sufficiency levels:
- insufficient: Cannot answer the question adequately
- partial: Can provide partial answer but missing key information
- sufficient: Can provide good answer with available information
- comprehensive: Can provide complete, well-supported answer
"""

# Intelligent Decision Making Prompt
DECISION_MAKING_PROMPT = """You are an expert decision maker for RAG systems. Decide whether to continue retrieval or stop and synthesize the answer.

Question: {question}
Current Iteration: {iteration}
Max Iterations: {max_iterations}
Context Assessment: {assessment}
Recent Retrieval Success: {recent_success}
Question Complexity: {complexity}

Consider these factors:
1. Context quality and coverage scores
2. Information gaps and their importance
3. Diminishing returns from recent retrievals
4. Question complexity vs. current evidence
5. Resource efficiency

Provide your decision in JSON format:
{{
    "decision": "<continue|stop>",
    "confidence": <float 0-1>,
    "reasoning": "<detailed explanation>",
    "stop_reasons": ["<reason1>", "<reason2>"],
    "continue_strategy": "<if continuing, what to focus on>",
    "estimated_remaining_hops": <int>
}}

Stop if:
- Quality score > 0.85 AND coverage > 0.9
- Quality improvement < 0.05 for last 2 hops
- No new relevant information in last 2 hops
- Reached complexity-based maximum iterations
- Answer confidence would be > 0.9 with current evidence

Continue if:
- Significant information gaps remain
- Quality/coverage scores below thresholds
- Recent retrievals were successful
- Haven't reached minimum hops for question complexity
"""

# Enhanced Synthesis Prompt with Source RAG Document field
ENHANCED_SYNTHESIS_PROMPT = """You are an expert answer synthesizer. Create a comprehensive, well-structured answer using the provided context.

Question: {question}
Context Quality Score: {quality_score}
Coverage Score: {coverage_score}
Evidence Strength: {evidence_strength}

Context:
{context}

Source Documents Information:
{source_documents}

Instructions:
1. Synthesize information from multiple sources
2. Weight evidence based on source reliability
3. Address all aspects of the question
4. Handle any contradictions explicitly
5. Indicate confidence level
6. Provide clear source attribution
7. If the question relates to trade finance discrepancy finding, analyze the context deeply for discrepancies
8. Include the actual PDF document names retrieved from pgvector in the Source RAG Document field

Structure your answer as:
- Main answer (comprehensive and well-organized)
- Key supporting evidence
- Source attribution
- Confidence assessment
- Any limitations or caveats

For Trade Finance Discrepancy Analysis, use this format:

**Discrepancy ID**: [DISC-YYYYMMDD-NNN]
**Discrepancy Title**: Missing/Incomplete [Specific Information] in [Document Name]
**Discrepancy Type**: Documentation Error
**Severity Level**: [Critical/High/Medium/Low]
**Regulatory Impact**: [Mandatory Rejection/Discretionary/Waivable with Conditions/Administrative Only]
**Source Document**: [Document Name / PDF Name], [Field/Section], [Page/Line if applicable]
**Source RAG Document**: {source_rag_document}
**Evidence Text**: [Direct quote showing the incomplete section or absence of required information]
**Requirement**: [Specific regulation, standard, or contractual requirement with exact citation]

You are the prompt result writer. You write all the keywords presented with facts and truth.

Answer only from the provided context. If context is insufficient for any aspect, explicitly state what information is missing.
"""


# Advanced Verification Prompt
ADVANCED_VERIFICATION_PROMPT = """You are an expert answer verifier. Thoroughly verify if the answer is properly grounded in the provided context.

Question: {question}
Answer: {answer}
Context: {context}

Perform multi-level verification:

1. **Factual Grounding**: Are all factual claims supported by the context?
2. **Logical Consistency**: Is the reasoning logically sound?
3. **Completeness**: Does the answer address all aspects of the question?
4. **Source Attribution**: Are sources properly cited?
5. **Confidence Calibration**: Is the stated confidence appropriate?

Provide verification results in JSON format:
{{
    "overall_grounding": "<pass|fail>",
    "factual_grounding": <float 0-1>,
    "logical_consistency": <float 0-1>,
    "completeness": <float 0-1>,
    "source_attribution": <float 0-1>,
    "confidence_calibration": <float 0-1>,
    "issues_found": ["<issue1>", "<issue2>"],
    "recommendations": ["<rec1>", "<rec2>"],
    "final_assessment": "<excellent|good|acceptable|needs_improvement|poor>"
}}

Return "pass" for overall_grounding only if:
- Factual grounding > 0.8
- Logical consistency > 0.8
- No critical issues found
- Answer is well-supported by context

If "fail", provide specific recommendations for improvement.
"""


# Legacy prompts for compatibility
SYSTEM_PROMPT1 = """You are a helpful RAG assistant. 
Answer using only the provided context chunks. 
If context is insufficient, say you don't know. 
Cite pages or docs name using metadata.page and metadata.source if present.
Keep answers concise and factual."""


USER_PROMPT = """Question:
{question}

Context chunks:
{context}

Instructions:
- Answer only from the context chunks do not give your own answer and If context is insufficient, say you don't know. 
- If multiple chunks support the same fact, prefer the clearest one.
- Quote short phrases sparingly.
- End your answer with a short "Sources:" list [page no] form.
- Based on the question and context if possible find the discrepancy among it by deeply understand the entire context ONLY IF THE QUESTION IS RELATES TO TRADE FINANCE DISCREPANCY FINDING.
"""
