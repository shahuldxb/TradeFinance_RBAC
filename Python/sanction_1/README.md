# Sanctions Screening System

A comprehensive name and address matching application for sanctions screening using 10 different matching techniques.

## Features

### Core Functionality
- **Multi-Technique Matching**: Uses 10 different algorithms to match names and addresses
- **SQL Server Integration**: Connects to `tf_genie` database and `tf_sanctions` table
- **Activity Tracking**: Logs all screenings with unique serial numbers in `tf_sanctions_activity` table
- **Audit Logging**: Comprehensive logging of all SQL queries, activities, and errors
- **Azure OpenAI Integration**: Semantic matching using LLM reasoning

### 10 Matching Techniques

1. **Exact Match** - Case-sensitive exact comparison
2. **Case-Insensitive Match** - Normalized comparison ignoring case and whitespace
3. **Fuzzy Similarity** - Levenshtein-style edit distance (0-100 scale)
4. **Token Set/Sort Match** - Handles word order variations
5. **Phonetic Similarity** - Metaphone-based sound-alike matching
6. **N-Gram Jaccard Similarity** - Character n-gram overlap analysis
7. **Address Normalization** - Handles abbreviations and address variants
8. **Geospatial Proximity** - Location-based similarity detection
9. **ML Composite Score** - Weighted combination of multiple techniques
10. **Semantic LLM Similarity** - Contextual understanding via Azure OpenAI

### User Interface

- **Sample Data Dropdown**: Quick demo with pre-populated examples
- **Name & Address Input**: Clean input fields for screening
- **Results Grid**: Sortable table showing all matches with technique details
- **System Status**: Hidden connectivity checks for database and Azure OpenAI
- **Activity Retrieval**: Search past screenings by serial number
- **Add Sanction Entry**: Test system by adding new entries
- **Audit Log Viewer**: Real-time view of system activity

## Installation

### Prerequisites

- Python 3.11+
- SQL Server with ODBC Driver 17
- Azure OpenAI access
- Access to `tf_genie` database

### Setup

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Environment**
   - The `.env` file is already configured with your credentials
   - Verify database connectivity before running

3. **Database Setup**
   - The application will automatically create the `tf_sanctions_activity` table if it doesn't exist
   - Ensure the `tf_sanctions` table exists with the following schema:
     ```sql
     CREATE TABLE [dbo].[tf_sanctions] (
         [id] INT IDENTITY(1,1) PRIMARY KEY,
         [name] NVARCHAR(500),
         [uniqid] VARCHAR(50),
         [country] NVARCHAR(500),
         [source] NVARCHAR(500)
     )
     ```

## Usage

### Running the Application

```bash
streamlit run app.py
```

The application will start on `http://0.0.0.0:8501`

### Workflow

1. **System Check**: Application automatically tests database and Azure OpenAI connectivity
2. **Select Sample**: Choose a pre-configured sample or enter custom data
3. **Enter Details**: Input name and address (address is optional)
4. **Screen**: Click "Screen Against Sanctions List" button
5. **Review Results**: View matches sorted by match count in ascending order
6. **Retrieve Past Results**: Use serial number to retrieve previous screenings

### Adding Test Data

Use the sidebar "Add Sanction Entry" option to add test records to the `tf_sanctions` table.

## Architecture

### File Structure

```
sanctions_screening/
├── app.py                    # Main Streamlit application
├── db_utils.py              # Database and logging utilities
├── matching_algorithms.py   # 10 matching techniques
├── requirements.txt         # Python dependencies
├── .env                     # Environment configuration
├── audit_log.txt           # Activity and error logs (auto-generated)
└── README.md               # This file
```

### Database Tables

**tf_sanctions** (Input)
- `id`: Primary key
- `name`: Sanctioned entity name
- `uniqid`: Unique identifier
- `country`: Country/address information
- `source`: Source of sanction

**tf_sanctions_activity** (Output)
- `id`: Auto-increment primary key
- `serial_number`: Unique screening identifier
- `input_name`: Name that was screened
- `input_address`: Address that was screened
- `matches_data`: JSON of all matches
- `created_at`: Timestamp

### Logging

All activities are logged to `audit_log.txt` with the following categories:
- **INFO**: General information and status messages
- **SQL**: Database queries and operations
- **ACTIVITY**: Screening activities and user actions
- **ERROR**: Errors and exceptions

## Configuration

All configuration is managed through the `.env` file:

### Azure OpenAI Settings
- `AZURE_OPENAI_ENDPOINT`: Azure OpenAI endpoint URL
- `AZURE_OPENAI_API_KEY`: API key for authentication
- `AZURE_OPENAI_API_VERSION`: API version
- `AZURE_OPENAI_CHAT_DEPLOYMENT`: Chat model deployment name
- `AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT`: Embeddings model name

### Database Settings
- `DB_SERVER`: SQL Server hostname
- `DB_NAME`: Database name (tf_genie)
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_TIMEOUT`: Connection timeout in seconds
- `DB_CHARSET`: Character encoding

### Application Settings
- `HOST`: Streamlit host (0.0.0.0 for all interfaces)
- `PORT`: Streamlit port (8501)
- `LLM_MAX_TOKENS`: Maximum tokens for LLM responses

## Troubleshooting

### Database Connection Issues
- Verify SQL Server is accessible from your network
- Check ODBC Driver 17 for SQL Server is installed
- Confirm credentials in `.env` file
- Review `audit_log.txt` for detailed error messages

### Azure OpenAI Issues
- Verify API key and endpoint are correct
- Check deployment names match your Azure setup
- Ensure sufficient quota for API calls

### Performance
- Large sanctions lists may take time to process
- LLM semantic matching is the slowest technique
- Consider caching results for frequently screened names

## Security Notes

- The `.env` file contains sensitive credentials - keep it secure
- Do not commit `.env` to version control
- Use appropriate network security for database access
- Audit logs may contain sensitive information

## Future Enhancements

- Batch screening support
- Export results to Excel/PDF
- Configurable matching thresholds
- Real-time sanctions list updates
- Dashboard with analytics
- Multi-language support

## Support

For issues or questions:
1. Check `audit_log.txt` for detailed error information
2. Verify all prerequisites are installed
3. Confirm database and API connectivity
4. Review configuration in `.env` file
