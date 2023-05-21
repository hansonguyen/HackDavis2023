import { IconHeart } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Input } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
  Modal,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Pet } from "../petdisplay";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    marginRight: "10%",
    width: "20vw",
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
  container: {
    backgroundImage: "linear-gradient(to right, #FFEBB9, white)",
    height: "100vh",
  },
  cardContainer: {
    width: "90vw",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  cardlabel: {
    fontSize: 30,
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#D9E7C1",
    padding: "7px 20px",
    borderWidth: 0,
    borderRadius: 50,
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    justifyItems: "flex-end",
  },
  buttonContainer: {
    marginRight: "5%",
    marginTop: "1%",
    display: "flex",
    justifyContent: "flex-end",
  },
  trial: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
}));

interface BadgeCardProps {
  image: string;
  title: string;
  country: string;
  description: string;
  badges: {
    emoji: string;
    label: string;
  }[];
}

export function BadgeCard({
  image,
  title,
  description,
  country,
  badges,
}: BadgeCardProps) {
  const { classes, theme } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [pet, setPet] = useState<Pet>();
  const router = useRouter();
  const id = router.query["id"];
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/pets/${id}`);
        const data = await response.json();
        setPet(data);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPets();
  }, [router]);
  const features =
    badges &&
    badges.map((badge) => (
      <Badge
        color={theme.colorScheme === "dark" ? "dark" : "gray"}
        key={badge.label}
        leftSection={badge.emoji}
      >
        {badge.label}
      </Badge>
    ));

  return (
    pet && (
      <div className={classes.container}>
        <Text className={(montserrat.className, classes.cardlabel)}>
          Connect with {pet.name}
        </Text>

        <div className={classes.trial}>
          <div className={classes.cardContainer}>
            <Card
              withBorder
              radius="lg"
              p="md"
              className={classes.card}
              sx={{ display: "flex", gap: "20%" }}
            >
              <Card.Section>
                {pet.images && (
                  <Image
                    src={pet.images[0]}
                    alt={title}
                    height={210}
                    width={210}
                    sx={{
                      width: "20vw",
                      marginLeft: "15%",
                      marginTop: "20%",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                )}

                <Text
                  fz="md"
                  mt="xs"
                  sx={{
                    width: "20vw",
                    marginLeft: "15%",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {description} Description: {pet.description}
                </Text>
              </Card.Section>

              <Card.Section
                className={classes.section}
                mt="md"
                sx={{ marginBottom: "5%" }}
              >
                <Group position="apart">
                  <Text fz="lg" fw={700} sx={{ width: "20vw" }}>
                    {title}Information
                  </Text>
                </Group>

                <Text fz="md" mt="xs">
                  {description} Name: {pet.name}
                </Text>

                <Text fz="md" mt="xs">
                  {description} Age: {pet.age}
                </Text>

                <Text fz="md" mt="xs">
                  {description} Breed: {pet.breed}
                </Text>

                <Text fz="md" mt="xs">
                  {description} Pet Sitting Duration: {pet.numDays}
                </Text>

                <Text fz="md" mt="xs">
                  {description} Location: {pet.location}
                </Text>
              </Card.Section>

              <Modal opened={opened} onClose={close}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3>Let the Owner Know You're Interested!</h3>
                  <p>
                    Send the owner a message to let them know you'd like to
                    help.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <Input
                    icon={<IconAt />}
                    placeholder="Name"
                    radius="xl"
                    size="md"
                  />

                  <Input
                    icon={<IconAt />}
                    placeholder="Email"
                    radius="xl"
                    size="md"
                  />

                  <Input
                    icon={<IconAt />}
                    placeholder="Message"
                    radius="xl"
                    size="md"
                  />
                </div>
              </Modal>

              <Group
                sx={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginLeft: "-70%",
                }}
              >
                <Button
                  className={classes.button}
                  sx={{ marginBottom: "-5%" }}
                  // onClick={alert(
                  //   "We have sent your enquiry to the owner! Please check your email for a response in the next 3-5 days!"
                  // )}
                >
                  Connect me !
                </Button>
              </Group>
            </Card>
          </div>
        </div>
      </div>
    )
  );
}

export default BadgeCard;
