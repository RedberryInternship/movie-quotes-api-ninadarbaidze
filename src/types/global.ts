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

  export interface ServerToClientEvents {
    noArg?: () => void;
    basicEmit?: (a: number, b: string, c: Buffer) => void;
    withAck?: (d: string, callback: (e: number) => void) => void;
    emit?: (event: string, data: any) => void
    on: (event: string, callback: (data: any)=> void) => void 
  }
  
  export interface ClientToServerEvents {
    hello: () => void;
  }
  
  export interface InterServerEvents {
    ping: () => void;
  }
  
  export interface SocketData {
    name: string;
    age: number;
  }

