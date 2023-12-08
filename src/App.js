import React from "react";
import classes from "./App.module.css";
import ValidationRulesList from "./components/ValidationRuleList";

const query = {
  me: {
    resource: "me",
  },
};

const MyApp = () => {
  const [selectedDataSet, setSelectedDataSet] = useState(null);

  const handleSelectDataSet = (dataSetId) => {
    setSelectedDataSet(dataSetId);
  };

  return (
    <>
      <div className={classes.container}>
        <DataQuery query={query}>
          {({ error, loading, data }) => {
            if (error) return <span>ERROR</span>;
            if (loading) return <span>...</span>;
            return (
              <>
                <h1>{i18n.t("Hello {{name}}", { name: data.me.name })}</h1>
                <h3>{i18n.t("Welcome to DHIS2!")}</h3>
              </>
            );
          }}
        </DataQuery>
        <ValidationRulesList datasetId={"BfMAe6Itzgt"}></ValidationRulesList>
      </div>
    </>
  );
};

export default MyApp;
