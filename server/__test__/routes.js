// DELETING

// TEST 1
// MAKE CLUB --> INSERT 1 POST --> DELETE 1 POST
// CHECK: NO POSTS IN SUBSET, NO POST WITH THAT CLUB IN POSTS

// TEST 2
// MAKE CLUB --> INSERT 4 POST --> DELETE 4th POST
// CHECK: 3 POSTS IN SUBSET + LEN(SUBSET) = 3, 3 POSTS WITH THAT CLUB IN POSTS

// TEST 3
// MAKE CLUB --> INSERT 4 POST --> DELETE 1st POST
// CHECK: 3 POSTS IN SUBSET + LEN(SUBSET) = 3, 3 POSTS WITH THAT CLUB IN POSTS

// TEST 4
// MAKE CLUB --> INSERT 5 POST --> DELETE 1 POST
// CHECK: 4 POSTS IN SUBSET + LEN(SUBSET) = 4, 4 POSTS WITH THAT CLUB IN POSTS

// TEST 5
// MAKE CLUB --> INSERT 6 POST --> DELETE 1 POST
// CHECK: 5 POSTS IN SUBSET (WITH NEXT MOST RECENT POST) + LEN(SUBSET) = 5,
// 5 POSTS WITH THAT CLUB IN POSTS