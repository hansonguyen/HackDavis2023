import { useEffect, useState } from 'react';
import { Grid, Image } from '@mantine/core';
import {
  createStyles,
} from "@mantine/core";
import {SimpleGrid, Card, Text, Container, AspectRatio } from '@mantine/core';
import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';


interface Pet {
    description: string;
    name: string;
    images: string[];
  }

const useStyles = createStyles((theme) => ({
    image:{
      width:200
    },

    card: {
      transition: 'transform 150ms ease, box-shadow 150ms ease',
      width:'100%',
      '&:hover': {
        transform: 'scale(1.01)',
        boxShadow: theme.shadows.md,
      },
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 600,
    },


}));

export function PetSearch(props: TextInputProps) {
  const theme = useMantineTheme();
  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          {theme.dir === 'ltr' ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search pets"
      rightSectionWidth={42}
      {...props}
    />
  );
}

export default function NextPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const cards = pets.map((pet, index) => (
    <Card key={pet.name} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1920}>
        <Image src={pet.images[0]} />
      </AspectRatio>
      <Text className={classes.title} mt={5}>
        {pet.name}
      </Text>
    </Card>
  ));
  
  const search = (props: TextInputProps) => (<TextInput
    icon={<IconSearch size="1.1rem" stroke={1.5} />}
    radius="xl"
    size="md"
    rightSection={
      <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
        {theme.dir === 'ltr' ? (
          <IconArrowRight size="1.1rem" stroke={1.5} />
        ) : (
          <IconArrowLeft size="1.1rem" stroke={1.5} />
        )}
      </ActionIcon>
    }
    placeholder="Search Pets"
    rightSectionWidth={42}
    {...props}
  />);

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
    <Container py="xl">
      
      <PetSearch/>
      <SimpleGrid cols={5} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}