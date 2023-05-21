import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from "../../../components/Navbar";
import { createStyles, Text, Input, TextInput } from "@mantine/core";
import { useRouter } from "next/router";

import { Montserrat } from "next/font/google";
import { Poppins } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export default function User() {
  const { user, error, isLoading } = useUser();
  const { classes } = useStyles();
  const router = useRouter();
  const nav = () => {
    router.push("/petdisplay");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return user ? (
    <div className={classes.container}>
      {/* <Navbar /> */}
      {/* <img src={user.picture} alt={user.name} /> */}
      <div className={classes.left}>
        <Text className={montserrat.className}>Pawfect Sitters</Text>
      </div>
      <div className={classes.right}>
        <Text className={(poppins.className, classes.introText)}>
          Welcome to Pawfect Sitters, {user.name}!{" "}
        </Text>
        <Text className={(poppins.className, classes.sub)}>
          Before we get started, we need more information from you.
        </Text>
        {/* <p>{user.email}</p> */}

        <div className={classes.qnbox}>
          <div className={classes.qn}>
            <Text className={(montserrat.className, classes.questions)}>
              {" "}
              Please enter your contact number{" "}
            </Text>
            <div className={classes.textinput}>
              <TextInput
                placeholder="Enter your contact number"
                variant="filled"
                radius="xl"
                withAsterisk={true}
              />
            </div>
          </div>

          <div className={classes.qn}>
            <Text className={(montserrat.className, classes.questions)}>
              {" "}
              Please enter your email address{" "}
            </Text>
            <div className={classes.textinput}>
              <TextInput
                placeholder="Enter your email address"
                variant="filled"
                radius="xl"
                withAsterisk={true}
              />
            </div>
          </div>

          <div className={classes.qn}>
            <Text className={(montserrat.className, classes.questions)}>
              {" "}
              How many years of experience do you have pet sitting?{" "}
            </Text>

            <div className={classes.textinput}>
              <TextInput
                placeholder="Enter in number of year(s)"
                variant="filled"
                radius="xl"
                withAsterisk={true}
              />
            </div>
          </div>

          <div className={classes.qn}>
            <Text className={(montserrat.className, classes.questions)}>
              {" "}
              Where are you located ?
            </Text>

            <div className={classes.textinput}>
              <TextInput
                placeholder="Enter your location"
                variant="filled"
                radius="xl"
                withAsterisk={true}
              />
            </div>
          </div>

          <div className={classes.qn}>
            <Text className={(montserrat.className, classes.questions)}>
              {" "}
              Is your apartment complex pet-friendly?{" "}
            </Text>
            <div className={classes.textinput}>
              <TextInput
                placeholder="Yes/No"
                variant="filled"
                radius="xl"
                withAsterisk={true}
              />
            </div>
          </div>
        </div>

        <button className={classes.button} type="button" onClick={nav}>
          Complete Registration
        </button>
      </div>
    </div>
  ) : (
    <div>
      <Navbar />
      <h1>You are not logged in</h1>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  container: {
    // backgroundImage: "linear-gradient(to right, #FFEBB9, white)",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
  },
  left: {
    backgroundColor: "#FFEBB9",
    padding: "5%",
    fontSize: 30,
    fontWeight: 600,
    display: "flex",
    flexWrap: "wrap",
    width: "33vh",
    borderRadius: 10,
  },
  right: {
    marginLeft: "5%",
    marginTop: "5%",
    width: "66vw",
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
  button: {
    backgroundColor: "#FDD1A5",
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginTop: "5%",
    padding: "18px 35px",
    borderWidth: 0,
    borderRadius: 50,
    marginLeft: "75%",
  },
  qn: {
    marginBottom: "3%",
  },
  qnbox: {
    marginTop: "3%",
  },
  introText: {
    fontSize: 30,
    fontWeight: 700,
  },
  sub: {
    fontsize: 25,
    fontWeight: 400,
  },
  textinput: {
    marginTop: "1.5%",
  },
  questions: {
    fontWeight: 500,
  },
}));
