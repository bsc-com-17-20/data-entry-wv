import React from "react";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import classes from "./App.module.css";
import DataSetList from "./components/DataSetList";
import ValidationRuleList from "./components/ValidationRuleList";
import { CircularLoader } from "@dhis2/ui";
import { useEffect, useState } from "react";

const query = {
  me: {
    resource: "me",
  },
};

const dataSetQuery = {
  dataSets: {
    resource: "dataSets",
    params: {
      fields: "id,name",
    },
  },
};

const MyApp = () => {
  const [dataSetId, setDataSetId] = useState("");
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
        <DataQuery query={dataSetQuery}>
          {({ error, loading, data }) => {
            if (error) return <span>ERROR</span>;
            if (loading) return <CircularLoader />;
            if (dataSetId.length === 0)
              return (
                <>
                  <DataSetList
                    dataSets={data.dataSets.dataSets}
                    setDataSetId={setDataSetId}
                  />
                </>
              );
            return (
              <div>
                <DataSetList
                  dataSets={data.dataSets.dataSets}
                  setDataSetId={setDataSetId}
                />
                <h1>{dataSetId}</h1>;
                <ValidationRuleList dataSetId={dataSetId} />
              </div>
            );
          }}
        </DataQuery>
      </div>
    </>
  );
};

export default MyApp;
