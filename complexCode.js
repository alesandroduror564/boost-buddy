/*
 * Filename: complexCode.js
 * Description: This code demonstrates a complex implementation of a social media platform.
 */

// User class for creating user objects
class User {
  constructor(name, email, username, password) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.friends = [];
    this.posts = [];
  }

  addFriend(user) {
    this.friends.push(user);
  }

  createPost(content) {
    const post = new Post(content, this);
    this.posts.push(post);
    return post;
  }
}

// Post class for creating post objects
class Post {
  constructor(content, author) {
    this.content = content;
    this.author = author;
    this.likes = 0;
    this.comments = [];
  }

  addLike() {
    this.likes++;
  }

  addComment(user, comment) {
    const newComment = new Comment(user, comment);
    this.comments.push(newComment);
  }
}

// Comment class for creating comment objects
class Comment {
  constructor(user, comment) {
    this.user = user;
    this.comment = comment;
  }
}

// Creating users and posts
const john = new User("John Doe", "john@example.com", "johndoe1", "password123");
const jane = new User("Jane Doe", "jane@example.com", "janedoe1", "password456");

// John adds Jane as a friend and creates a post
john.addFriend(jane);

const johnsPost = john.createPost("Hello world!");

// Jane likes John's post and adds a comment
johnsPost.addLike();
johnsPost.addComment(jane, "Nice post!");

console.log(john);
console.log(jane);

/*
 * More code can be added here to simulate further functionality, such as:
 * - Ability to delete posts and comments
 * - Notification system for new likes and comments
 * - Profile picture upload and display
 * - Friend request and approval system
 * - User authentication and authorization
 * - And much more...
 */