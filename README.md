# Fine Whatever

#### Team:

* Chase Whitaker - Software Developer
* John Jackson - Sofeware Developer
* Daniel Mitchell - Software Developer
* Heather DePesa - Software Developer
* Peter Trinh - Software Developer

## Project Design

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

## API Overview

#### Fine Whatever FastAPI

Fine Whatever utilizes FastAPI for our backend to let users to create an account that allows them authorization to make any changes to their account. 
* They can update their account information, but also delete their account if they wanted to
Being an authorize user, the user can create an art
* The user can make changes to their art by updating it or they can delete it
An authorize user can like other user arts

The account, art, and likes are all store in the database.

#### React

* Create/Update/Delete account
* Have an account detail page
* Login/Logout account
* Create/Update/Delete art
* Have an art detail page
* Create like art by user
* Have a list of likes by user
* Landing Page

#### FastAPI Endpoints

#### Account

| Method | Action             | URL                                |
|  ----- | ------------------ | ---------------------------------- |
|  POST  |  Create an Account  | http://localhost:8000/accounts |
| PUT | Update Account | http://localhost:8000/accounts/{user_id} |
| GET | Get Account Detail | http://localhost:8000/accounts/{user_id} |
| DEL | Delete Account | http://localhost:8000/accounts/{user_id} |

 <details>
<summary><strong>Create Account</strong></summary>
<br>

#### Input:
```
{
    "username": "string",
    "password": "string",
    "email": "string",
    "user_pic_url": "string",
    "bio": "string",
    "zipcode": 0
}
```
#### Ouput:
```
{
    "access_token": "string",
    "token_type": "Bearer",
    "account": {
      "id": 0,
      "username": "string",
      "email": "string",
      "user_pic_url": "string",
      "bio": "string",
      "zipcode": 0
  }
}
```

</details>

 <details>
<summary><strong>Update Account</strong></summary>
<br>

#### Input:
```
{
    "username": "string",
    "email": "string",
    "user_pic_url": "string",
    "bio": "string",
    "zipcode": "string"
}
```
#### Ouput:
```
{
    "id": 0,
    "username": "string",
    "email": "string",
    "user_pic_url": "string",
    "bio": "string",
    "zipcode": 0
}
```

</details>

</details>

<details>
<summary><strong>Account Detail</strong></summary>
<br>

```
{
	"id": 0,
  "username": "string",
  "email": "string",
  "user_pic_url": "string",
  "bio": "string",
  "zipcode": 0
}
```

</details>

<details>
<summary><strong>Delete Account</strong></summary>
<br>

```
{
	true
}
```

</details>

#### Art

| Method | Action             | URL                                |
|  ----- | ------------------ | ---------------------------------- |
| POST | Create an Art | http://localhost:8000/arts |
| PUT | Update Art | http://localhost:8000/arts/{art_id}/update |
| GET | List of Arts | http://localhost:8000/arts |
| GET | Art Detail | http://localhost:8000/arts/{art_id} |
| DEL | Delete Art | http://localhost:8000/arts/{art_id} |

 <details>
<summary><strong>Create Art</strong></summary>
<br>

#### Input:
```
{
    "title": "string",
    "category": "string",
    "art_pic_url": "string",
    "description": "string",
    "price": 0
}
```
#### Ouput:
```
{
    "id": 0,
    "user_id": 0,
    "title": "string",
    "category": "string",
    "art_pic_url": "string",
    "description": "string",
    "price": 0
}
```

</details>

 <details>
<summary><strong>Update Art</strong></summary>
<br>

#### Input:
```
{
    "title": "string",
    "category": "string",
    "art_pic_url": "string",
    "description": "string",
    "price": 0

}
```
#### Ouput:
```
{
    "id": 0,
    "user_id": 0,
    "title": "string",
    "category": "string",
    "art_pic_url": "string",
    "description": "string",
    "price": 0
}
```

</details>

<details>
<summary><strong>List of Arts</strong></summary>
<br>

```
[
  {
      "id": 0,
      "user_id": 0,
      "title": "string",
      "category": "string",
      "art_pic_url": "string",
      "description": "string",
      "price": 0,
      "username": "string"
  }
]
```

</details>

<details>
<summary><strong>Art Detail</strong></summary>
<br>

```
{
    "id": 0,
    "user_id": 0,
    "title": "string",
    "category": "string",
    "art_pic_url": "string",
    "description": "string",
    "price": 0,
    "username": "string"
}
```

</details>

<details>
<summary><strong>Delete Art</strong></summary>
<br>

```
{
	true
}
```

</details>

#### Likes
| Method | Action             | URL                                |
|  ----- | ------------------ | ---------------------------------- |
| POST | Create a Like | http://localhost:8000/likes |

<details>
<summary><strong>Create Like</strong></summary>
<br>

```
{
    "user_id": 0,
    "art_id": 0,
    "liked_by": 0,
    "created_at": "2023-04-26T22:25:18.105Z"
}
```

</details>
