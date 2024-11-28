# My Tinder

## authRouter

-POST /signUp
-POST /login
-POST /logout

## ProfileRouter

-GET /profile/view
-GET /profile/edit
-POST /profile/password

## connectionRequestRouter

-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accept/:requestId
-POST /request/review/reject/:requestId

## userRouter

-GET /user/connection
-GEt /user/requests
-GET /user/feed -get you the profile of other users on platform

status : ignore,interested,accepted,rejected
