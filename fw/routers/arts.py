from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.arts import Error, ArtIn, ArtQueries, ArtOut
from authenticator import authenticator


router = APIRouter()
@router.post("/arts", response_model=Union[ArtOut, Error])
def create_art(
    art: ArtIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ArtQueries = Depends()
):
    return repo.create(art, account_data["id"])

@router.get("/arts", response_model=Union[List[ArtOut], Error])
def get_all(
    repo: ArtQueries = Depends(),
):
    return repo.get_all()

@router.put("/arts/{art_id}", response_model=Union[ArtOut, Error])
def update_art(
    art_id: int,
    art: ArtIn,
    repo: ArtQueries = Depends(),
) -> Union[ArtOut, Error]:
    return repo.update(art_id, art)

@router.get("/arts/{art_id}", response_model=Optional[ArtOut])
def get_one_art(
    art_id: int,
    response: Response,
    repo: ArtQueries = Depends(),
) -> ArtOut:
    art = repo.get_one(art_id)
    if art is None:
        response.status_code = 404
    return art

@router.delete("/arts/{art_id}", response_model=bool)
def delete_art(
    art_id: int,
    repo: ArtQueries = Depends(),
) -> bool:
    return repo.delete(art_id)
