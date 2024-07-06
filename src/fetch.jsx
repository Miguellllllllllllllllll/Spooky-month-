import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';

export default function Example() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!query) {
      setError(new Error('Bitte geben Sie etwas ein'));
      return;
    }

    setIsLoading(true);
    setError(null);

    const endpoint = `https://api.srgssr.ch/mx3/v2/bands?query=${encodeURIComponent(query)}`;

    fetch(endpoint, {
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer TjZY7IPgnMZlJFFg0N0ILGmHORM9'
      }
    })
      .then(r => {
        if (!r.ok) {
          throw new Error(`HTTP error! status: ${r.status}`);
        }
        return r.json();
      })
      .then(
        data => {
          setIsLoading(false);
          setResult(data);
          console.log("Does it work?")
          console.log(data.response.bands[0].address);
        },
        e => {
          setIsLoading(false);
          setError(e);
        }
      );
  };

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <div className="mt-3">
        {isLoading && <Spinner animation="border" variant="primary" />}
        {error && <p>Ein Fehler ist aufgetreten: {error.message}</p>}
        {result && (
          <div>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchBar({ query, setQuery, handleSearch }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Suche nach Bands..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-primary" onClick={handleSearch}>
          Suchen
        </button>
      </div>
    </div>
  );
}
