import React, { useState } from 'react';
import image from './assets/image.png';

const App = () => {
  const [query, setQuery] = useState('');
  const [generatedSQL, setGeneratedSQL] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Please enter a query description');
      return;
    }
    await generateQuery();
    setQuery('');
  };

  const generateQuery = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await response.json();
      setGeneratedSQL(data.response);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to generate SQL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <img src={image} alt="sql" style={{ width: '80px' }} />
        <h3 className="mt-2">Generate SQL With AI</h3>
      </div>

      <form onSubmit={onSubmit} className="d-flex flex-column align-items-center gap-2">
  <input
    type="text"
    name="query-description"
    className="form-control"
    style={{
      maxWidth: '500px',
     
      color: '#444',
      border: '1px solid #444',
    }}
    placeholder="Describe your query"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  <button
    type="submit"
    className="btn w-100"
    style={{
      maxWidth: '500px',
      backgroundColor: '#10a37f',
      borderColor: '#10a37f',
      color: 'white',
    }}
  >
    {loading ? 'Generating...' : 'Generate Query'}
  </button>
</form>

{loading ? (
  <div className="text-center mt-3">
    <div className="spinner-border text-success" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
) : (
  generatedSQL && (
    <div className="mt-4 text-center">
      <h5>Generated SQL Query:</h5>
      <pre
        className="bg-light p-3 rounded mx-auto"
        style={{
          display: 'inline-block',
          textAlign: 'left',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxWidth: '100%',
        }}
      >
        {generatedSQL}
      </pre>
    </div>
  )
)}


    </div>
  );
};

export default App;
