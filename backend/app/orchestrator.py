from .agents import parsing, normalization, validation, kg

class Orchestrator:
    def __init__(self):
        self.status = {}

    def run_pipeline(self, ingestion_id):
        self.status[ingestion_id] = {"stage": "parsing"}
        parsing.parse(ingestion_id)
        self.status[ingestion_id] = {"stage": "normalization"}
        normalization.normalize(ingestion_id)
        self.status[ingestion_id] = {"stage": "validation"}
        validation.validate(ingestion_id)
        self.status[ingestion_id] = {"stage": "kg"}
        kg.upsert(ingestion_id)
        self.status[ingestion_id] = {"stage": "done"}

    def get_status(self, ingestion_id):
        return self.status.get(ingestion_id, {"stage": "unknown"})