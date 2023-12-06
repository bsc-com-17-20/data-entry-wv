import { useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import ValidationRule from "./ValidationRule";

const ValidationRuleList = ({ dataSetId }) => {
  const validationRulesQuery = {
    validationRules: {
      resource: "validationRules",
      params: {
        dataSet: `${dataSetId}`,
        // dataSet: "BfMAe6Itzgt",
        fields: "id,name,operator,leftSide,rightSide",
        // filter: `dataset.id:eq:${datasetId}`,
      },
    },
  };

  const { loading, error, data, refetch } = useDataQuery(validationRulesQuery);

  useEffect(() => {
    refetch({ variables: { dataSetId } });
  }, [dataSetId, refetch]);

  if (loading) {
    return (
      <>
        <p>Loading</p>
        <CircularLoader></CircularLoader>
      </>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <p>{dataSetId}</p>
      <ValidationRule validationRules={data.validationRules.validationRules} />
    </>
  );
};

export default ValidationRuleList;
