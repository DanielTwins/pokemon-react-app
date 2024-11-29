import React from 'react';


function Pokemon({ data }) {
  return (
    <div className="pokemon-card">
      <h1>{data.name.toUpperCase()}</h1>
      <img
        src={data.sprites.front_default}
        alt={data.name}
        style={{ width: '150px' }}
      />
      <p><strong>Types:</strong> {data.types.map(type => type.type.name).join(', ')}</p>
      <p><strong>Weight:</strong> {data.weight}</p>
      <p><strong>Height:</strong> {data.height}</p>
    </div>
  );
}

export default Pokemon;