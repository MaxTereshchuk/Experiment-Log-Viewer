import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MetricChart = ({ data, selectedExperiments, selectedMetrics = [] }) => {
  const filteredData = useMemo(() => {
    return data.filter(
      (d) =>
        selectedExperiments.includes(d.experiment_id) &&
        (selectedMetrics.length === 0 ||
          selectedMetrics.includes(d.metric_name))
    );
  }, [data, selectedExperiments, selectedMetrics]);

  const metrics = useMemo(() => {
    return [...new Set(filteredData.map((d) => d.metric_name))];
  }, [filteredData]);

  return (
    <div>
      {metrics.map((metric) => {
        const lines = selectedExperiments.map((expId) => {
          const points = filteredData
            .filter((d) => d.experiment_id === expId && d.metric_name === metric)
            .sort((a, b) => a.step - b.step);
          return { experiment_id: expId, data: points };
        });

        const allSteps = lines.flatMap((line) => line.data.map((p) => p.step));
        if (allSteps.length === 0) return null;

        const minStep = Math.min(...allSteps);
        const maxStep = Math.max(...allSteps);

        return (
          <div key={metric} className="mb-8">
            <h3 className="text-lg font-bold mb-2">{metric}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <XAxis
                  dataKey="step"
                  domain={[minStep, maxStep]}
                  type="number"
                  allowDecimals={false}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                {lines.map((line) => (
                  <Line
                    key={line.experiment_id}
                    data={line.data}
                    name={line.experiment_id}
                    dataKey="value"
                    stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                    dot={false}
                    type="monotone"
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default MetricChart;
