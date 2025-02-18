import React from "react";
import { PredictionResponse, ResultsProps } from "../services/types";
import StarRating from "./starRating";

const Results: React.FC<ResultsProps> = ({ results }) => {
const getTagClass = (word: string, model: keyof PredictionResponse["p"]): React.CSSProperties => {
  const imp = results?.p[model]?.importance;

  if (!imp || !imp[word]) return { backgroundColor: "initial"};

  const importanceValue = imp[word];

  const alpha = typeof importanceValue === 'number' ? Math.max(0, Math.min(1, Math.abs(importanceValue))) : 1; // Alpha based on absolute value

  let bgColor;

  if (typeof importanceValue === 'number' && importanceValue > 0) {
    bgColor = `rgba(0, 255, 0, ${alpha})`; // Green if positive
  } else if (typeof importanceValue === 'number' && importanceValue < 0) {
    bgColor = `rgba(255, 0, 0, ${alpha})`; // Red if negative
  } else {
      bgColor = `rgba(255,255,0, ${alpha})`; // Yellow if 0 or other value
  }

  return { backgroundColor: bgColor };
};

const getAllWords = (model: keyof PredictionResponse["p"]) => {
  const words = results?.text?.split(" ");

  return words?.map((word, index) => ( // Add a unique key prop
    <div key={index} className="tag mr-1 has-text-white" style={getTagClass(word, model)}>
      {word}
    </div>
  ));
};
  // const getTagClass = (word: string, model: keyof PredictionResponse["p"]): object => {
  //   const imp = results?.p[model]?.importance
  //   if (!imp[word]) return ({})
  //   if (imp[word] > 0) return ({ background: rgb(255, 0, 0, imp[word])})
  //   return ({ background: rgb(255, 0, 0, imp[word])})
  // }

  // const getAllWords = (model: keyof PredictionResponse["p"]) => {
  //   const words = results?.text?.split(" ")
  //   console.log(words)
  //   return words?.map((word) => (
  //     <div className="tag mr-1" style={getTagClass(word, model)}>{word}</div>
  //   ))
  // }

  return (
    <div>
      {
        results &&
        <div>
          <div className="title is-size-3">Results:</div>
          <div className="card" >
            <header className="card-header pl-3">
              <p className={
                "card-header-title is-size-3 " +
                    (results.p["logistic"].sentiment === "Positive"
                      ? "has-text-primary"
                      : "has-text-danger")}>
                {results.p["logistic"].sentiment}
              </p>
            </header>
            <div className="card-content">
              {getAllWords("logistic")}
              <div className="mt-5">
                <div>
                  Probability of Positive Sentement:
                  <span className="has-text-primary ml-1">
                    {results.p["logistic"].positive_prob}
                  </span>
                </div>
                <div>
                  Probability of Negative Sentement:
                  <span className="has-text-danger ml-1">
                    {results.p["logistic"].negative_prob}
                  </span>
                </div>
              </div>
            </div>
          </div>

        <div className="mt-4"> Help us improve! How accurate and helpful did you find this tool?
        </div>
        <StarRating initialRating={0} onRatingChange={() => {}} />

          {/*

          <div className="card" >
            <header className="card-header pl-3">
              <p className={
                "card-header-title is-size-3 " +
                        (results.p["logistic"].sentiment === "Positive"
                          ? "has-text-primary"
                          : "has-text-danger")}>
                {results.p["logistic"].sentiment}
              </p>
            </header>
            <div className="card-content">
              {getAllWords("naive_bayes")}
              <div className="mt-5">
                <div>
                        Probability of Positive Sentement:
                  <span className="has-text-primary ml-1">
                    {results.p["naive_bayes"].positive_prob}
                  </span>
                </div>
                <div>
                        Probability of Negative Sentement:
                  <span className="has-text-danger ml-1">
                    {results.p["naive_bayes"].negative_prob}
                  </span>
                </div>
              </div>
            </div>
            <div className="card-footer pl-5 pt-2 pb-2">Naïve Bayes
            </div>
          </div>
          <div className="card" >
            <header className="card-header pl-3">
              <p className={
                "card-header-title is-size-3 " +
                        (results.p["logistic"].sentiment === "Positive"
                          ? "has-text-primary"
                          : "has-text-danger")}>
                {results.p["logistic"].sentiment}
              </p>
            </header>
            <div className="card-content">
              {getAllWords("random_forest")}
              <div className="mt-5">
                <div>
                        Probability of Positive Sentement:
                  <span className="has-text-primary ml-1">
                    {results.p["random_forest"].positive_prob}
                  </span>
                </div>
                <div>
                        Probability of Negative Sentement:
                  <span className="has-text-danger ml-1">
                    {results.p["random_forest"].negative_prob}
                  </span>
                </div>
              </div>
            </div>
            <div className="card-footer pl-5 pt-2 pb-2">Random Forest
            </div>
          </div>

            */}
        </div>
      }
    </div>
  )

}

export default Results
