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


class LikesOutWithAccount(LikesOut):
    username: str


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
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.likes_in_to_out(id, likes)
        except Exception:
            return {"message": "Can't create like"}

    def get_all(self) -> Union[Error, List[LikesOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , user_id
                        , art_id
                        , liked_by
                        , created_at
                        FROM likes
                        ORDER BY created_at;
                        """
                    )
                    return [
                        self.record_to_likes_out(record) for record in result
                    ]
        except Exception:
            return {"message": "Can't find any liked images"}
    
    def get_like_by_id(self, likes_id: int) -> Optional[LikesOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , user_id
                        , art_id
                        , liked_by
                        , created_at
                        FROM likes
                        WHERE id = %s
                        """,
                        [likes_id],
                    )
                    record = result.fetchone()
                    if record is not None:
                        return self.record_to_likes_out(record)
        except Exception:
            return None

    def get_likes_by_user(self, liked_by: int) -> Union[Error, List[LikesOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , user_id
                        , art_id
                        , liked_by
                        , created_at
                        FROM likes
                        WHERE liked_by = %s
                        """,
                        [liked_by],
                    )
                    return [
                        self.record_to_likes_out(record) for record in result
                    ]
        except Exception:
            return {"message": "You haven't liked anything yet."}

    def likes_in_to_out(self, id: int, likes: LikesIn):
        data = likes.dict()
        return LikesOut(id=id, **data)

    def record_to_likes_out(self, record):
        return LikesOut(
            id=record[0],
            user_id=record[1],
            art_id=record[2],
            liked_by=record[3],
            created_at=record[4],
        )

    def delete(self, likes_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM likes
                        WHERE id = %s
                        """,
                        [likes_id],
                    )
                    return True
        except Exception as e:
            return False
