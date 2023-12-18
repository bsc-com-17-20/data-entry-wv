// ValidationRulesButton.js

import React, { useState } from "react";
import { Button } from "@dhis2/ui";
import ValidationRules from "./ValidationRules";

const ValidationRulesButton = ({ dataSetId }) => {
  const [showValidationRules, setShowValidationRules] = useState(false);

  const handleToggleValidationRules = () => {
    setShowValidationRules(!showValidationRules);
  };

  return (
    <div className={classes.validationRulesButton}>
      <Button onClick={handleToggleValidationRules}>
        {showValidationRules ? "Hide Validation Rules" : "Show Validation Rules"}
      </Button>
      {showValidationRules && <ValidationRules dataSetId={dataSetId} />}
    </div>
  );
};

export default ValidationRulesButton;
