import { Person } from "../../types/person";
import Individual from "../Individual/Individual";
import styles from "./couple.module.css";

type CoupleProps = {
  id: string;
  people: Person[];
  x: number;
  y: number;
};

const Couple = (coupleProps: CoupleProps) => {
  return (
    <div
      id={coupleProps.id}
      className={styles.couple}
      style={{ top: coupleProps.y, left: coupleProps.x }}
    >
      {/* the style here a space between individuals */}
      {coupleProps.people &&
        coupleProps.people.map((person, index) => (
          <Individual
            style={{
              marginBottom:
                index !== coupleProps.people.length - 1 ? "10px" : "0px",
            }}
            name={person.name}
            gender={person.gender}
          />
        ))}
    </div>
  );
};

export default Couple;
