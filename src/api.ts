export interface Person {
  name: string;
  description: string;
}

export function fetchBio(person: string): Promise<Person> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (person === 'error') {
        reject(new Error('Failed to fetch bio'));
      } else {
        resolve({
          name: person,
          description: `This is the bio of ${person}.`,
        });
      }
    }, Math.random() * 1000);
  });
}
