import React from "react";
import "../css/TryOurDatasets.css";

export default function TryOurDatasets() {
  function handleTryOurDatasets() {
    alert("Here is a list of pre-loaded datasets in CSV format.");
  }

  return (
    <button className="try-our-datasets" onClick={handleTryOurDatasets}>
      Try Our Datasets
    </button>
  );
}
