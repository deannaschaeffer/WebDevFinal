export type Exercise = {
  description: string,
  duration: number,
  completed: boolean,
  owner: string,
}

export type ExerciseWithId = Exercise & {
  id: string
}

export type Gym = {
  name: string,
  type: string,
  address: string,
  image: string
}

export type GymWithId = Gym & {
  id: string
}