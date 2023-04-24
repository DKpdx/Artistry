from fastapi.testclient import TestClient
from main import app
from queries.arts import ArtQueries
from authenticator import authenticator


client = TestClient(app)


class TestArtRepository:
    def get_all(self):
        return [get_all_arts_test]


get_all_arts_test = {
    "id": 1,
    "user_id": 1,
    "title": "test title",
    "art_pic_url": "testpicture.jpeg",
    "description": "test description for the test arts",
    "price": 100,
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


def test_get_all_arts():
    app.dependency_overrides[ArtQueries] = TestArtRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

    response = client.get("/arts")
    assert response.status_code == 200
    assert response.json() == [get_all_arts_test]

    app.dependency_overrides = {}
