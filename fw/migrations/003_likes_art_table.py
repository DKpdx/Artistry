steps = [

    
    [
        # "Up" SQL statement
        """
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT references users(id) NOT NULL,
            art_id INT references arts(id) NOT NULL,
            liked_by INT references users(id) NOT NULL,
            created_at timestamp NOT NULL DEFAULT NOW()
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """,
    ],
]
