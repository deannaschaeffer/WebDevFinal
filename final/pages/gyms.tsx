import GymSearch from "../components/gyms/GymSearch"
import Navbar from "../components/layout/Navbar"
import styles from "../styles/Gym.module.css"

const Gyms = () => {

  return (
    <div>
      <Navbar />
      <div className={styles.gym}>
        <GymSearch />
      </div>
    </div>
  )
}

export default Gyms