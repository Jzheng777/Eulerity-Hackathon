import { useEffect, useState } from 'react';

interface Pet {
  id: number;
  url: string;
  title: string;
  description: string;
  created: string;
}

const usePetData = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //Created custom hook to fetch the pet data
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('https://eulerity-hackathon.appspot.com/pets');
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return { pets, loading, error };
};

export default usePetData;
