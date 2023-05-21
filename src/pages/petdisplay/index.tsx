import { CSSProperties, useEffect, useState } from "react";
import { Grid, Image } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { SimpleGrid, Card, Text, Container, AspectRatio } from "@mantine/core";
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { HeartOutline, ReorderThreeOutline} from "react-ionicons";
import Navbar from "../../../components/Navbar";
import { MultiSelect } from '@mantine/core';
import { Transition, NumberInput } from '@mantine/core';
import {speciesData, locationData} from '../pets/create/index'

export interface Pet {
  description: string;
  name: string;
  images: string[];
  numDays: number;
  location: string;
}


export interface FiltersFace {
  species: string;
  breed: string;
  minDays: number;
  maxDays: number;
  minAge: number;
  maxAge: number;
  location: string;
}



const useStyles = createStyles((theme) => ({
  image: {
    width: 200,
  },

  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    width: "100%",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  cardDetails: {
    flex: 1,
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  searchFilterContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent:"center",
    width: "125%",
  },
  searchBar:{
    width:"90%"
  },
  filterContainer:{
    padding:"5%"
  }
}));

export function PetSearch(props: TextInputProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <TextInput
      className={classes.searchBar}
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color="orange"
          variant="filled"
        >
          {theme.dir === "ltr" ? (
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
  const [filters, setFilters] = useState<FiltersFace>(
    {species: '',
    breed: '',
    minAge: 0,
    maxAge: 0,
    minDays: 0,
    maxDays: 0,
    location: ''}
  );
  const { classes } = useStyles();
  const [isToggled, setIsToggled] = useState(false);

  const cards = pets.map((pet, index) => (
    <Card
      key={pet.name}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <HeartOutline
        color={"#00000"}
        height="20px"
        width="20px"
        cssClasses={classes.cardDetails}
      />

      <AspectRatio ratio={1920 / 1920}>
        <Image src={pet.images[0]} />
      </AspectRatio>
      <Text className={classes.title} mt={5}>
        {pet.name}
      </Text>
      <Text>{pet.numDays} Days</Text>
      <Text>{pet.location}</Text>
    </Card>
  ));



  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/pets");
        const data = await response.json();
        setPets(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
      <Navbar />
      <Container py="xl">
        
        <div className={classes.searchFilterContainer}>
          <PetSearch />
          <ReorderThreeOutline
          onClick={() => {
            setIsToggled(!isToggled);
          }} 
          height="15%"
          width="15%"/>
        </div>

        {isToggled &&  
          <Transition mounted={isToggled} transition="slide-up" duration={500} timingFunction="ease">
            {(styles) => 
            <div className={classes.filterContainer}>
                <MultiSelect
                data={speciesData}
                label="Species"
                placeholder="Pick species"
                />

                <MultiSelect
                data={locationData}
                label="Location"
                placeholder="Pick area"
                />

              <div>
                <Grid gutter="sm">
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Min Days"
                      value={filters.minDays}
                      onChange={(value) => setFilters({ ...filters, minDays: Number(value) })}
                      size="sm"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Max Days"
                      value={filters.maxDays}
                      onChange={(value) => setFilters({ ...filters, maxDays: Number(value) })}
                      size="sm"
                    />
                  </Grid.Col>
                </Grid>
              </div>

              <div>
                <Grid gutter="sm">
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Min Age (months)"
                      value={filters.minAge}
                      onChange={(value) => setFilters({ ...filters, minAge: Number(value) })}
                      size="sm"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Max Age"
                      value={filters.maxAge}
                      onChange={(value) => setFilters({ ...filters, maxAge: Number(value) })}
                      size="sm"
                    />
                  </Grid.Col>
                </Grid>
              </div>

            </div>
            }
          </Transition>}
        <SimpleGrid cols={5} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Container>
    </div>
  );
}
