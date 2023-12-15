import React from "react";
import classes from "./App.module.css";
import ValidationRules from "./components/ValidationRules";
import DataSetPicker from "./components/DataSetPicker";
import OrgUnitPicker from "./components/OrgUnitPicker";
import ProgramPicker from "./components/ProgramPicker";
import DataEntryForm from "./components/DataEntryForm";
import { ButtonStrip } from "@dhis2/ui";
import { useState } from "react";
import Period from "./components/Period";

const MyApp = () => {
  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [selectedOrgUnit, setSelectedOrgUnit] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleSelectDataSet = (dataSetId) => {
    setSelectedDataSet(dataSetId);
    setSelectedOrgUnit(null);
  };

  const handleSelectOrgUnit = (orgUnitId) => {
    setSelectedOrgUnit(orgUnitId);
  };

  const handleSelectProgram = (programId) => {
    setSelectedProgram(programId);
  };

  return (
  <div className={classes.background}>
    <div className={classes.container}>
      <div className={classes.button__container}>
        <ButtonStrip middle>
          <DataSetPicker onSelectDataSet={handleSelectDataSet} />
          <OrgUnitPicker
            onSelectOrgUnit={handleSelectOrgUnit}
            dataSetId={selectedDataSet || "lyLU2wR22tC"}
          />
          <ProgramPicker
            organizationUnitId={selectedOrgUnit || "y77LiPqLMoq"}
            onSelectProgram={handleSelectProgram}
          />
          <Period/>
        </ButtonStrip>
      </div>
      <div>
      {selectedDataSet && selectedOrgUnit && (
          <ValidationRules dataSetId={selectedDataSet} />
        )}
        {selectedDataSet && selectedOrgUnit && (
          <DataEntryForm dataSetId={selectedDataSet} />
        )}
      </div>
    </div>
  </div>  
  );
};

export default MyApp;
