from fastapi import APIRouter, HTTPException, Query
from customerPortal.import_lc_service import fetch_all_import_lc, fetch_records_by_rim

router = APIRouter(
    prefix="/api/lc",
    tags=["Import LC"]
)

@router.get("/list")
def get_import_lc_list():
    data = fetch_all_import_lc()

    return {
        "status": "success",
        "count": len(data),
        "data": data
    }


@router.get("/customer-record")
def get_customer_record(
    table: str = Query(..., min_length=1),
    rim_no: str = Query(..., min_length=1)
):
    try:
        data = fetch_records_by_rim(table, rim_no)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    return {
        "status": "success",
        "count": len(data),
        "data": data
    }
