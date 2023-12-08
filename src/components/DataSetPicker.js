import { useDataQuery } from "@dhis2/app-runtime";

const DataSetPicker = ({ onSelectDataSet }) => {
  const { loading, error, data } = useDataQuery({
    dataSets: {
      resource: "dataSets",
      params: {
        fields: "id,name",
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Choose a DataSet:</p>
      <ul>
        {data.dataSets.dataSets.map((dataSet) => (
          <li key={dataSet.id} onClick={() => onSelectDataSet(dataSet.id)}>
            {dataSet.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataSetPicker;
