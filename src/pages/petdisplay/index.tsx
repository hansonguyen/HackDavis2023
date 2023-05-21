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
import { HeartOutline, ReorderThreeOutline } from "react-ionicons";
import Navbar from "../../../components/Navbar";
import { MultiSelect } from "@mantine/core";
import { Transition, NumberInput } from "@mantine/core";
import { speciesData, locationData } from "../pets/create/index";

import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export interface Pet {
  species: string;
  breed: string;
  description: string;
  name: string;
  images: string[];
  numDays: number;
  location: string;
  age: number;
}

export interface FiltersFace {
  species: string[];
  breed: string[];
  minDays: number;
  maxDays: number;
  minAge: number;
  maxAge: number;
  location: string[];
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
    alignContent: "center",
    width: "125%",
  },
  searchBar: {
    width: "90%",
    marginBottom: "3%",
  },
  filterContainer: {
    padding: "5%",
  },

  container: {
    backgroundImage: "linear-gradient(to right, #FFEBB9, white)",

    height: "100vh",
  },
}));

export interface PetSearchProps extends TextInputProps {
  onSearch: (searchValue: string) => void;
}

export function PetSearch(props: PetSearchProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearch(event.target.value);
  };

  return (
    <TextInput
      className={classes.searchBar}
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={32} radius="xl" color="orange" variant="filled">
          {theme.dir === "ltr" ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search pets"
      rightSectionWidth={42}
      onChange={handleInputChange}
      {...props}
    />
  );
}

export default function NextPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [filters, setFilters] = useState<FiltersFace>({
    species: [],
    breed: [],
    minAge: 0,
    maxAge: 0,
    minDays: 0,
    maxDays: 0,
    location: [],
  });
  const { classes } = useStyles();
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const filterPets = () => {
      let filtered = pets;
      if (filters.species.length > 0) {
        filtered = filtered.filter((pet) =>
          filters.species.includes(pet.species)
        );
      }
      if (filters.breed.length > 0) {
        filtered = filtered.filter((pet) => filters.breed.includes(pet.breed));
      }
      if (filters.minAge > 0) {
        filtered = filtered.filter((pet) => pet.age >= filters.minAge);
      }
      if (filters.maxAge > 0) {
        filtered = filtered.filter((pet) => pet.age <= filters.maxAge);
      }
      if (filters.minDays > 0) {
        filtered = filtered.filter((pet) => pet.numDays >= filters.minDays);
      }
      if (filters.maxDays > 0) {
        filtered = filtered.filter((pet) => pet.numDays <= filters.maxDays);
      }
      if (filters.location.length > 0) {
        filtered = filtered.filter((pet) =>
          filters.location.includes(pet.location)
        );
      }
      setFilteredPets(filtered);
    };

    filterPets();
  }, [pets, filters]);

  const handleSearch = (searchValue: string) => {
    const filtered = pets.filter((pet) =>
      pet.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPets(filtered);
  };

  const cards = filteredPets.map((pet, index) => (
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
    <div className={classes.container}>
      <Navbar />
      <Container py="xl">
        <div className={classes.searchFilterContainer}>
          <PetSearch onSearch={handleSearch} />
          <ReorderThreeOutline
            onClick={() => {
              setIsToggled(!isToggled);
            }}
            height="15%"
            width="15%"
          />
        </div>

        {isToggled && (
          <Transition
            mounted={isToggled}
            transition="slide-up"
            duration={500}
            timingFunction="ease"
          >
            {(styles) => (
              <div className={classes.filterContainer} style={styles}>
                <MultiSelect
                  data={speciesData}
                  label="Species"
                  searchable
                  placeholder="Pick species"
                  value={filters.species}
                  color="yellow"
                  onChange={(value) =>
                    setFilters({ ...filters, species: value })
                  }
                />

                <MultiSelect
                  data={locationData}
                  label="Location"
                  placeholder="Pick area"
                  value={filters.location}
                  onChange={(value) =>
                    setFilters({ ...filters, location: value })
                  }
                />

                <div>
                  <Grid gutter="sm">
                    <Grid.Col span={6}>
                      <NumberInput
                        label="Min Days"
                        value={filters.minDays}
                        onChange={(value) =>
                          setFilters({ ...filters, minDays: Number(value) })
                        }
                        size="sm"
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <NumberInput
                        label="Max Days"
                        value={filters.maxDays}
                        onChange={(value) =>
                          setFilters({ ...filters, maxDays: Number(value) })
                        }
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
                        onChange={(value) =>
                          setFilters({ ...filters, minAge: Number(value) })
                        }
                        size="sm"
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <NumberInput
                        label="Max Age"
                        value={filters.maxAge}
                        onChange={(value) =>
                          setFilters({ ...filters, maxAge: Number(value) })
                        }
                        size="sm"
                      />
                    </Grid.Col>
                  </Grid>
                </div>
              </div>
            )}
          </Transition>
        )}
        <SimpleGrid cols={5} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Container>
    </div>
  );
}
