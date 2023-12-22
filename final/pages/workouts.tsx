import Category from "../components/workouts/Categories"
import Navbar from "../components/layout/Navbar"
import styles from "../styles/Workout.module.css"
import AddExercise from "../components/workouts/AddExercise"
import { useAuth } from "../components/auth/AuthUserProvider"

const Workouts = () => {

  let durationSet: Set<number> = new Set()

  const toggleDuration = (duration: number, checked: boolean) => {

    checked ? durationSet.add(duration) : durationSet.delete(duration)

  }

  const { user } = useAuth()

  return (
    <div>
      <Navbar />
      <div className={styles.workoutPage}>
        <h1>Choose from the categories below to see {user ? "your" : "some"} workouts!</h1>
        {!user && <h3>Sign in to personalize your exercises and keep track of which ones you've completed.</h3>}
        <div className={styles.filter}>
          <label>Filter by Duration: </label>
          <div>
            <input type="checkbox" onChange={(e) => toggleDuration(5, e.target.checked)} />
            <label> 5 minutes</label>
          </div>
          <div>
            <input type="checkbox" onChange={(e) => toggleDuration(10, e.target.checked)} />
            <label> 10 minutes</label>
          </div>
          <div>
            <input type="checkbox" onChange={(e) => toggleDuration(20, e.target.checked)} />
            <label> 20 minutes</label>
          </div>

        </div>
        <div className={styles.surroundCategories}>
          <div><Category categoryName="cardio" durations={durationSet} /></div>
          <div><Category categoryName="arms" durations={durationSet} /></div>
          <div><Category categoryName="legs" durations={durationSet} /></div>
          <div><Category categoryName="abs" durations={durationSet} /></div>
        </div>
        {user &&
          <div className={styles.add}>
            <h3>Add your favorite exercises below.</h3>
            <AddExercise />
          </div>
        }
      </div>
    </div>
  )
}

export default Workouts