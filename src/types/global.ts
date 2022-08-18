export interface Error  {
    statusCode?: number;
  }
  
export interface UserTypes {
    username: string,
    email: string,
    password: string,
    profileImage: string,
    verified: boolean,
    movies: MovieTypes[],
  }

  export interface MovieTypes {
    en: MovieObj
    ge: MovieObj
    budget: number
    genres: any[]
    userId: string
    image: string
    date: string
  }

  export interface MovieObj {
    movieName: string
    director: string
    description: string
  }

