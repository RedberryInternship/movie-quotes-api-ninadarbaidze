declare global {
    namespace NodeJS {
      interface ProcessEnv {
        JWT_SEC: string;
        JWT_SEC_AUTH: string
        
      }
    }
  }

  export {}