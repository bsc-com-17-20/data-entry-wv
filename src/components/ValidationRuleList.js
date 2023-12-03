import { useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import ValidationRule from "./ValidationRule";

const validationRuleList = ({ datasetId }) => {
  const validationRulesQuery = {
    validationRules: {
      resource: "validationRules",
      params: {
        dataSet: `${datasetId}`,
        fields: "id,name,operator,leftSide,rightSide",
        // filter: `dataset.id:eq:${datasetId}`,
      },
    },
  };

  const { loading, error, data, refetch } = useDataQuery(validationRulesQuery);

  useEffect(() => {
    refetch({ variables: { datasetId } });
  }, [datasetId, refetch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ValidationRule validationRules={data.validationRules.validationRules} />
  );
};

export default validationRuleList;
