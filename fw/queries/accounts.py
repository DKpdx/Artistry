from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool

class DuplicateAccountError(ValueError):
    pass

class Error(BaseModel):
    message: str

class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    user_pic_url: str
    bio: Optional[str]
    zipcode: int
    is_artist: Optional[bool]

class AccountOut(BaseModel):
    id: int
    username: str
    email: str
    user_pic_url: str
    bio: Optional[str]
    zipcode: int
    is_artist: Optional[bool]

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries():
    def create(self, user: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users(
                            username,
                            email,
                            hashed_password,
                            user_pic_url,
                            bio,
                            zipcode,
                            is_artist
                            )
                        VALUES (
                            %s,%s,%s,%s,%s,%s,%s
                            )
                        RETURNING
                            id,
                            username,
                            email,
                            hashed_password,
                            user_pic_url,
                            bio,
                            zipcode,
                            is_artist;
                        """,
                        [
                            user.username,
                            user.email,
                            hashed_password,
                            user.user_pic_url,
                            user.bio,
                            user.zipcode,
                            user.is_artist,
                        ]
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(
                        id = id,
                        username = user.username,
                        email = user.email,
                        hashed_password = hashed_password,
                        user_pic_url = user.user_pic_url,
                        bio = user.bio,
                        zipcode = user.zipcode,
                        is_artist = user.is_artist
                    )
        except Exception:
            return {"message" : "Could not create user."}

    def get_all(self) -> Union[List[AccountOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            id,
                            username,
                            email,
                            user_pic_url,
                            bio,
                            zipcode,
                            is_artist
                        FROM users;
                        """
                    )
                    return [self.record_to_account_out_no_password(record) for record in db]
        except Exception:
            return {"message": "Could not get the users list"}


    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, email, hashed_password,user_pic_url, bio, zipcode, is_artist
                        FROM users
                        WHERE username = %s;
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message" : "Could not get account."}

    def account_in_to_out(self, id: int, user:AccountIn):
        old_data = user.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out(self, record) -> AccountOutWithPassword:
        dict = {
            "id" : record[0],
            "username" : record[1],
            "email" : record[2],
            "hashed_password" : record[3],
            "user_pic_url" : record[4],
            "bio" : record[5],
            "zipcode" : record[6],
            "is_artist" : record[7],

        }
        return AccountOutWithPassword(**dict)

    def record_to_account_out_no_password(self, record):
        return AccountOut(
            id=record[0],
            username=record[1],
            email=record[2],
            user_pic_url=record[3],
            bio=record[4],
            zipcode=[5],
        )
