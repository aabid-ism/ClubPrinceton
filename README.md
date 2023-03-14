# cos333FinalProject

# Running the app
### Frontend
cd social\
npm run start
### Backend
cd server\
npm run start

# Frontend Status
### Search Bubble
##Functionality (almost done)
- currently, you can start typing a club and the results will showup as a list. axios requests successfully gets autocompleted clubs.
- TODO: implement setTimeout to avoid requests being send after each key is typed.
##Front end
- TODO: does not look like the figma yet

### Club Profile Bubble
[type here]

### Club Comments 
[type here]

### Posts Bubble
[type here]

### Events Bubble
[type here]

### Ratings Bubble
[type here]

# Backend Status
### Following are endpoints:
1. [POST] Creating a new club
2. [GET] Getting list of all clubs
3. [GET] Getting list of matching club by name (filtering by anagram not implemented yet)
4. [GET] Getting a true or false return value if the queried club exists in database or not

TODO:\
5. [POST] Creating a club post\
6. [UPDATE] Updating a club post\
7. [UPDATE] Updating club data\
8. [GET] need to update the third endpoint to get a list of clubs that match the anagram of request. Ex:- request = TRI, returns TRIANGLE CLUB
