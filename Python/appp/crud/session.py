# app/crud/session.py

import os
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Dict

from core.db import get_connection_OCR
from loguru import logger


def create_session(session_data: Dict):
    try:
        conn = get_connection_OCR()
        cursor = conn.cursor()

        user_id = session_data.get("user_id")

        # ✅ Safe fallback: support both keys
        variations = (
            session_data.get("variations")  # first priority
            or session_data.get("variation") # fallback
            or None                           # default NULL
        )

        query = """
        INSERT INTO SB_TF_ingestion_Box
        (
            cifno,
            customer_ID,
            customer_name,
            accountName,
            customer_type,
            lc_number,
            instrument,
            variations,
            lifecycle,
            userId,
            status,
            createdAt,
            updatedAt,
            iterations
        )
        OUTPUT INSERTED.*
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
        """

        cursor.execute(
            query,
            session_data["cifno"],
            session_data["customer_ID"],
            session_data["customer_name"],
            session_data["accountName"],
            session_data["customer_type"],
            session_data["lc_number"],
            session_data["instrument"],
            variations,                 # ✅ safe insert
            session_data["lifecycle"],
            user_id,
            "created",
            datetime.utcnow(),
            datetime.utcnow(),
        )

        row = cursor.fetchone()
        conn.commit()

        return dict(zip([c[0] for c in cursor.description], row))

    except Exception:
        logger.exception("Error creating session")
        raise
    finally:
        conn.close()


def get_all_sessions(user_id: Optional[str] = None) -> List[Dict]:
    try:
        conn = get_connection_OCR()
        cursor = conn.cursor()

        query = """
        SELECT
            *
        FROM SB_TF_ingestion_Box
        """

        params = []
        if user_id:
            query += " WHERE userId = ?"
            params.append(user_id)

        query += " ORDER BY createdAt DESC"

        cursor.execute(query, params)
        columns = [c[0] for c in cursor.description]

        return [dict(zip(columns, row)) for row in cursor.fetchall()]

    except Exception:
        logger.exception("Error fetching sessions")
        raise
    finally:
        conn.close()



def get_session_by_id(session_id: str) -> Optional[Dict]:
    try:
        conn = get_connection_OCR()
        cursor = conn.cursor()

        query = """
        SELECT *
        FROM SB_TF_ingestion_Box
        WHERE id = ?
        """

        cursor.execute(query, session_id)
        row = cursor.fetchone()

        if not row:
            return None

        return dict(zip([c[0] for c in cursor.description], row))

    except Exception:
        logger.exception("Error fetching session")
        raise
    finally:
        conn.close()


def update_session_status(session_id: str, status: str) -> Dict:
    try:
        conn = get_connection_OCR()
        cursor = conn.cursor()

        query = """
        UPDATE SB_TF_ingestion_Box
        SET status = ?, updatedAt = ?
        OUTPUT INSERTED.*
        WHERE id = ?
        """

        cursor.execute(query, status, datetime.utcnow(), session_id)
        row = cursor.fetchone()
        conn.commit()

        return dict(zip([c[0] for c in cursor.description], row))

    except Exception:
        logger.exception("Error updating session status")
        raise
    finally:
        conn.close()


def increment_iteration(session_id: str) -> Dict:
    try:
        conn = get_connection_OCR()
        cursor = conn.cursor()

        query = """
        UPDATE SB_TF_ingestion_Box
        SET iterations = iterations + 1,
            updatedAt = ?
        OUTPUT INSERTED.*
        WHERE id = ?
        """

        cursor.execute(query, datetime.utcnow(), session_id)
        row = cursor.fetchone()
        conn.commit()

        return dict(zip([c[0] for c in cursor.description], row))

    except Exception:
        logger.exception("Error incrementing iteration")
        raise
    finally:
        conn.close()


def delete_session(session_id: str) -> Dict:
    try:
        conn = get_connection_OCR()
        cursor = conn.cursor()

        session = get_session_by_id(session_id)
        if not session:
            raise ValueError("Session not found")

        cursor.execute(
            "DELETE FROM SB_TF_ingestion_Box WHERE id = ?",
            session_id
        )
        conn.commit()

        return {
            "success": True,
            "deletedSession": session
        }

    except Exception:
        logger.exception("Error deleting session")
        raise
    finally:
        conn.close()





def create_customer(customer_data: Dict) -> Dict:
    """
    Inserts a new customer into OF_Customer_details and returns the inserted row as a dictionary.
    If the customer already exists (by customer_ID), returns the existing row instead.
    """

    conn = None
    try:
        conn = get_connection_OCR()
        cursor = conn.cursor()

        user_id = customer_data.get("user_id")
        if not user_id:
            raise ValueError("user_id is required to insert a customer")

        # ✅ Safe fallback for variations
        variations = (
            customer_data.get("variations")      # first priority
            or customer_data.get("variation")     # fallback
            or None                               # default NULL
        )

        # 1️⃣ Check if customer already exists
        cursor.execute(
            "SELECT * FROM OF_Customer_details WHERE customer_ID = ?",
            customer_data["customer_ID"]
        )
        existing = cursor.fetchone()
        if existing:
            return dict(zip([c[0] for c in cursor.description], existing))

        # 2️⃣ Insert new customer
        query = """
        INSERT INTO OF_Customer_details
        (
            sessionId,
            cifno,
            customer_ID,
            customer_name,
            accountName,
            customer_type,
            lc_number,
            instrument,
            variations,
            lifecycle,
            userId,
            createdAt,
            updatedAt
        )
        OUTPUT INSERTED.*
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """

        cursor.execute(
            query,
            customer_data["sessionId"],
            customer_data["cifno"],
            customer_data["customer_ID"],
            customer_data["customer_name"],
            customer_data["accountName"],
            customer_data["customer_type"],
            customer_data.get("lc_number"),
            customer_data.get("instrument"),
            variations,                         # ✅ always saved
            customer_data.get("lifecycle"),
            user_id,
            datetime.utcnow(),
            datetime.utcnow(),
        )

        row = cursor.fetchone()
        conn.commit()

        return dict(zip([c[0] for c in cursor.description], row))

    except Exception:
        logger.exception("Error creating customer")
        raise
    finally:
        if conn:
            conn.close()


def get_customer(cif_number: str | None = None, customer_id: str | None = None):
    try:
        conn = get_connection_OCR()
        cursor = conn.cursor()

        query = """
        SELECT TOP 1
            cifno,
            customer_ID,
            customer_name,
            accountName,
            customer_type
        FROM OF_Customer_details
        WHERE
            (cifno = ? AND ? IS NOT NULL)
            OR
            (customer_ID = ? AND ? IS NOT NULL)
        """

        cursor.execute(
            query,
            cif_number, cif_number,
            customer_id, customer_id
        )

        row = cursor.fetchone()
        if not row:
            return None

        columns = [c[0] for c in cursor.description]
        return dict(zip(columns, row))

    finally:
        conn.close()
