import React from "react"
import Link from "next/link"
import styles from "../../styles/Home.module.css"
import { useAuth } from "../auth/AuthUserProvider"
import { signInWithGoogle } from "../../util/firebase"

type NavLink = {
  name: string
  path: string
}

const navData: NavLink[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Workouts",
    path: "/workouts",
  },
  {
    name: "Gyms",
    path: "/gyms",
  }
]

const Navbar = () => {
  const { user, signOut } = useAuth()
  return (
    < header className={styles.nav} >
      <nav >
        {navData
          .map(({ name, path }) => (
            <Link key={path} href={path}>
              <a>{name}</a>
            </Link>
          ))
          // @ts-ignore
          .reduce((left, right) => [left, " | ", right])
        }
        <button className={styles.button} onClick={user ? signOut : signInWithGoogle}>
          {user ? "Sign Out" : "Sign In"}
        </button>
      </nav>

    </header >
  )
}

export default Navbar