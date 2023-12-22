import { Gym, GymWithId } from "../../types"
import { useState, FormEventHandler, useEffect } from "react"
import GymDisplay from "./GymDisplay"
import styles from "../../styles/Gym.module.css"
import { query, collection, where, onSnapshot, Query } from "firebase/firestore"
import { db } from "../../util/firebase"

const GymSearch = () => {
  const [input, setInput] = useState("")
  const [option, setOption] = useState("----------")
  const [gymList, setGymList] = useState<GymWithId[] | null>(null)
  const [search, setSearch] = useState("")

  const results = option === "----------" ? query(collection(db, "gyms")) : query(collection(db, "gyms"), where(option, "==", search));

  useEffect(() => {
    const unsubscribe = onSnapshot(results, (querySnapshot) => {
      const gyms = querySnapshot.docs.map((doc) =>
        ({ ...doc.data() as Gym, id: doc.id })
      )
      setGymList(gyms)
    })
    return unsubscribe
  }, [search])

  const changeOption = (currentOption: string) => {
    setOption(currentOption)
  }

  const gymSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    setSearch(input)
  }

  return (
    <div className={styles.gymSearch}>
      <label> Search for gyms by: </label>
      <select onChange={(e) => changeOption(e.target.value)}>
        <option value="----------">----------</option>
        <option value="name">Name</option>
        <option value="address">Address</option>
      </select>
      <div className={styles.search}>
        <form onSubmit={gymSearch} >
          <input type="search" value={input} onChange={(e) => setInput(e.target.value)} />
          <button>Search</button>
        </form>
      </div>
      {gymList ? gymList.map((gym) =>
        <GymDisplay key={gym.name + gym.address} gym={gym} />
      ) : ""}
    </div>
  )
}

// .filter((gym) => (option === "name") ? gym.name === input : gym.address === input)

export default GymSearch