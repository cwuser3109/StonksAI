from fastapi import FastAPI
import pickle
import numpy as np

app = FastAPI()

# load your model
model = pickle.load(open("your_model.pkl", "rb"))

@app.get("/")
def home():
    return {"message": "API is running"}

@app.post("/predict")
def predict(data: dict):
    features = np.array(data["features"]).reshape(1, -1)
    prediction = model.predict(features)
    return {"prediction": prediction.tolist()}