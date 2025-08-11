const Filter = ({ year, setYear, rating, setRating, genre, setGenre }) => {
  const genres = [
    { id: '', name: 'All' },
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 16, name: 'Animation' },
  ];

  return (
    <div className="filter flex flex-wrap gap-5 my-3 justify-center">
      
      <div>
        <label className="block text-sm font-medium text-gray-200">Year</label>
        <input
          type="number"
          step="1"
          min="2020"
          max="2025"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g., 2020"
          className="mt-1 p-2 rounded bg-[#1e1b2e] text-gray-200 outline-hidden placeholder-light-200"
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-200">Min Rating</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="e.g., 7.5"
          className="mt-1 p-2 rounded bg-[#1e1b2e] text-gray-200 outline-hidden placeholder-light-200"
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-200">Genre</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="mt-1 p-2 rounded bg-[#1e1b2e] text-gray-200"
        >
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;

