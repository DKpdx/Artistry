from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Union
from queries.likes import (
    LikesIn,
    LikesOut,
    Error,
    LikesQueries,
)
from authenticator import authenticator


router = APIRouter()


@router.post("/likes", response_model=Union[LikesOut, Error])
def create_like(
    likes: LikesIn,
    response: Response,
    repo: LikesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 200
    return repo.create(likes)


@router.get("/likes", response_model=Union[List[LikesOut], Error])
def get_all(
    repo: LikesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.get("/likes/{liked_by}", response_model=Union[List[LikesOut], Error])
def get_likes_by_user(
    liked_by: int,
    repo: LikesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> LikesOut:
    likes = repo.get_likes_by_user(liked_by)
    for like in likes:
        if account_data["id"] != like.liked_by:
            raise HTTPException(
                status_code=403, detail="You can't see other people's likes."
                )
        if likes is None:
            raise HTTPException(
                status_code=404, detail="You haven't liked anything yet."
                )
    return likes


@router.delete(
    "/likes/{likes_id}",
    response_model=bool,
)
def delete_like(
    likes_id: int,
    repo: LikesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    like = repo.get_like_by_id(likes_id)
    if account_data["id"] != like.liked_by:
        raise HTTPException(
            status_code=403, detail="Cannot delete other people's likes."
        )
    return repo.delete(likes_id)

@router.get("/likes/user/{user_id}/art/{art_id}", response_model=Union[LikesOut, Error])
def get_like_by_user_and_art(
    user_id: int,
    art_id: int,
    repo: LikesQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_like_by_user_and_art(user_id, art_id)
