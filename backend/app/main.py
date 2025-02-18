from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.services.model_loader import get_models
from app.services.prediction import get_prediction

app = FastAPI()
models = get_models()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Input model
class SentenceInput(BaseModel):
    text: str

class Rating(BaseModel):
    count: int


@app.post("/predict/")
def predict_sentiment(input_data: SentenceInput):
    print(input_data)
    sentence = input_data.text
    return {
        "p": {
            "logistic": get_prediction(models["logistic"], sentence),
            "naive_bayes": get_prediction(models["naive_bayes"], sentence),
            # "random_forest": get_prediction(models["random_forest"], sentence),
        },
        "text": sentence
    }

@app.post("/rating/")
def save_rating(input_data: Rating):
    print(input_data.count)
    return


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
