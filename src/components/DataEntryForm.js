import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import {
  ReactFinalForm,
  InputFieldFF,
  FileInputFieldFF,
  TextAreaFieldFF,
  Button,
  hasValue,
  CheckboxFieldFF,
} from "@dhis2/ui";
import classes from "../App.module.css";
import evaluateExpression from "../utils/evaluateExpression";

const { Form, Field, useField } = ReactFinalForm;

const DataSetElementsQuery = {
  dataSets: {
    resource: "dataSets",
    id: ({ dataSetId }) => dataSetId,
    params: {
      fields:
        "displayName,dataSetElements[dataElement[id,valueType,displayName]]",
    },
  },
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
    if (!loading && data) {
      data.validationRules.validationRules.forEach((rule) => {
        const leftValue = evaluateExpression(rule.leftSide.expression, values);
        const rightValue = evaluateExpression(
          rule.rightSide.expression,
          values
        );

        console.log(rule.operator);
        switch (rule.operator) {
          case "equal_to":
            if (leftValue !== rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "not_equal_to":
            if (leftValue === rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "greater_than":
            if (leftValue <= rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "greater_than_or_equal_to":
            if (leftValue < rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "less_than":
            if (leftValue >= rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "less_than_or_equal_to":
            if (leftValue > rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "compulsory_pair":
            if (leftValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "exclusive_pair":
            if (leftValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          default:
            break;
        }
      });
    }
    console.log(errors);
    return errors;
  };

  const typeMapping = {
    BOOLEAN: "checkbox",
    FILE_RESOURCE: "file",
  };
  const fieldTypeMapping = {
    BOOLEAN: CheckboxFieldFF,
    FILE_RESOURCE: FileInputFieldFF,
    LONG_TEXT: TextAreaFieldFF,
  };

  const Error = ({ name }) => {
    const {
      meta: { touched, error },
    } = useField(name, { subscription: { touched: true, error: true } });
    console.log(error);
    return touched && error ? <span>{error}</span> : null;
  };

  return (
    <div>
      {error && `Error: ${error.message}`}
      {loading && `Loading...`}
      {data && (
        <div className={classes.forms__design}>
          <div>
            <h1>{data.dataSets.displayName}</h1>
            <Form
              onSubmit={alertValues}
              validate={validate}
              render={({
                handleSubmit,
                values,
                reset,
                submitting,
                pristine,
              }) => (
                <form onSubmit={handleSubmit}>
                  {data.dataSets.dataSetElements.map((dataElement) => (
                    <div key={dataElement.dataElement.id}>
                      <Field
                        name={dataElement.dataElement.id}
                        label={dataElement.dataElement.displayName}
                        component={
                          fieldTypeMapping[dataElement.dataElement.valueType] ||
                          InputFieldFF
                        }
                        type={
                          typeMapping[dataElement.dataElement.valueType] ||
                          dataElement.dataElement.valueType
                        }
                        validate={hasValue}
                        placeholder={`${dataElement.dataElement.valueType} and ${dataElement.dataElement.id}`}
                      ></Field>
                      <Error name={dataElement.dataElement.id} />
                    </div>
                  ))}
                  <div className={classes.submit__button}>
                    <Button type="submit" primary disabled={submitting}>
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
