
![logo](https://user-images.githubusercontent.com/33086430/189179222-5e2fc7c0-f7ee-4b42-9048-1ddfa57d11b4.png)
# Movie Quotes API

Movie Quotes is a social media platform, where user can add movies and add quotes to their movies. Users also have news feed, where they see and can interact with each others quotes/posts, get notifications in real time etc.

---

### Table of Contents
- [Prerequisites](#Prerequisites)  
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Resources](#Resources)

### Prerequisites
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png' width="15" style='padding-right: 5px'/> *Node JS v16.X*  
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/540px-Npm-logo.svg.png' width="15" style='padding-right: 5px'/> *npm v8.X*    
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png' width="15" style='padding-right: 5px'/> *Typescript 4.*  



---

### Tech Stack
* <img src='https://user-images.githubusercontent.com/33086430/173361357-714c676e-de2c-4416-8d70-66815705a3d8.png' width="15" style='padding-right: 5px'/>  [*Express @4.18.1*](https://expressjs.com/) - Back end framework  
* <img src='https://miro.medium.com/max/1400/0*FKxKT6vIad9ZFlCn.png' width="15" style='padding-right: 5px'/> [*dotenv @16.0.1*](https://www.npmjs.com/package/dotenv) - Loads environment variables  
* <img src='https://user-images.githubusercontent.com/33086430/173362353-0bd21d1e-fa4b-4b75-baea-a600fffd66f4.png' width="15" style='padding-right: 5px'/> [*bBcrypt @5.0.1*](https://www.npmjs.com/package/bcrypt) - Password-hashing function  
* <img src='https://express-validator.github.io/img/logo.svg' width="15" style='padding-right: 5px'/> [*Express Validator @6.14.1*](https://express-validator.github.io/docs/) - Enables validation  
* <img src='https://static.cdnlogo.com/logos/j/20/jwt.svg' width="15" style='padding-right: 5px'/> [*JWT - Json Web Token @6.3.6*](https://jwt.io/) - Unique token generator  
* <img src='https://user-images.githubusercontent.com/33086430/173362596-5ec31137-b055-4f33-90d0-572d56f98fe1.png' width="15" style='padding-right: 5px'/> [*Swagger @4.4.0*](https://swagger.io/) - Documentation for API  
* <img src='https://raw.githubusercontent.com/andris9/Nodemailer/master/assets/nm_logo_200x136.png' width="15" style='padding-right: 5px'/> [*Node mailer @1.0.0*](https://nodemailer.com/about/) - Module for send emails
* <img src='https://camo.githubusercontent.com/7c669e872b214571ae0b5097e8d3db369225a806dc2ce9a436cde3497164310c/687474703a2f2f6d6f6e676f64622d746f6f6c732e636f6d2f696d672f6d6f6e676f6f73652e706e67' width="15" style='padding-right: 5px'/> [*Mongoose @6.4.0*](https://mongoosejs.com/docs/) - Library for MongoDB and Node. js
* <img src="https://ik.imagekit.io/ably/ghost/prod/2021/03/socket-io-logo.jpeg?tr=w-1520" height="15"  style='padding-right: 5px'> [socket io @4.5.1](https://socket.io/) - Library for real-time web applications



---


### Getting Started
1. Clone Movie Quotes API repository from github:

```
git clone git@github.com:RedberryInternship/movie-quotes-api-ninadarbaidze.git
```


2. Install dependencies

```
npm install
```


3. Copy .env.example and add your env variables

```
cp .env.example .env
```

4. Start server

```
npm run dev
```

5. Swagger documentation URL

```
http://localhost:3001/api-docs/

```

---


### Project Structure

```

├─── src     
│   ├─── config    
│   ├─── controllers 
│   ├─── mail 
│   ├─── middlewares 
│   ├─── models 
│   ├─── routes 
│   ├─── schemas 
│   ├─── types 
│   ├─── views 
│   ├─── server.ts 
│   ├─── socket.ts 


- .env.example   
- .eslintrc.json   
- .prettierrc.json
- babel.config.json
- .gitignore   
- environment.d.ts
- tsconfig.json
- package-lock.json 
- package.json       


```

### Resources

- [Application Design](https://www.figma.com/file/5uMXCg3itJwpzh9cVIK3hA/Movie-Quotes-Bootcamp-assignment)
- [Git Commit Conventions](https://redberry.gitbook.io/resources/git-is-semantikuri-komitebi)

