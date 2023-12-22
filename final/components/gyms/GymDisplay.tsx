import { GymWithId } from "../../types"
import styles from "../../styles/Gym.module.css"

type Props = {
  readonly gym: GymWithId
}

const GymDisplay = ({ gym: { name, type, address, image } }: Props) => {

  return (
    <div className={styles.surroundDisplay}>
      <article className={styles.display}>
        <h2>{name}</h2>
        <img src={image} className={styles.image} />
        <p>{`Type: ${type}`}</p>
        <p>{`Located at: ${address}`}</p>
      </article>
    </div>
  )
}

export default GymDisplay