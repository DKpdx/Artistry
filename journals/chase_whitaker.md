April 4, 2023

Today, I worked on the authentication with my team. I pushed what I worked on over the weekend to my authentication-trial branch and Danny helped debug it with John to get the create-account working, once that was done, we were able to create, login and logout. Tonight and tomorrow I will work on other account endpoints like get_one, update_account, and delete_account.

April 5, 2023

Today we had to revisit the schema and wire frame to talk about implementing a new Like feature. We spent most of the day planning and reworking our ubiquitous language, and planning.

April 6, 2023

Today we worked as a group to implement the new feature for the backend endpoints. We had to update the arts schema to include a user_id to link the user to the art. We also added a create like feature, a get_all_likes feature, a get_one_like feature, and a delete_like feature. We're hoping tha these are sufficient in covering our backend requirements so we can move on to front end authentication and development.

April 7, 2023

Today I Partner Programmed with the group while Danny, Heather, and John worked on the likes backend features. We got them working and protected on the FastAPI side.

April 10, 2023

I know we're technically on a break but I worked on the MainPage for the website today. We have a Navbar and a categories filter. Figuring out how to connect those features to the database will be fun.

April 11, 2023

I worked on the the art cards for the MainPage, I have a working demo but nothing is connected to the backend. I think I will also need to implement a new Locations Table for users to sign up because we currently only take a zipcode, but I think we may need to use a database of cities and states instead.

April 12, 2023

I'm working on adding tailwind to our stack so we can make the front-end look better than I could with basic CSS. We still have a lot features to add. As for the likes page, I think we might be able to use the categories feature on the MainPage as a way to filter a user's liked art. So instead of making a whole new page, we can just filter what they liked on the one page.
