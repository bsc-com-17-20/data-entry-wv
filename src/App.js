import React from "react";
import classes from "./App.module.css";
import ValidationRules from "./components/ValidationRules";
import DataSetPicker from "./components/DataSetPicker";
import { CircularLoader } from "@dhis2/ui";
import { useState } from "react";
import OrganisationUnit from "./components/OrganisationUnit"

const MyApp = () => {
  const [selectedDataSet, setSelectedDataSet] = useState(null);

  const handleSelectDataSet = (dataSetId) => {
    setSelectedDataSet(dataSetId);
  };

  return (
    <div className={classes.container}>
      <DataSetPicker onSelectDataSet={handleSelectDataSet} />
      {selectedDataSet && <ValidationRules dataSetId={selectedDataSet} />}
      <OrganisationUnit/>
    </div>
  );
};

export default MyApp;
