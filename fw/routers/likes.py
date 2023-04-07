from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.likes import  LikesIn, LikesOut, Error, LikesQueries



router = APIRouter()
@router.post("/likes", response_model=Union[LikesOut, Error])
def create_like(
    likes: LikesIn,
    response: Response,
    repo: LikesQueries = Depends()
):
    response.status_code = 200
    return repo.create(likes)

@router.delete("/likes/{likes_id}", response_model=bool)
def delete_like(
    likes_id: int,
    repo: LikesQueries = Depends(),
) -> bool:
    return repo.delete(likes_id)