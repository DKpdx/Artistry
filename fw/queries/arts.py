from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool

class DuplicateArtError(ValueError):
    pass

class Error(BaseModel):
    message: str

class ArtIn(BaseModel):
    title: str
    category: str
    art_pic_url: str
    description: str
    price: int

class ArtOut(BaseModel):
    id: int
    user_id: int
    title: str
    category: str
    art_pic_url: str
    description: str
    price: int

class ArtOutWithAccount(ArtOut):
    username: str

class ArtQueries:
    def get_one(self, art_id: int) -> Optional[ArtOutWithAccount]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            arts.id,
                            arts.user_id,
                            arts.title,
                            arts.category,
                            arts.art_pic_url,
                            arts.description,
                            arts.price,
                            users.username
                        FROM arts
                        INNER JOIN users
                        ON users.id=arts.user_id
                        WHERE arts.id = %s
                        """,
                        [art_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    print(record)
                    return self.record_to_art_out(record)
        except Exception as e:
            return {"message": "Could not get art"}

    def delete(self, art_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM arts
                        WHERE id = %s
                        """,
                        [art_id]
                    )
                    return True
        except Exception as e:
            return False

    def update(self, art_id: int, art: ArtIn, user_id: int) -> Union[ArtOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE arts
                        SET title = %s,
                            category = %s,
                            art_pic_url = %s,
                            description = %s,
                            price = %s
                        WHERE id = %s
                        """,
                        [
                            art.title,
                            art.category,
                            art.art_pic_url,
                            art.description,
                            art.price,
                            art_id
                        ]
                    )
                    return self.art_in_to_out(art_id, art, user_id)
        except Exception as e:
            return {"message": "Could not update art"}

    def get_all(self) -> Union[List[ArtOutWithAccount], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            arts.id,
                            arts.user_id,
                            arts.title,
                            arts.category,
                            arts.art_pic_url,
                            arts.description,
                            arts.price,
                            users.username
                        FROM arts
                        INNER JOIN users
                        ON users.id=arts.user_id;
                        """,
                    )
                    return [
                        self.record_to_art_out(record)
                        for record in result
                    ]
        except Exception as e:
            return {"message": "Could not get all arts"}

    def create(self, art: ArtIn, user: int) -> ArtOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO arts(
                        user_id,
                        title,
                        category,
                        art_pic_url,
                        description,
                        price
                    )
                    VALUES (
                        %s, %s, %s, %s, %s, %s
                    )
                    RETURNING id;
                    """,
                    [
                        user,
                        art.title,
                        art.category,
                        art.art_pic_url,
                        art.description,
                        art.price,
                    ]
                )
                id = result.fetchone()[0]
                return self.art_in_to_out(id, art, user)

    def art_in_to_out(self, id: int, art: ArtIn, user: int):
        data = art.dict()
        return ArtOut(id=id, **data, user_id=user)

    def record_to_art_out(self, record):
        print(record)
        return ArtOutWithAccount(
            id=record[0],
            user_id=record[1],
            title=record[2],
            category=record[3],
            art_pic_url=record[4],
            description=record[5],
            price=record[6],
            username=record[7],
        )
