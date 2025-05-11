import { useState, useEffect } from 'react';
import { type Person, fetchBio } from './api';
import React from 'react';

interface PageProps {
  initialPerson: string | undefined;
}

function Page({ initialPerson }: PageProps) {
  const [person, setPerson] = useState<string | undefined>(initialPerson);
  const [bio, setBio] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (person === undefined) {
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchBio(person)
      .then((result) => {
        setBio(result);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [person]);

  return (
    <div>
      {isLoading && !bio ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : bio !== null ? (
        <div>
          <h1>{bio.name}</h1>
          <p>{bio.description}</p>

          {isLoading && (
            <p>Fetching in background...</p>
          )}
        </div>
      ) : (
        <p>No bio available</p>
      )}

      <div style={{ display: 'flex', columnGap: '0.25rem' }}>
        <button onClick={() => setPerson('John')}>Load John</button>
        <button onClick={() => setPerson('Bob')}>Load Bob</button>
        <button onClick={() => setPerson('Jane')}>Load Jane (she doesn't exist)</button>
      </div>
    </div>
  );
}

function App() {
  return <Page initialPerson="Jeff" />;
}

export default App;
