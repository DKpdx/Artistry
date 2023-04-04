from fastapi import APIRouter, Depends, Response, Request, HTTPException, status
from typing import Union, List, Optional
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from queries.accounts import (
    Error,
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError
)

class AccountForm(BaseModel):
    username: str
    password: str

class HttpError(BaseModel):
    detail: str

class AccountToken(Token):
    account: AccountOut


router = APIRouter()
@router.get("fw/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True

@router.get("/token", response_model = AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token" : request.cookies[authenticator.cookie_name],
            "token_type" : "Bearer",
            "account" : account,
        }

@router.post("/accounts", response_model = AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Cannot create an account with those credentials",
        )
    form = AccountForm(username = info.username, password = info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account = account, **token.dict())

@router.get("/accounts", response_model = AccountOut)
def get_all_accounts(
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data),
    ):
    if account_data is not None:
        return repo.get_all(AccountOut)
    else:
        raise HTTPException(status_code = 401, detail = "Unauthorized request")
