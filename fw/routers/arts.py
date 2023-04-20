from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.arts import Error, ArtIn, ArtQueries, ArtOut, ArtOutWithAccount
from authenticator import authenticator


router = APIRouter()


@router.post("/arts", response_model=Union[ArtOut, Error])
def create_art(
    art: ArtIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ArtQueries = Depends(),
):
    return repo.create(art, account_data["id"])


@router.get("/arts", response_model=Union[List[ArtOutWithAccount], Error])
def get_all(
    repo: ArtQueries = Depends(),
):
    return repo.get_all()


@router.put("/arts/{art_id}", response_model=Union[ArtOut, Error])
def update_art(
    art_id: int,
    response: Response,
    art: ArtIn,
    repo: ArtQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[ArtOut, Error]:
    try:
        result = repo.get_one(art_id)
        if account_data["id"] == result.user_id:
            try:
                return repo.update(art_id, art, result.user_id)
            except Exception:
                response.status_code = 400
                return {"message": "Unable to update art"}
        else:
            response.status_code = 401
            return {"message": "You're not allowed to update the art"}
    except:
        response.status_code = 404
        return {"message": "Art can't be found"}


@router.get("/arts/{art_id}", response_model=Optional[ArtOutWithAccount])
def get_one_art(
    art_id: int,
    response: Response,
    repo: ArtQueries = Depends(),
) -> ArtOutWithAccount:
    art = repo.get_one(art_id)
    if art is None:
        response.status_code = 404
    return art


@router.delete("/arts/{art_id}", response_model=bool)
def delete_art(
    art_id: int,
    repo: ArtQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(art_id)
