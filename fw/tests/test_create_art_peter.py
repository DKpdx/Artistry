from fastapi.testclient import TestClient
from main import app
from queries.arts import ArtQueries
from authenticator import authenticator

client = TestClient(app)

class CreateArtQueries:
    def create(self, art, user):
        result = {
            "id": 1,
            "user_id": user,
            "username": "string",
            "email": "string",
            "user_pic_url": "string",
            "bio": "string",
            "zipcode": 11111
        }
        result.update(art)
        return result

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

def test_create_art():
    app.dependency_overrides[ArtQueries] = CreateArtQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

    json = {
        "title": "Hello",
        "category": "Greetings",
        "art_pic_url": "string",
        "description": "string",
        "price": 30
    }

    expected = {
        "id": 1,
        "user_id": 1,
        "title": "Hello",
        "category": "Greetings",
        "art_pic_url": "string",
        "description": "string",
        "price": 30
    }
    response = client.post("/arts", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
