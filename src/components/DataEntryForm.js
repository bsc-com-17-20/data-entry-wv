import React, { useEffect, useState } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';

const useDataElements = (datasetId) => {
  const { loading, error, data } = useDataQuery({
    dataSets: {
      resource: 'dataSets',
      id: datasetId,
      params: {
        fields: 'dataSetElements[dataElement[id,displayName]]',
      },
    },
  });

  return {
    loading,
    error,
    dataElements: data?.dataSets?.dataSetElements || [],
  };
};

const DataEntryForm = () => {
  const datasetId = 'BfMAe6Itzgt'; // Replace with the actual dataset ID
  const { loading, error, dataElements } = useDataElements(datasetId);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Additional logic if needed on component mount
  }, []);

  const handleInputChange = (elementId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [elementId]: value,
    }));
  };

  const handleSubmit = () => {
    // Form submission logic, e.g., send data to DHIS2 API
    console.log('Form Data:', formData);
  };

  return (
    <div>
      <h2>Data Entry Form</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data elements: {error.message}</p>}
      <form>
        {dataElements.map((element) => (
          <div key={element.dataElement.id}>
            <label htmlFor={element.dataElement.id}>{element.dataElement.displayName}</label>
            <input
              type="text"
              id={element.dataElement.id}
              name={element.dataElement.id}
              onChange={(e) => handleInputChange(element.dataElement.id, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataEntryForm;
