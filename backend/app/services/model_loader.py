import joblib
from app.config import MODEL_PATH

# Load all models & vectorizer once
tfidf_vectorizer = joblib.load(MODEL_PATH + "tfidf_vectorizer.pkl")
logistic_model = joblib.load(MODEL_PATH + "logistic_regression_model.pkl")
naive_bayes_model = joblib.load(MODEL_PATH + "naïve_bayes_model.pkl")
# random_forest_model = joblib.load(MODEL_PATH + "random_forest_model.pkl")


def get_models():
    return {
        "tfidf": tfidf_vectorizer,
        "logistic": logistic_model,
        "naive_bayes": naive_bayes_model,
        # "random_forest": random_forest_model,
    }
