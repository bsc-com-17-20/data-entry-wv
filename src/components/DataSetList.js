import { Button } from "@dhis2/ui";

const DataSetList = ({ dataSets, setDataSetId }) => {
  const handleOnClick = (dataSetId) => {
    setDataSetId(dataSetId);
  };
  return (
    <div>
      {dataSets.map((dataSet) => (
        <Button
          name="Primary button"
          primary
          large
          value="default"
          onClick={() => handleOnClick(dataSet.id)}
        >
          {dataSet.name}
        </Button>
      ))}
    </div>
    // <div key={dataSet.id} className={classes.button}>
    //   <h1>dataSet: {dataSet.name}</h1>
    //   <h2>{dataSet.id}</h2>
    //   {/* <ValidationRulesList datasetId={dataSet.id}></ValidationRulesList> */}
    // </div>
    //   ))}
  );
};

export default DataSetList;
