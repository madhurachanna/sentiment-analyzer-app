import numpy as np
from app.services.model_loader import get_models
import re

# Load models
models = get_models()
tfidf_vectorizer = models["tfidf"]

# Function to clean and tokenize text
def tokenize_text(text):
    return set(re.findall(r'\b\w+\b', text.lower()))  # Extracts words, ignoring punctuation

# Prediction function
def get_prediction(model, sentence):
    X_tfidf = tfidf_vectorizer.transform([sentence])

    # Predict sentiment
    sentiment_label = model.predict(X_tfidf)[0]
    sentiment = "Positive" if sentiment_label == 1 else "Negative"

    # Get probability scores (if applicable)
    positive_prob, negative_prob = None, None
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(X_tfidf)[0]
        positive_prob, negative_prob = round(probs[1], 3), round(probs[0], 3)

    # Extract word importance
    feature_names = tfidf_vectorizer.get_feature_names_out()
    input_words = tokenize_text(sentence)  # Extract words from input text
    word_importance = {}

    if hasattr(model, "coef_"):  # Logistic Regression & Naïve Bayes (if in coefficient form)
        importance_scores = model.coef_[0] * X_tfidf.toarray()[0]
        word_importance = {
            word: round(score, 3)
            for word, score in zip(feature_names, importance_scores)
            if score != 0 and word in input_words  # Filter by input words
        }

    elif hasattr(model, "feature_log_prob_"):  # Naïve Bayes (if in log prob form)
        log_prob_pos = model.feature_log_prob_[1]  # Positive class log probabilities
        log_prob_neg = model.feature_log_prob_[0]  # Negative class log probabilities
        importance_scores = np.exp(log_prob_pos) - np.exp(log_prob_neg)
        word_importance = {
            word: round(score, 3)
            for word, score in zip(feature_names, importance_scores)
            if score != 0 and word in input_words  # Filter by input words
        }

    elif hasattr(model, "feature_importances_"):  # Random Forest feature importance
        importance_scores = model.feature_importances_
        word_importance = {
            word: round(score, 3)
            for word, score in zip(feature_names, importance_scores)
            if score > 0 and word in input_words  # Filter by input words
        }

    return {
        "sentiment": sentiment,
        "importance": word_importance,
        "positive_prob": positive_prob,
        "negative_prob": negative_prob,
    }
