interface ModelPrediction {
  sentiment: "Positive" | "Negative";
    importance: any // Adjust type if the structure is known
  positive_prob: number;
  negative_prob: number;
}

export interface PredictionResponse {
  p: {
    logistic: ModelPrediction;
    naive_bayes:  ModelPrediction;
    // random_forest:  ModelPrediction;
  };
  text: string;
}

export interface SentenceInput {
  text: string;
}

export interface InputProps {
  loading: boolean;
  handleSubmit: () => void;
  handleInputChange: (value: string) => void;
}

export interface ResultsProps {
  results: PredictionResponse | null
}
