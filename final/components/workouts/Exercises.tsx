import React, { useState } from "react"
import { ExerciseWithId } from "../../types"
import styles from "../../styles/Workout.module.css"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../../util/firebase"
import { useAuth } from "../auth/AuthUserProvider"

type Props = {
  readonly exercise: ExerciseWithId
  readonly category: string
}

const Exercises = ({ exercise: { id, description, duration, completed }, category }: Props) => {

  const { user } = useAuth()

  const toggleExercise = () => {
    updateDoc(doc(db, category, id), { completed: !completed })
  }

  return (
    <div className={styles.exercise}>
      {user ?
        <p>{description} <br />{`${duration} minutes`} <br />
          <label>Completed</label>
          <input type="checkbox" onChange={toggleExercise} checked={completed} />
        </p>
        : <p>{description} <br />{`${duration} minutes`}</p>}
    </div>
  )
}

export default Exercises