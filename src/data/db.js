export const STORAGE_KEY = 'convene-db';

export const generateDateTimeLocale=() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const formattedTime = today.toLocaleTimeString();
    // console.log('Date and Time (localized):', formattedDate + ' ' + formattedTime);
    return formattedDate +'' + formattedTime;
  }
  
const hasData = () => {
    return localStorage.getItem(STORAGE_KEY) !== null;
};

// ... other data storage functions (getItem, addItem, etc.)


export const initializeDB = () => {
      if (hasData()) {
        console.log('Local storage already has data with key:', STORAGE_KEY);
        return;
      } else {
        console.log('Local storage does not have data with key:', STORAGE_KEY);
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            users_table: {},
            posts_table: {},
            comments_table: {},
            meetups_table: {},
        }));
        }
    }
};


export const getNextId = () => {
  const randomPart = Math.random().toString(36).substring(2); // Remove leading "0."
  const timestampPart = Date.now().toString(36).toUpperCase(); // Optional: uppercase
  return timestampPart.slice(-4) + randomPart.slice(0, 4); // Combine and truncate (adjust as needed)
};

const myDataBase = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

export const db = {
    userTbl : {
       CREATE_USER:  (user) => {
            const tableName = 'users_table';
            console.log(user)
            if(!user.name || !user.email || !user.password || !user.id){
                throw new Error('User object missing required fields');
            }
            else{
            myDataBase[tableName] = myDataBase[tableName] || {};
            myDataBase[tableName][user.id] = user;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));

            console.log('User created successfully:', user);
            console.log('myDataBase:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
            }
        } ,
        GET_USER: (user_id) => {
            const tableName = 'users_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            const user = myDataBase[tableName][user_id];
            console.log('User fetched successfully:', user);
            return user;
        },
        GET_ALL_USERS: () => {
            const tableName = 'users_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            const users = Object.values(myDataBase[tableName]);
            //console.log('Users fetched successfully:', users);
            return users;
        },
        UPDATE_USER: (user_id, user) => {
            const tableName = 'users_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            myDataBase[tableName][user_id] = user;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('User updated successfully:', user);
            console.log('myDataBase:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
        },
        DELETE_USER: (user_id) => {
            const tableName = 'users_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            delete myDataBase[tableName][user_id];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('User deleted successfully:', user_id);
            console.log('myDataBase:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
        }
    },
    postTbl : {
        CREATE_POST: (post) => {
            const tableName = 'posts_table';
            console.log('Data received for creating a new post is: ', post)
            if(!post.post_id ||!post.user_id  || !post.meetup_id ||!post.question || !post.date_created){
                throw new Error('Post object missing required fields');
            }
            else{
            myDataBase[tableName] = myDataBase[tableName] || {};
            myDataBase[tableName][post.post_id ] = post;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('Post created successfully:', post);
            }
        },
        GET_POST: (post_id) => {
            console.log('id received is', post_id)
            const tableName = 'posts_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            const post = myDataBase[tableName][post_id]
            console.log(typeof(post))
            console.log('Post fetched successfully:', post);
            return post;
        },
        GET_ALL_POSTS: () => {
            const tableName = 'posts_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            const posts = Object.values(myDataBase[tableName]);
            return posts;
        },
        UPDATE_POST: (post) => {
            // const pId = post.post_id
            const tableName = 'posts_table';
            myDataBase[tableName] = {...myDataBase[tableName], pId: post};
            // myDataBase[tableName][post.post_id] = post;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('Post updated successfully:', post);
            console.log('myDataBase:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
        },
        DELETE_POST: (post_id) => {
            const tableName = 'posts_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            delete myDataBase[tableName][post_id];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('Post deleted successfully:', post_id);
            console.log('myDataBase:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
        }
    },
    commentTbl : {
        CREATE_COMMENT: (comment) => {
            const tableName = 'comments_table';
            if(!comment.comment_id ||!comment.user_id ||!comment.post_id ||!comment.comment ||!comment.date_created){
                throw new Error('Comment object missing required fields');
            }
            else{
            myDataBase[tableName] = myDataBase[tableName] || {};
            myDataBase[tableName][comment.comment_id] = comment;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('Comment created successfully:', comment);
            }
        },
        GET_COMMENT: (comment_id) => {
            const tableName = 'comments_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            const comment = myDataBase[tableName][comment_id];
            console.log('Comment fetched successfully:', comment);
            return comment;
        },
        GET_ALL_COMMENTS: () => {
            const tableName = 'comments_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            const comments = Object.values(myDataBase[tableName]);
            console.log('Comments fetched successfully:', comments);
            return comments;
        },
        UPDATE_COMMENT: (comment_id, comment) => {
            const tableName = 'comments_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            myDataBase[tableName][comment_id] = comment;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('Comment updated successfully:', comment);
            console.log('myDataBase:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
        },
        DELETE_COMMENT: (comment_id) => {
            const tableName = 'comments_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            delete myDataBase[tableName][comment_id];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('Comment deleted successfully:', comment_id);
            console.log('myDataBase:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
        },
        GET_COMMENTS_BY_POST: (post_id) => {
            const tableName = 'comments_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            const comments = Object.values(myDataBase[tableName]).filter((comment) => comment.post_id === post_id);
            console.log('Comments fetched successfully:', comments);
            return comments;
        }

    },
    meetUpTbl : {
        CREATE_MEETUP: (meetUp) => {
            const tableName ='meetups_table';
            if(!meetUp.meetup_id ||!meetUp.description ||!meetUp.title ||!meetUp.date_created){
                throw new Error('MeetUp object missing required fields');
            }
            else{
            myDataBase[tableName] = myDataBase[tableName] || {};
            myDataBase[tableName][meetUp.meetup_id] = meetUp;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('MeetUp created successfully:', meetUp);
            }
        },
        GET_MEETUP: (meetup_id) => {
            const tableName ='meetups_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            const meetUp = myDataBase[tableName][meetup_id];
            console.log('MeetUp fetched successfully:', meetUp);
            return meetUp;
        },
        GET_ALL_MEETUPS: () => {
            const tableName ='meetups_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            const meetUps = Object.values(myDataBase[tableName]);
            console.log('MeetUps fetched successfully:', meetUps);
            return meetUps;
        },
        UPDATE_MEETUP: (meetup_id, meetUp) => {
            const tableName ='meetups_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            myDataBase[tableName][meetup_id] = meetUp;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('MeetUp updated successfully:', meetUp);
            console.log('myDataBase:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
        },
        DELETE_MEETUP: (meetup_id) => {
            const tableName ='meetups_table';
            myDataBase[tableName] = myDataBase[tableName] || {};
            delete myDataBase[tableName][meetup_id];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
            console.log('MeetUp deleted successfully:', meetup_id);
            console.log('myDataBase:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
        },

    },
}



//  answerTbl: {
//         CREATE_ANSWER: (answer) => {
//             const tableName = 'answers_table';
//             if(!answer.answer_id || !answer.user_id || !answer.question_id || !answer.content || !answer.date_created){
//                 throw new Error('Answer object missing required fields');
//             } else {
//                 myDataBase[tableName] = myDataBase[tableName] || {};
//                 myDataBase[tableName][getNextId()] = answer;
//                 localStorage.setItem(STORAGE_KEY, JSON.stringify(myDataBase));
//                 console.log('Answer created successfully:', answer);
//             }
//         },
//         GET_ANSWER: (question_id) => {
//             const tableName = 'answers_table';
//             myDataBase[tableName] = myDataBase[tableName] || {};
//             const answer = myDataBase[tableName][question_id];
//             console.log('Answer fetched successfully:', answer);
//             return answer;
//         },
//         GET_ALL_ANSWERS: () => {
//             const tableName = 'answers_table';
//             myDataBase[tableName] = myDataBase[tableName] || {};
//             const answers = Object.values(myDataBase[tableName]);
//             console.log('Answers fetched successfully:', answers);
//             return answers;
//         }
//     }

// db.users_table[user.id] = Math.random().toString();
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(db));