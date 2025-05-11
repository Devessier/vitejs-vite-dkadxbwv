export interface Person {
  name: string;
  description: string;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function fetchBio(person: string): Promise<Person> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (person === 'Jane') {
        reject(new Error('Failed to fetch bio'));
      } else {
        resolve({
          name: person,
          description: `This is the bio of ${person}.`,
        });
      }
    }, randomIntFromInterval(1_000, 3_000));
  });
}
