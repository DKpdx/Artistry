from fastapi.testclient import TestClient
from main import app
from queries.arts import ArtQueries
from authenticator import authenticator

client = TestClient(app)


class SingleArtQueries:
    def get_one(self, art_id: int):
        if art_id == 1:
            return test_art
        else:
            return None


test_art = {
    "id": 1,
    "user_id": 1,
    "title": "test title",
    "category": "test",
    "art_pic_url": "test",
    "description": "test",
    "price": 100,
    "username": "test",
}


def account_override():
    return test_art


def app_override_setup():
    app.dependency_overrides[ArtQueries] = SingleArtQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override


def test_art_by_id():
    app_override_setup()

    art_id = 1
    response = client.get(f"/arts/{art_id}")
    assert response.status_code == 200
    assert response.json() == test_art


app.dependency_overrides = {}
