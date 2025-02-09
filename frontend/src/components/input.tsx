import React from "react";
import { InputProps } from "../services/types";

const Input: React.FC<InputProps> = ({ loading, handleSubmit, handleInputChange }) => {
  return (
    <div className="field is-grouped mb-6">
      <p className="control is-expanded is-background-white">
        <input
          className="input as-background-light as-text-dark is-rounded"
          type="text"
          placeholder="Enter your text"
          disabled={loading}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) =>  e.key === "Enter" && handleSubmit()}
        />
      </p>
      <p className="control">
        <button
          onClick={handleSubmit}
          className={"button is-dark is-rounded " + (loading ? "is-loading" : "")}
          disabled={loading}>
          Submit
        </button>
      </p>
    </div>
  );
};

export default Input;
