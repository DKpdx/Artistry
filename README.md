# Fine Whatever

#### Team:

* Chase Whitaker - Software Developer
* John Jackson - Sofeware Developer
* Daniel Mitchell - Software Developer
* Heather DePesa - Software Developer
* Peter Trinh - Software Developer

## Design

Fine Whatever is a web application that allows user to appreciate other user's arts locally and globally.

## Project Diagram

![image](/uploads/170867856e84ec83f0924c3e4e1902f2/image.png)

## Getting Started

#### Cloning Repository

Please have Docker downloaded before continuing with the following steps:
1. In the terminal, change the directory that the project will be clone in
2. In the terminal, type https://gitlab.com/im-fine-with-whatever/fine-whatevers
3. Switch to the directory

Running Docker
```
docker volume create fwvolume
docker-compose build
docker-compose up
```

Note
If encounter a warning about missing environment variable named OS and macOS, it can safely ingored

## API Overview

#### FastAPI Endpoints

#### Account

| Method | Action | URL |
|  ----- | ------ | --- |
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
