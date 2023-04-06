Please keep all of your individual journals in this directory.
Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.
Recommended naming convention is first_last.md.


3/28/23
We delegated the creation of issues between the team with a plan to review them together to make sure they were structured properly. Once we have that set up and finish the foundational work needed for us all to begin our individual coding this will all feel much better. I want to be able to grind hard and get all of our parts done with plenty of time to fix any problems before that may arise.

3/29/23
Today I created the docker-compose.yaml and then it was pushed to the main. The pipeline failure warning from gitlab had the team confused and we spent some time trying to "fix" the issue. When in reality it was a null problem for us which we realized. Then we tested the docker and after the containers were all running fine it was given the final push.

3/30/23
we worked on auth and trying to get it to work but were unsuccessful.

3/31/23
continued the same auth work and still struggled.

4/4/23
Started from main and rebuilt yaml and other stuff in order to try and go line by line to get auth to work. Compared to what had been done previously and was able to get the create/login/logout to work. Then pushed it to the dk-test-branch so the rest of the team could check if it worked. It was a success!
huge collaboration to make this all happen.


4/5/23
I worked on the front end of AUTH and now have a working login, logout and create account. When you login you are assigned a token and when you log out it destroys token.


4/6/23
I created the migration table for likes and then the back endpoint for posting/create of likes.


