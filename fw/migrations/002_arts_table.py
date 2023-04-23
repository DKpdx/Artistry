steps = [

    
    [
        # "Up" SQL statement
        """
        CREATE TABLE arts (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT references users(id) NOT NULL,
            title VARCHAR(50) NOT NULL,
            category VARCHAR(50),
            art_pic_url VARCHAR(500),
            description TEXT,
            price INTEGER NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE arts;
        """,
    ],
]
