# Goods Matching System

A sophisticated Streamlit-based application for matching goods descriptions against a SQL Server database using 10 advanced matching techniques.

## Features

### Core Functionality
- **10 Advanced Matching Techniques**: Exact match, fuzzy similarity, phonetic matching, and more
- **Real-time Database Integration**: Direct connection to SQL Server `tf_genie` database
- **Comprehensive Logging**: All SQL queries, activities, and errors logged to audit file
- **Activity Tracking**: Store and retrieve past search results by serial number
- **Sample Descriptions**: Quick demo dropdown for easy testing
- **Test Entry System**: Add test entries to verify system functionality

### Matching Techniques

1. **Exact Match** - Case-sensitive identical comparison
2. **Case-Insensitive Match** - Ignore case and extra spaces
3. **Fuzzy Similarity** - Levenshtein-style edit distance (0-100 scale)
4. **Token Set/Token Sort Match** - Compare after sorting/deduplicating tokens
5. **Phonetic Similarity** - Soundex/Metaphone-based sound-alike matching
6. **N-Gram/Jaccard Similarity** - Token/substring overlap (0-1 scale)
7. **Address Normalization Match** - Normalize abbreviations and punctuation
8. **Geospatial/Location Proximity** - Physical location similarity assessment
9. **Machine-Learning Composite Score** - Combined confidence score with technique breakdown

### User Interface

#### Layout (Top to Bottom)
1. **Header Section** - Title and connectivity status
2. **Input Section** - Sample dropdown + text area for description
3. **System Activity Log** - Real-time logs display
4. **Results Grid** - Matches displayed with both user-friendly and technical explanations
5. **Test Entry Section** - Add test entries to tf_sanctions table
6. **Retrieve Past Results** - Search by run ID

## Installation

### Prerequisites
- Python 3.11+
- SQL Server with ODBC Driver 17
- Access to `tf_genie` database

### Install Dependencies

```bash
pip install streamlit python-dotenv pyodbc fuzzywuzzy python-Levenshtein jellyfish phonetics
```

### Configuration

Create a `.env` file in the project root with the following variables:

```env
# SQL Server Configuration
DB_SERVER=your_server_name
DB_NAME=tf_genie
DB_USER=your_username
DB_PASSWORD=your_password
DB_TIMEOUT=30
DB_CHARSET=UTF-8

# Azure OpenAI Configuration (Optional)
AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_API_VERSION=2024-12-01-preview
AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o
AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT=text-embedding-3-large

# Application Settings
DOCS_DIR=./data
COLLECTION_NAME="rishi"
HOST=0.0.0.0
PORT=8501
LLM_MAX_TOKENS=16000
```

## Usage

### Start the Application

```bash
streamlit run app.py
```

The application will be available at `http://localhost:8501`

### Basic Workflow

1. **Select Sample or Enter Description**
   - Choose from dropdown samples for quick demo
   - Or enter custom goods description

2. **Search & Match**
   - Click "Search & Match" button
   - System applies all 10 techniques
   - Results displayed in grid format

3. **Review Results**
   - View matches sorted by score
   - See both user-friendly and technical explanations
   - Download results as CSV

4. **Track Activity**
   - Each search assigned a unique Run ID
   - Retrieve past results using Run ID
   - View system logs in real-time

### Testing the System

Use the **System Testing** section to:
- Add test entries to `tf_sanctions` table
- Verify database connectivity
- Confirm matching algorithms work correctly

## Database Schema

### Source Table: `ExportControlItems`

```sql
SELECT [ItemID]
      ,[SourceRegulation]
      ,[SourceDocument]
      ,[SourceCountry]
      ,[ItemDescription]
      ,[ShortDescription]
      ,[FullText]
      ,[CreatedDate]
      ,[ModifiedDate]
FROM [TF_genie].[dbo].[ExportControlItems]
```

### Activity Table: `tf_sanctions_activity` (Auto-created)

Stores:
- RunID (Primary Key)
- RunDate
- InputDescription
- MatchCount
- TechniquesUsed
- MatchResults

### Test Table: `tf_sanctions` (Auto-created)

Stores:
- ID (Auto-increment)
- Name
- Address
- CreatedDate

## Project Structure

```
goods_matcher/
├── app.py              # Main Streamlit application
├── matcher.py          # Matching techniques engine
├── database.py         # Database connectivity module
├── logger.py           # Audit logging module
├── .env                # Environment configuration
├── README.md           # This file
├── data/               # Data directory
└── logs/               # Log files directory
    └── audit_log.txt   # Unified audit log
```

## Output Format

### Results Grid Columns

- **Match #** - Sequential match number
- **Item ID** - Database item identifier
- **Item Description** - Full item description
- **Short Description** - Brief description
- **Best Score** - Highest matching score percentage
- **Primary Match Type** - User-friendly technique name
- **Primary Explanation** - Plain English explanation
- **All Techniques Used** - Complete list with scores
- **Technical Methods** - Technical terminology
- **Source Regulation** - Regulatory source
- **Source Country** - Country of origin
- **Source Document** - Reference document

### Explanation Format

Each match shows:
- **User-Friendly**: "Text Similarity: 87% (Very Close Match)"
- **Technical**: "Fuzzy Similarity (Levenshtein Distance)"
- **Reasoning**: Detailed breakdown for ensemble techniques

## Logging

All activities logged to `logs/audit_log.txt`:
- SQL queries with parameters and result counts
- Connectivity tests
- Matching operations
- Errors with full details
- Activity tracking

## Troubleshooting

### Connection Issues

1. Verify SQL Server is accessible
2. Check ODBC Driver 17 is installed
3. Confirm credentials in `.env` file
4. Review connectivity status in UI

### No Matches Found

1. Check database has items in `ExportControlItems`
2. Lower matching threshold (default: 50%)
3. Try different descriptions
4. Review system logs for errors

### Performance Issues

1. Database may be slow - check network
2. Large result sets - consider pagination
3. Review audit logs for bottlenecks

## License

Internal use only - Proprietary system

## Support

For issues or questions, contact the development team.
