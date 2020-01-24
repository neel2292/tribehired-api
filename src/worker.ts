import * as workerpool from 'workerpool';
import * as fs from 'fs-extra';

async function getPosts() {
    const posts = await fs.readJson('./models/posts.json');
    const comments = await fs.readJson('./models/comments.json');
    const tmp = {}; // group comments by posts for easier assignment

    (comments || []).forEach((comment) => {
        tmp[comment.postId] = tmp[comment.postId] || 0;
        tmp[comment.postId]++;
    });

    (posts || []).forEach((post) => {
        post.comments = tmp[post.id];
    });

    return posts;
}

async function findPost(id) {
   const posts = await getPosts();

   return (posts || []).filter((post) => {
       // tslint:disable-next-line:triple-equals
       return post.id == id;
   });
}

async function getComments() {
    return await fs.readJson('./models/comments.json');
}

async function findComment(id) {
    const comments = await getComments();

    return (comments || []).filter((comment) => {
        // tslint:disable-next-line:triple-equals
        return comment.id == id;
    });
}

async function filterComments() {
    const args = ['id', 'postId', 'name', 'email', 'body'];
    const comments = await getComments();
    const filters = {};
    let i = 0;

    for (const argument of arguments) {
        if (argument !== null) { filters[args[i]] = argument; }
        i++;
    }

    return (comments || []).filter((comment) => {
        return Object.keys(filters).map(filter => {
            if (typeof comment[filter] === 'string') {
                return comment[filter].indexOf(filters[filter]) > -1;
            } else {
                // tslint:disable-next-line:triple-equals
                return comment[filter] == filters[filter];
            }
        }).indexOf(false) === -1;
    });
}

workerpool.worker({
    getPosts,
    findPost,
    getComments,
    findComment,
    filterComments,
});
