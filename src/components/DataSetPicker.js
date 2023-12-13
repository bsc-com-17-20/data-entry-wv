import { useDataQuery } from "@dhis2/app-runtime";
import classes from "../App.module.css";
import { DropdownButton, FlyoutMenu, MenuItem } from "@dhis2/ui";

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
      {/* <DropdownButton
        component={
          <FlyoutMenu>
            {data.dataSets.dataSets.map((dataSet) => (
              <MenuItem
                key={dataSet.id}
                value={dataSet.id}
                label={dataSet.name}
                onClick={() => onSelectDataSet(dataSet.id)}
              />
            ))}
          </FlyoutMenu>
        }
        primary
      >
        Data Sets
      </DropdownButton> */}
      <select
        className={classes.button}
        onChange={(e) => onSelectDataSet(e.target.value)}
      >
        <option>Data Set</option>
        {data.dataSets.dataSets.map((dataSet) => (
          <option
            key={dataSet.id}
            value={dataSet.id}
            onClick={() => onSelectDataSet(dataSet.id)}
          >
            {dataSet.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DataSetPicker;
