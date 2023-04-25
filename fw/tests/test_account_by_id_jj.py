from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries
from authenticator import authenticator

client = TestClient(app)

class SingleUserQueries:

    def get_account_by_id(self, id: int):
        if id == 1:
            return test_account
        else:
            return None


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

def app_override_setup():
    app.dependency_overrides[AccountQueries] = SingleUserQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

def test_get_account_by_id():
    app_override_setup()

    id = 1
    response = client.get(f"/accounts/{id}")
    assert response.status_code == 200
    assert response.json() == test_account


def test_get_account_by_invalid_id():
    app_override_setup()

    id = 99999
    response = client.get(f"/accounts/{id}")
    assert response.status_code == 404

    app.dependency_overrides = {}
