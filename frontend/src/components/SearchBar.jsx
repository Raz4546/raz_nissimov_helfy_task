import "../styles/SearchBar.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
