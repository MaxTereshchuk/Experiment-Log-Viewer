const ExperimentList = ({ experiments = [], selected = [], onToggle, onDeselectAll }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Select Experiments:</h2>

      <div className="mb-4">
        <button
          onClick={onDeselectAll}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {experiments.map((id) => (
          <label key={id} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(id)}
              onChange={() => onToggle(id)}
              className="cursor-pointer"
            />
            <span>{id}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ExperimentList;
