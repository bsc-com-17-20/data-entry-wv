import React from "react";
import classes from "./App.module.css";
import ValidationRules from "./components/ValidationRules";
import DataSetPicker from "./components/DataSetPicker";
import OrgUnitPicker from "./components/OrgUnitPicker";
import ProgramPicker from "./components/ProgramPicker";
import DataEntryForm from "./components/DataEntryForm";
import { ButtonStrip } from "@dhis2/ui";
import { useState } from "react";
import { Button } from "@dhis2/ui";

const MyApp = () => {
  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [selectedOrgUnit, setSelectedOrgUnit] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showValidationRules, setShowValidationRules] = useState(false);

  const handleSelectDataSet = (dataSetId) => {
    setSelectedDataSet(dataSetId);
  };

  const handleSelectOrgUnit = (orgUnitId) => {
    setSelectedOrgUnit(orgUnitId);
  };

  const handleSelectProgram = (programId) => {
    setSelectedProgram(programId);
  };

  const handleToggleValidationRules = () => {
    setShowValidationRules(!showValidationRules);
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
          </ButtonStrip>
        </div>
        <div>
          <div className={classes.validationRulesButton}>
            <Button onClick={handleToggleValidationRules}>
              {showValidationRules
                ? "Hide Validation Rules"
                : "Show Validation Rules"}
            </Button>
            {showValidationRules && (
              <ValidationRules dataSetId={selectedDataSet} />
            )}
          </div>
          {selectedDataSet && selectedOrgUnit && (
            <DataEntryForm dataSetId={selectedDataSet} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApp;
