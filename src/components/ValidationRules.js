import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";

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
          <p>Validation Rules for DataSet {dataSetId}:</p>
          <ul>
            {data.validationRules.validationRules.map((rule) => (
              <li key={rule.id}>
                {rule.displayName} - {rule.leftSide.expression} -{" "}
                {rule.rightSide.expression}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ValidationRules;
