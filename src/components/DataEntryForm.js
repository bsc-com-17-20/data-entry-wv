import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import { ReactFinalForm, InputFieldFF, Button, hasValue } from "@dhis2/ui";
import classes from "../App.module.css";
import evaluateExpression from "../utils/evaluateExpression";

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

  useEffect(() => {
    refetch({ dataSetId });
  }, [dataSetId]);

  const onSubmit = (values) => {
    console.log(values);
  };
  const alertValues = (values) => {
    const formattedValuesString = JSON.stringify(values, null, 2);
    alert(formattedValuesString);
  };

  const validate = (values) => {
    const errors = {};
    fetchData(dataSetId).forEach((rule) => {
      // const leftValue = values[rule.leftSide.expression];
      // const rightValue = values[rule.rightSide.expression];
      const leftValue = evaluateExpression(rule.leftSide.expression, values);
      const rightValue = evaluateExpression(rule.rightSide.expression, values);

      switch (rule.operator) {
        case "equal_to":
          if (leftValue !== rightValue) {
            errors[rule.id] = `${rule.name} must be equal to ${rightValue}`;
          }
          break;
        case "not_equal_to":
          if (leftValue === rightValue) {
            errors[rule.id] = `${rule.name} must not be equal to ${rightValue}`;
          }
          break;
        case "greater_than":
          if (leftValue <= rightValue) {
            errors[rule.id] = `${rule.name} must be greater than ${rightValue}`;
          }
          break;
        case "greater_than_or_equal_to":
          if (leftValue < rightValue) {
            errors[
              rule.id
            ] = `${rule.name} must be greater than or equal to ${rightValue}`;
          }
          break;
        case "less_than":
          if (leftValue >= rightValue) {
            errors[rule.id] = `${rule.name} must be less than ${rightValue}`;
          }
          break;
        case "less_than_or_equal_to":
          if (leftValue > rightValue) {
            errors[
              rule.id
            ] = `${rule.name} must be less than or equal to ${rightValue}`;
          }
          break;
        case "compulsory_pair":
          if (leftValue) {
            errors[
              rule.id
            ] = `If ${rule.name} exists then ${rightValue} must exist`;
          }
          break;
        case "exclusive_pair":
          if (leftValue) {
            errors[
              rule.id
            ] = `If ${rule.name} exists then ${rightValue} must not exist`;
          }
          break;
        default:
          break;
      }
    });
  };

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
        <div className={classes.forms__design}>
          <div>
            <h1>{data.dataSets.displayName}</h1>
            <Form
              onSubmit={alertValues}
              validate={validate}
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
                        placeholder={dataElement.dataElement.valueType}
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
        </div>
      )}
    </div>
  );
};

export default DataEntryForm;
