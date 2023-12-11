import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import { ReactFinalForm, InputFieldFF, Button, hasValue } from "@dhis2/ui";

const { Form, Field } = ReactFinalForm;

const DataSetElementsQuery = {
  dataSets: {
    resource: "dataSets",
    id: ({ dataSetId }) => dataSetId,
    params: {
      fields:
        "displayName,dataSetElements[dataElement[id,valueType,displayName]]",
    },
  },
};
const DataEntryForm = ({ dataSetId }) => {
  const { loading, error, data, refetch } = useDataQuery(DataSetElementsQuery);
  const onSubmit = (values) => {
    console.log(values);
  };
  const alertValues = (values) => {
    const formattedValuesString = JSON.stringify(values, null, 2);
    alert(formattedValuesString);
  };
  useEffect(() => {
    refetch({ dataSetId });
  }, [dataSetId]);
  return (
    <div>
      {error && `Error: ${error.message}`}
      {loading && `Loading...`}
      {/* {data && (
        <>
          <p>{data.dataSets.displayName}</p>
          <ul>
            {data.dataSets.dataSetElements.map((dataElement) => (
              <li key={dataElement.dataElement.id}>
                {dataElement.dataElement.displayName} -{" "}
                {dataElement.dataElement.valueType}
              </li>
            ))}
          </ul>
        </>
      )} */}
      {data && (
        <div>
          <h1>{data.dataSets.displayName}</h1>
          <Form
            onSubmit={alertValues}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {data.dataSets.dataSetElements.map((dataElement) => (
                  <div key={dataElement.dataElement.id}>
                    <Field
                      name={dataElement.dataElement.displayName}
                      label={dataElement.dataElement.displayName}
                      component={InputFieldFF}
                      type={dataElement.dataElement.valueType}
                      validate={hasValue}
                    ></Field>
                  </div>
                ))}
                <div>
                  <Button type="submit" primary>
                    Submit
                  </Button>
                </div>
              </form>
            )}
          ></Form>
        </div>
      )}
    </div>
  );
};

export default DataEntryForm;
