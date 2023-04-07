from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.likes import  LikesIn, LikesOut, Error, LikesQueries, LikesOutWithAccount
from authenticator import authenticator



router = APIRouter()
@router.post("/likes", response_model=Union[LikesOut, Error])
def create_like(
    likes: LikesIn,
    response: Response,
    repo: LikesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    response.status_code = 200
    return repo.create(likes)


@router.get("/likes", response_model=Union[List[LikesOut], Error])
def get_all(
    repo: LikesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get_all()


@router.get("/likes/{liked_by}", response_model=Union[List[LikesOut], Error])
def get_all_likes_by_user(
    liked_by: int,
    response: Response,
    repo: LikesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> LikesOut:
    likes = repo.get_likes_by_user(liked_by)
    if likes is None:
        response.status_code = 404
    return likes

@router.delete(
        "/likes/{likes_id}",
        response_model=bool,
        )
def delete_like(
    likes_id: int,
    repo: LikesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> bool:
    return repo.delete(likes_id)
