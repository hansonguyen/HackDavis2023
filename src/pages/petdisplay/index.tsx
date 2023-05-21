import { useEffect, useState } from 'react';
import { Grid, Image } from '@mantine/core';


interface Pet {
    description: string;
    name: string;
    images: string[]; // Add the images property with the correct type
    // Add other properties if needed
  }

export default function NextPage() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/pets');
        const data = await response.json();
        setPets(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
        <Grid gutter="md" columns={5}>
        {pets.map((pet, index) => (
            <Image key={index} src={pet.images[0]} alt={`Image ${index}`} />
        ))}
        </Grid>

    </div>
  );
}