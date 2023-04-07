from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool
import datetime

class DuplicateLikesError(ValueError):
    pass

class Error(BaseModel):
    message: str

class LikesIn(BaseModel):
    user_id: int
    art_id: int
    liked_by: int
    created_at: datetime.datetime

class LikesOut(BaseModel):
    id: int
    user_id: int
    art_id: int
    liked_by: int
    created_at: datetime.datetime



class LikesQueries:
    def create(self, likes: LikesIn) -> LikesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO likes(
                            user_id,
                            art_id,
                            liked_by,
                            created_at
                        )
                        VALUES (
                            %s, %s, %s, %s
                        )
                        RETURNING id;
                        """,
                        [
                            likes.user_id,
                            likes.art_id,
                            likes.liked_by,
                            likes.created_at,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.likes_in_to_out(id, likes)
        except Exception:
            return {"message": "Can't create like"}

    def likes_in_to_out(self, id: int, likes: LikesIn):
        data = likes.dict()
        return LikesOut(id=id, **data)

    def delete(self, likes_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM likes
                        WHERE id = %s
                        """,
                        [likes_id]
                    )
                    return True
        except Exception as e:
            return False