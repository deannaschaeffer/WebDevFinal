import { Exercise } from "../../types"
import { useState, FormEventHandler } from "react"
import styles from "../../styles/Workout.module.css"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../util/firebase"
import { useAuth } from "../auth/AuthUserProvider"

const AddExercise = () => {
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [input3, setInput3] = useState("")
  const { user } = useAuth()

  const addExercise: FormEventHandler<HTMLFormElement> = (e) => {

    e.preventDefault()
    if (input1 === "" || input2 === "" || input3 === "") return

    const exercise: Exercise = {
      description: input1,
      duration: parseInt(input2),
      completed: false,
      owner: user!.email!
    }

    addDoc(collection(db, input3), exercise)
    setInput1("")
    setInput2("")
    setInput3("")
  }

  return (
    <form onSubmit={addExercise} className={styles.inputExercise}>
      <label>Category: </label>
      <input
        className={styles.inputs}
        value={input3}
        type="text"
        onChange={(e) => setInput3(e.target.value)}
      />
      <label>Description: </label>
      <input
        className={styles.inputs}
        value={input1}
        type="text"
        onChange={(e) => setInput1(e.target.value)}
      />
      <label>Duration (in minutes): </label>
      <input
        className={styles.inputs}
        value={input2}
        type="text"
        onChange={(e) => setInput2(e.target.value)}
      />
      <button type="submit">Add Exercise</button>
    </form>
  )

}

export default AddExercise