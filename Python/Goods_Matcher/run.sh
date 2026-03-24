#!/bin/bash

# Goods Matching System - Startup Script

echo "======================================"
echo "  Goods Matching System"
echo "======================================"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "ERROR: .env file not found!"
    echo "Please create a .env file with your configuration."
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3.11 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install/update requirements
echo "Installing dependencies..."
pip install -r requirements.txt --quiet

# Create necessary directories
mkdir -p logs data

echo ""
echo "Starting Streamlit application..."
echo "Access the application at: http://localhost:8501"
echo ""

# Run Streamlit
streamlit run app.py --server.port=8501 --server.address=0.0.0.0
