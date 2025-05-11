import { useState, useEffect } from 'react';
import { type Person, fetchBio } from './api';

interface PageProps {
  initialPerson: string | undefined;
}

function Page({ initialPerson }: PageProps) {
  const [bio, setBio] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialPerson === undefined) {
      setBio(null);
      setIsLoading(false);
      setError(null);

      return;
    }

    setBio(null);
    setIsLoading(true);
    setError(null);

    fetchBio(initialPerson)
      .then((result) => {
        setBio(result);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [initialPerson]);

  const handlePersonChange = (newPerson: string) => {
    setIsLoading(true);
    setError(null);

    fetchBio(newPerson)
      .then((result) => {
        setBio(result);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : bio !== null ? (
        <div>
          <h1>{bio.name}</h1>
          <p>{bio.description}</p>
        </div>
      ) : (
        <p>No bio available</p>
      )}

      <button onClick={() => handlePersonChange('John')}>Load John</button>
    </div>
  );
}

function App() {
  return <Page initialPerson="Jeff" />;
}

export default App;
