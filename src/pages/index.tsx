import Navbar from "../../components/Navbar";
import { Text } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState } from 'react';
//font styles
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import cat from "./cat.png";
import angy from "./angy.png";
const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const useStyles = createStyles((theme) => ({
  container: {
    backgroundImage: "linear-gradient(to right, #FFEBB9, white)",
    height: "100vh",
  },
  title: {
    display: "flex",
    fontSize: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "10%",
    fontWeight: 600,
    paddingTop: "15%",
    fontFamily: "Montserrat",
  },
  subtitle: {
    display: "flex",
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 400,
    marginLeft: "10%",
    width: "60%",
    fontFamily: "Montserrat",
  },
  button: {
    backgroundColor: "#D9E7C1",
    marginLeft: "10%",
    marginTop: "5%",
    padding: "15px 32px",
    borderWidth: 1,
    borderRadius: 50,
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const router = useRouter();
  const nav = () => {
    router.push("/petdisplay");
  };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={classes.container}>
      {/* <Navbar /> */}
      <div className={classes.title}>
        <Text className={montserrat.className}>
          Find your pawfect sitter today!
        </Text>
      </div>
      <div className={classes.subtitle}>
        <Text className={inter.className}>
          Going on vacation? Need someone to watch over your pet? Looking to
          begin your journey in pet sitting? Get started with us today!
        </Text>
      </div>
      <button className={classes.button} type="button" onClick={nav}>
        Get Started!
      </button>

      <Image
        src={isHovered ? angy : cat}
        alt="Cat"
        style={{ backgroundColor: 'transparent', marginLeft: '5%' }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      />

      {/* <img src="./transparent.jpg" /> */}
    </div>
  );
}
