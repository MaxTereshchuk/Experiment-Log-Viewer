import React, { useState } from "react";
import Papa from "papaparse";
import ExperimentList from "./components/ExperimentList";
import MetricChart from "./components/MetricChart";
import MetricFilter from "./components/MetricFilter";

function App() {
  const [data, setData] = useState([]);
  const [selectedExperiments, setSelectedExperiments] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        const parsedData = results.data.filter(
          (entry) =>
            entry.experiment_id &&
            entry.metric_name &&
            typeof entry.step === "number" &&
            typeof entry.value === "number"
        );
        setData(parsedData);
      },
    });
  };

  const experiments = Array.from(new Set(data.map((entry) => entry.experiment_id)));
  const metrics = Array.from(new Set(data.map((entry) => entry.metric_name)));

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-extrabold mb-2 text-blue-600">📊 Experiment Log Viewer</h1>
        <p className="text-gray-600 mb-6">Upload CSV experiment logs and compare metrics across runs.</p>

        <div className="border border-dashed border-blue-400 p-4 rounded mb-6 bg-blue-50">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                       file:text-sm file:font-semibold file:bg-blue-500 file:text-white
                       hover:file:bg-blue-600"
          />
        </div>

        {experiments.length > 0 && (
          <div className="space-y-8">
            <div className="bg-gray-50 p-4 rounded shadow">
              <ExperimentList
                experiments={experiments}
                selected={selectedExperiments}
                onToggle={(id) => {
                  setSelectedExperiments((prev) =>
                    prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
                  );
                }}
                onDeselectAll={() => setSelectedExperiments([])}
              />

            </div>

            <div className="bg-gray-50 p-4 rounded shadow">
              <MetricFilter
                allMetrics={metrics}
                selectedMetrics={selectedMetrics}
                onChange={setSelectedMetrics}
              />
            </div>

            <MetricChart
              data={data}
              selectedExperiments={selectedExperiments}
              selectedMetrics={selectedMetrics}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
