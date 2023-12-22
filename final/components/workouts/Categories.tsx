import Exercises from "./Exercises"
import { ExerciseWithId, Exercise, Gym } from "../../types"
import { useState, useEffect } from "react"
import styles from "../../styles/Workout.module.css"
import { query, collection, onSnapshot, where } from "firebase/firestore"
import { db } from "../../util/firebase"

import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { useAuth } from "../auth/AuthUserProvider"

type Props = {
  readonly categoryName: string
  readonly durations: Set<number>
}

const Category = ({ categoryName, durations }: Props) => {
  const [dropdown, setDropdown] = useState(false)
  const [exerciseList, setExerciseList] = useState<ExerciseWithId[] | null>(null)
  const { user } = useAuth()

  const exerciseData = query(collection(db, categoryName))
  // where("owner", "==", user ? user!.email! : ""))
  // user ? query(collection(db, categoryName), where("owner", "==", user!.email!)) : query(collection(db, categoryName), where("owner", "==", ""))

  useEffect(() => {
    const unsubscribe = onSnapshot(exerciseData, (querySnapshot) => {
      const exercises = querySnapshot.docs.map((doc) =>
        ({ ...doc.data() as Exercise, id: doc.id })
      )
      console.log(exercises)
      setExerciseList(exercises)

    })
    return unsubscribe
  }, [])

  const toggleDropdown = () => {
    setDropdown(!dropdown)
  }

  const filterExercises = () => {
    let exerciseArray: Array<ExerciseWithId> = []
    if (durations.size === 0) {
      return exerciseList ? exerciseList : []
    }
    else {
      durations.forEach((value) => exerciseArray = exerciseArray.concat(exerciseList ? exerciseList.filter(exercise => exercise.duration === value) : []))
      return exerciseArray
    }
  }

  return (
    <div className={styles.category}>
      <button onClick={toggleDropdown} className={styles.button}>
        <h3 className={styles.buttonWords}>{categoryName}</h3>
        {dropdown ? <FaCaretDown className={styles.caret} /> : <FaCaretUp className={styles.caret} />}
      </button>
      {dropdown ?
        filterExercises().filter(exercise => user ? exercise.owner === user!.email! : exercise.owner === "").map(exercise =>
          <Exercises key={exercise.id} exercise={exercise} category={categoryName} />
        ) : ""}
    </div>
  )

}

export default Category