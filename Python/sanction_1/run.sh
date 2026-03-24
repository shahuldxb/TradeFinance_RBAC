#!/bin/bash

# Sanctions Screening Application Startup Script

echo "========================================="
echo "Sanctions Screening System"
echo "========================================="
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3.11 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install/upgrade dependencies
echo "Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo ""
echo "Starting Streamlit application..."
echo "Access the app at: http://localhost:8501"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================="
echo ""

# Run Streamlit
streamlit run app.py --server.port=8501 --server.address=0.0.0.0
