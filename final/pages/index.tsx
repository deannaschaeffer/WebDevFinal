import Navbar from "../components/layout/Navbar"
import styles from "../styles/Home.module.css"

const IndexPage = () => (
  <div>
    <Navbar />
    <div className={styles.home}>
      <h1>Welcome to Workout Central!</h1>
      <p>Here you can get ideas for new workouts, keep track of your own workouts, and check out different gyms near you!</p>
      <img className={styles.image} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhwmtMMkIVMbJA2Hiuvc5GL_4NH_GedfmYtQ&usqp=CAU" />
    </div>
  </div>
)

export default IndexPage