from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.responses import JSONResponse
from .agents import ingestion, parsing, normalization, validation, kg, optimizer, query
from .orchestrator import Orchestrator

app = FastAPI()
orchestrator = Orchestrator()

@app.post("/api/ingest")
async def ingest_file(file: UploadFile = File(...), background_tasks: BackgroundTasks = None):
    ingestion_id = await ingestion.handle_upload(file)
    background_tasks.add_task(orchestrator.run_pipeline, ingestion_id)
    return {"ingestion_id": ingestion_id}

@app.get("/api/ingest/{ingestion_id}/status")
async def get_status(ingestion_id: str):
    return orchestrator.get_status(ingestion_id)

@app.post("/api/parse")
async def parse(ingestion_id: str):
    return parsing.parse(ingestion_id)

@app.post("/api/normalize")
async def normalize(ingestion_id: str):
    return normalization.normalize(ingestion_id)

@app.post("/api/validate")
async def validate(ingestion_id: str):
    return validation.validate(ingestion_id)

@app.post("/api/kg/upsert")
async def upsert_kg(ingestion_id: str):
    return kg.upsert(ingestion_id)

@app.post("/api/optimize")
async def optimize(voyage_id: str):
    return optimizer.optimize(voyage_id)

@app.post("/api/query")
async def run_query(query_text: str):
    return query.answer(query_text)

@app.get("/health")
def health():
    return {"status": "ok"}