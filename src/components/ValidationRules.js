import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import classes from "../App.module.css";

// This query retrieves validation rules for a specific dataSet
const validationRulesQuery = {
  validationRules: {
    resource: "validationRules",
    params: ({ dataSetId }) => ({
      dataSet: `${dataSetId}`,
      fields: "id,displayName,leftSide,rightSide",
      // filter: `dataSet.id:eq:${dataSetId}`,
    }),
  },
};

const ValidationRules = ({ dataSetId }) => {
  const { loading, error, data, refetch } = useDataQuery(validationRulesQuery);

  useEffect(() => {
    refetch({ dataSetId });
  }, [dataSetId]);

  return (
    <div>
      {error && `Error: ${error.message}`}
      {loading && `Loading...`}
      {data && (
        <div>
          <button className={classes.button__validation}>Validation Rules
          <ul>
            {data.validationRules.validationRules.map((rule) => (
              <li key={rule.id}>
                {rule.displayName} - {rule.leftSide.expression} -{" "}
                {rule.rightSide.expression}
              </li>
            ))}
          </ul>
          </button>
        </div>
      )}
    </div>
  );
};

export default ValidationRules;
