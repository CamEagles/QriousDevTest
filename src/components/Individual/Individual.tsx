import styles from "./individual.module.css";
import PeopleIcon from "@mui/icons-material/People";
import { Stack, Typography } from "@mui/material";

type IndividualProps = {
  style?: React.CSSProperties;
  name: string;
  gender: string;
};

const Individual = (individualProps: IndividualProps) => {
  return (
    <Stack
      direction="row"
      className={styles.individual}
      style={{
        ...individualProps.style,
        backgroundColor:
          individualProps.gender === "female" ? "lightpink" : "lightblue",
      }}
    >
      <PeopleIcon className={styles.peopleIcon} />
      <Typography className={styles.name}>{individualProps.name}</Typography>
    </Stack>
  );
};

export default Individual;
