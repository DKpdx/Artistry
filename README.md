# Fine Whatever

#### Team:

* Chase Whitaker - Software Developer
* John Jackson - Sofeware Developer
* Daniel Mitchell - Software Developer
* Heather DePesa - Software Developer
* Peter Trinh - Software Developer

## Intended Audience

Fine Whatever is a web application that allows user to appreciate other user's arts locally and globally. By being a user, you can show your appreication to other user's art by liking their art, or you can post your own art to show-off to other user.

## Project Diagram

![image](/uploads/170867856e84ec83f0924c3e4e1902f2/image.png)

## Getting Started

#### Cloning Repository

Please have Docker downloaded before continuing with the following steps:
1. In the terminal, change the directory that the project will be clone in
2. In the terminal, type https://gitlab.com/im-fine-with-whatever/fine-whatevers
3. Switch to the directory

**Running Docker**
```
docker volume create fwvolume
docker-compose build
docker-compose up
```

**Note**

If encounter a warning about missing environment variable named OS and macOS, it can be safely ingored

## Functionality

* Users can create an account and log into the account
  * The user can make changes to their account by either updating or deleting the account
* The login user can create an art
  * The user can make changes to their art by either updating or deleteing the art
* Other user is able to like that user's art
* The other user that liked the art, will store their liked arts under their account
