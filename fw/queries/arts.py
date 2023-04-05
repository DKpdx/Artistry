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
    title: str
    category: str
    art_pic_url: str
    description: str
    price: int

class ArtQueries:
    def get_one(self, art_id: int) -> Optional[ArtOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id,
                            title,
                            category,
                            art_pic_url,
                            description,
                            price
                        FROM arts
                        WHERE id = %s
                        """,
                        [art_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
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

    def update(self, art_id: int, art: ArtIn) -> Union[ArtOut, Error]:
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
                    return self.art_in_to_out(art_id, art)
        except Exception as e:
            return {"message": "Could not update art"}

    def get_all(self) -> Union[List[ArtOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title, category, art_pic_url, description, price
                        FROM arts;
                        """
                    )
                    return [
                        self.record_to_art_out(record)
                        for record in result
                    ]
        except Exception as e:
            return {"message": "Could not get all arts"}

    def create(self, art: ArtIn) -> ArtOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO arts(
                        title,
                        category,
                        art_pic_url,
                        description,
                        price
                    )
                    VALUES (
                        %s, %s, %s, %s, %s
                    )
                    RETURNING id;
                    """,
                    [
                        art.title,
                        art.category,
                        art.art_pic_url,
                        art.description,
                        art.price,
                    ]
                )
                id = result.fetchone()[0]
                return self.art_in_to_out(id, art)

    def art_in_to_out(self, id: int, art: ArtIn):
        data = art.dict()
        return ArtOut(id=id, **data)

    def record_to_art_out(self, record):
        return ArtOut(
            id=record[0],
            title=record[1],
            category=record[2],
            art_pic_url=record[3],
            description=record[4],
            price=record[5],
        )
