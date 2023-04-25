from fastapi.testclient import TestClient
from main import app
from queries.arts import ArtQueries, ArtOutWithAccount
from authenticator import authenticator

client = TestClient(app)

class EmptyArtQueries:
    def get_all(self):
        return [
            ArtOutWithAccount(
                id=1,
                user_id=1,
                title="test title",
                category="test",
                art_pic_url="test",
                description="test",
                price=100,
                username="test",
            )
        ]

test_account = {
    "id": 1,
    "user_id": 1,
    "title": "test title",
    "category": "test",
    "art_pic_url": "test",
    "description": "test",
    "price": 100,
}

def account_override():
    return test_account

def test_get_all_arts():

    app.dependency_overrides[ArtQueries] = EmptyArtQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

    response = client.get("/arts")

    assert response.status_code == 200
    assert response.json() == [{
        "id": 1,
        "user_id": 1,
        "title": "test title",
        "category": "test",
        "art_pic_url": "test",
        "description": "test",
        "price": 100,
        "username": "test",
    }]

    app.dependency_overrides = {}
