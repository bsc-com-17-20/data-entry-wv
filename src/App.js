import React from "react";
import classes from "./App.module.css";
import ValidationRules from "./components/ValidationRules";
import DataSetPicker from "./components/DataSetPicker";
import OrgUnitPicker from "./components/OrgUnitPicker";
import ProgramPicker from "./components/ProgramPicker";
import DataEntryForm from "./components/DataEntryForm";
import { CircularLoader } from "@dhis2/ui";
import { useState } from "react";
import Period from "./components/Period";

const MyApp = () => {
  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [selectedOrgUnit, setSelectedOrgUnit] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleSelectDataSet = (dataSetId) => {
    setSelectedDataSet(dataSetId);
  };

  const handleSelectOrgUnit = (orgUnitId) => {
    setSelectedOrgUnit(orgUnitId);
  };

  const handleSelectProgram = (programId) => {
    setSelectedProgram(programId);
  };

  return (
    <div className={classes.container}>
      <div className={classes.button__container}>
        <DataSetPicker onSelectDataSet={handleSelectDataSet} />
        {selectedDataSet && (
          <OrgUnitPicker
            onSelectOrgUnit={handleSelectOrgUnit}
            dataSetId={selectedDataSet}
          />
        )}
        <ProgramPicker
          organizationUnitId={selectedOrgUnit}
          onSelectProgram={handleSelectProgram}
        />
      </div>
      <div>
        {selectedDataSet && <ValidationRules dataSetId={selectedDataSet} />}
        {selectedDataSet && selectedOrgUnit && (
          <DataEntryForm dataSetId={selectedDataSet} />
        )}
      </div>
    </div>
  );
};

export default MyApp;
