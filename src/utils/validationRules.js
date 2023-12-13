import { useDataQuery } from "@dhis2/app-runtime";

const validationRulesQuery = {
  validationRules: {
    resource: "validationRules",
    params: ({ dataSetId }) => ({
      dataSet: `${dataSetId}`,
      fields:
        "id,displayName,leftSide,rightSide,operator,displayInstruction,displayDescription",
      // filter: `dataSet.id:eq:${dataSetId}`,
    }),
  },
};

function fetchData({ dataSetId }) {
  return new Promise((resolve, reject) => {
    const { loading, error, data, refetch } =
      useDataQuery(validationRulesQuery);

    if (error) {
      reject(error);
    }

    if (!loading && data) {
      resolve(data);
    }

    // If you want to expose the refetch function as well, you can include it in the resolved object
    // resolve({ data, refetch });
  });
}

export default fetchData;
