# Document Checklist Application - Enhanced Version

A Streamlit-based document checklist application with **AI-powered document import** and compact UI design.

## ✨ New Features

### 1. AI Document Import
- **Paste document text** from "Additional Documents" or "46A" field
- **Azure OpenAI integration** automatically extracts:
  - Document description (first line)
  - LC Type (Sight, Usance, Transferable, Red Clause)
  - Commodity information
  - Sub-documents (subsequent lines)
- **One-click import** creates document and all sub-documents in the database

### 2. Enhanced UI
- **Tighter spacing** - Reduced padding and margins for more compact view
- **Smaller fonts** - Optimized text sizes for better density
- **Progress indicator** - Shows (checked/total) for each document
- **Color-coded rows** - Green for fully compliant, Orange for non-compliant

## 📋 Features

- **Document Grid View**: Display all documents with sample numbers, descriptions, LC types, and commodities
- **Detail View**: Show sub-documents with checkboxes and narration fields
- **Auto-save**: Changes are automatically saved to the database
- **Progress Tracking**: Visual indicators show completion status
- **User-specific Data**: Each user has their own checklist results

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher
- SQL Server with ODBC Driver 17
- Azure OpenAI account (for AI import feature)

### Steps

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment variables**:
   - Copy `env_template.txt` to `.env`
   - Fill in your database credentials
   - Add your Azure OpenAI credentials

3. **Database Setup**:
   Your SQL Server database should have these tables:
   - `tf_docs_needed` - Master documents
   - `tf_docs_needed_detail` - Sub-documents
   - `tf_master_check` - User checklist sessions
   - `tf_master_check_detail` - Checklist results

## 🎯 Usage

### Running the Application

```bash
streamlit run app.py
```

The application will open in your default web browser at `http://localhost:8501`

### Using AI Document Import

1. Click on **"✨ AI Document Import"** expander at the top
2. Paste your document text in the format:
   ```
   46A Documents - Electronics - Mobile Phones
   Commercial Invoice in 3 copies
   Packing List in 2 copies
   Certificate of Origin
   Bill of Lading
   ```
3. Click **"🔍 Analyze & Import"**
4. The AI will parse the text and create the document automatically

### Managing Checklists

1. **View documents**: Browse the list on the main page
2. **Check progress**: See (checked/total) indicator for each document
3. **Open details**: Click "View" button to see sub-documents
4. **Check items**: Click checkboxes as you complete each item
5. **Add notes**: Enter narration in the text field for each item
6. **Auto-save**: Changes are saved automatically

## 🔧 Configuration

### Database Connection

Edit `.env` file:
```env
DB_SERVER=your_server_name
DB_NAME=TF_genie
DB_USER=your_username
DB_PASSWORD=your_password
```

### Azure OpenAI Setup

1. Create an Azure OpenAI resource
2. Deploy a GPT-4 model
3. Add credentials to `.env`:
```env
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_DEPLOYMENT=gpt-4
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

## 📊 Database Schema

### tf_docs_needed
- `DocsNeededID` (PK) - Auto-increment ID
- `SampleNo` - Sample number
- `Description` - Document description
- `LCType` - LC type (Sight, Usance, etc.)
- `Commodity` - Commodity information

### tf_docs_needed_detail
- `DetailID` (PK) - Auto-increment ID
- `DocsNeededID` (FK) - Reference to parent document
- `LineNo` - Line number
- `DocumentText` - Sub-document text

### tf_master_check
- `CheckID` (PK) - Auto-increment ID
- `UserID` - User identifier
- `DocsNeededID` (FK) - Reference to document
- `Status` - Checklist status
- `StartedAt` - Start timestamp
- `UpdatedAt` - Last update timestamp

### tf_master_check_detail
- `CheckDetailID` (PK) - Auto-increment ID
- `CheckID` (FK) - Reference to master check
- `DetailID` (FK) - Reference to document detail
- `Checked` - Checkbox state (0/1)
- `Narration` - User notes
- `Description` - Additional description
- `UpdatedAt` - Last update timestamp

## 🎨 UI Customization

The application uses custom CSS for styling. You can modify the appearance by editing the `st.markdown()` section in `app.py`:

- Badge colors for LC types
- Row background colors
- Spacing and padding
- Font sizes

## 🔒 Security Notes

- Store `.env` file securely and never commit it to version control
- Use strong database passwords
- Rotate Azure OpenAI API keys regularly
- Implement proper authentication in production

## 📝 License

This project is for internal use. All rights reserved.

## 🤝 Support

For issues or questions, contact your system administrator.
