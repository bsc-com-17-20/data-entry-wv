import classes from "../App.module.css";

const DataSet = ({ dataSets }) => {
  return (
    <div>
      {dataSets.map((dataSet) => {
        <div key={dataSet.id} className={classes.button}>
          <h3>{dataSet.name}</h3>
        </div>;
      })}
    </div>
  );
};

export default DataSet;
