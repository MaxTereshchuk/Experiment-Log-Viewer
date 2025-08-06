import Papa from "papaparse";

const FileUploader = ({ onDataParsed }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data.map(row => ({
          experiment_id: row.experiment_id,
          metric_name: row.metric_name,
          step: parseInt(row.step),
          value: parseFloat(row.value)
        }));
        onDataParsed(parsed);
      }
    });
  };

  return (
    <div className="mb-4">
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
