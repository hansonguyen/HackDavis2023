import { IconHeart } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Input } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

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
  Modal
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
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

export function BadgeCard({ image, title, description, country, badges }: BadgeCardProps) {
  const { classes, theme } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const features = badges && badges.map((badge) => (
    <Badge
      color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
      key={badge.label}
      leftSection={badge.emoji}
    >
      {badge.label}
    </Badge>
  ));

  return (
    <div>

      <h1> &#160;Connect with </h1>
      
      <Card withBorder radius="lg" p="md" className={classes.card} sx={{ display: "flex", gap: "5rem" }}>

      <Card.Section>
        <Image src={image} alt={title} height={210} width={210} sx={{ padding: "2rem" }}/>
      </Card.Section> 
    
      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={700}>
            {title}Info:
          </Text>
        </Group>
        
        <Text fz="md" mt="xs">
          {description} Name:
        </Text>
        
        <Text fz="md" mt="xs">
          {description} Age:
        </Text>
        
        <Text fz="md" mt="xs">
          {description} Breed:
        </Text>
        
        <Text fz="md" mt="xs">
          {description} Pet Sitting Duration:
        </Text>
        
        <Text fz="md" mt="xs">
          {description} Location:
        </Text>
      </Card.Section>

      <Card.Section className={classes.section} mt="lrg">  
        <Text fz="md" mt="xs" sx={{ paddingTop: '15rem', marginLeft: -464 }}>
          {description} Description:
        </Text>
      </Card.Section>
      
      <Modal opened={opened} onClose={close}>
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <h3>Let the Owner Know You're Interested!</h3>
          <p>Send the owner a message to let them know you'd like to help.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: "column", alignItems: "stretch"}}>
          <Input
            icon={<IconAt />}
            placeholder="Name"
            radius="xl"
            size="md"/>

            <Input
            icon={<IconAt />}
            placeholder="Email"
            radius="xl"
            size="md"/>

            <Input
            icon={<IconAt />}
            placeholder="Message"
            radius="xl"
            size="md"/>
        </div>
        
      </Modal>

      <Group mt="xs" sx = {{ justifyContent: 'center', alignItems: "flex-end"}}>
        <Button radius="md" style={{ flex: 1 }} onClick={open}>
          I'm interested!
        </Button>
      </Group>
    </Card>
  </div>
  );
}

export default BadgeCard;
