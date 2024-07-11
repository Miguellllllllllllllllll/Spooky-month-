import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ query, setQuery, handleSearch }) => {
  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a band!"
              aria-label="Search"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleSearch}>
                Suche
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
