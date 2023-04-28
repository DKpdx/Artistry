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


4/7/23
Added protection to the like post so that only the signed in user could see what they had saved as a liked item.

4/17/23
We worked as a team trying to get the deployment aspects figured out. We were down two people but the three of us tried our best.

4/18/23
Team worked more on deployment aspect and then delegated working on some of our front end aspects. I started working on the account details page for a signed in user.

4/19/23
I got the account details page to pull the account details from a signed in user from the back endpoint. This was accomplished using the Token from being signed in to match the user up with the db on the backend. Also adjusted the Create account from to send it to the endpoint using the url that works upon deployment.


4/20/23
We all worked on helping get more of the FE working so that all of the team has their basic rubric requirements covered. I then did the get all accounts unit test and set it all up for the rest of the team to implement their own in the tests folder.

4/21/23
I worked on having an art detail page that matched by ID and had a handle o’clock function from our landing page. This would allow an image to be clicked and then directed to the art details by the art id.

4/22/23
I got the handle on click and the art detail page working. So now when a visitor clicks on an image from the main landing page, it directs them to the details for that image.

4/24/23
We worked on deployment as a team. Got stuck In a spot and agreed to resume tomorrow.

4/25/23
We got deployment working without create likes. We then team worked on Heathers create like form. We got Heathers form working and then helped to make her Unit test.


4/26/23
We worked as a team to remove console.logs and comments so that our code was clean. Also, we made some changes to how our routing was handled and where our button for navigation were organized.

4/27/23
Created a likes page to render all of the likes posted to show that it was hitting the database and being saved. Also, updated my journal entries and set up the routing for the new page.

4/28/23
Added an update button to navigate to the update art form from the art detail page.
