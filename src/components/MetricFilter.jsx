import React from "react";

const MetricFilter = ({ allMetrics, selectedMetrics, onChange }) => {
  const toggleMetric = (metric) => {
    if (selectedMetrics.includes(metric)) {
      onChange(selectedMetrics.filter((m) => m !== metric));
    } else {
      onChange([...selectedMetrics, metric]);
    }
  };

  const selectAll = () => onChange(allMetrics);
  const clearAll = () => onChange([]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Metrics</h2>
        <div className="space-x-2">
          <button onClick={selectAll} className="text-sm text-blue-600 hover:underline">Select All</button>
          <button onClick={clearAll} className="text-sm text-red-600 hover:underline">Clear All</button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
        {allMetrics.map((metric) => (
          <label key={metric} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedMetrics.includes(metric)}
              onChange={() => toggleMetric(metric)}
              className="accent-blue-600"
            />
            <span>{metric}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MetricFilter;
