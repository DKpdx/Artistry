from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries
from authenticator import authenticator


client = TestClient(app)


class EmptyUserRepository:
    def get_all(self):
        return [get_all]


get_all = {
    "id": 1,
    "username": "test",
    "email": "unit@test.com",
    "user_pic_url": "test",
    "bio": "test",
    "zipcode": 12345,

}

test_account = {
    "id": 1,
    "username": "test",
    "email": "unit@test.com",
    "user_pic_url": "test",
    "bio": "test",
    "zipcode": 12345,
}


def account_override():
    return test_account


def test_get_all_accounts():
    app.dependency_overrides[AccountQueries] = EmptyUserRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

    response = client.get("/accounts")
    assert response.status_code == 200
    assert response.json() == [get_all]

    app.dependency_overrides = {}
