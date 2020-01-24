import * as siege from "siege";

siege()
    .on(3001)
    .get('/posts')
    .attack();
