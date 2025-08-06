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

  const getColor = (experimentId) => {
    const colors = [
      "#8884d8", "#82ca9d", "#ff7300", "#ff0000",
      "#0088FE",
    ];
    const index = selectedExperiments.indexOf(experimentId) % colors.length;
    return colors[index];
  };

  return (
    <div>
      {metrics.map((metric) => {
        const series = {};

        filteredData.forEach((entry) => {
          if (entry.metric_name !== metric) return;
          const step = entry.step;
          if (!series[step]) series[step] = { step };
          series[step][entry.experiment_id] = entry.value;
        });

        const chartData = Object.values(series).sort((a, b) => a.step - b.step);

        if (chartData.length === 0) return null;

        return (
          <div key={metric} className="mb-8">
            <h3 className="text-lg font-bold mb-2">{metric}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="step" allowDecimals={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedExperiments.map((expId) => (
                  <Line
                    key={expId}
                    type="monotone"
                    dataKey={expId}
                    stroke={getColor(expId)}
                    dot={false}
                    name={expId}
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
