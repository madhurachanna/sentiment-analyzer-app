import React from "react";
import { PredictionResponse, ResultsProps } from "../services/types";

const Results: React.FC<ResultsProps> = ({ results }) => {

  const getTagClass = (word: string, model: keyof PredictionResponse["p"]): string => {
    const imp = results?.p[model]?.importance
    if (!imp[word]) return "is-black"
    if (imp[word] > 0) return "is-primary"
    return "is-warning"
  }

  const getAllWords = (model: keyof PredictionResponse["p"]) => {
    const words = results?.text?.split(" ")
    console.log(words)
    return words?.map((word) => (
      <div className={"tag mr-1 " + getTagClass(word, model) } >{word}</div>
    ))
  }

  return (
    <div>
      {
        results &&
        <div>
          <div className="title is-size-3">Results:</div>
          <div className="card" style={{border: "1px solid gold"}}>
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
            <div className="card-footer pl-5 pt-2 pb-2">Logistic Regression (Best Model)
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
