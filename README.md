tl;dr: $ npm i npmusic -g && npmusic #hear music, switch any npm with "npmusic" and when it exits, the music stops. Pointless but fun, Mac only for now

------------

Right now, just do this:

npm i -g npmusic && npmusic

If everything went well (and if it DIDN'T FOR SOME DARN REASON please contact me) you will hear what this writeup is all about.

Maybe I don't get out much, but a source of great exhilartion in my life is the ticking down of an npm install, it's almost like a spy movie. That got me thinking, why couldn't every npm install or npm operation be like a spy movie?? Hence npmusic was born. Once installed, you can do any npm command you want, but keep typing 'usic' and while your operation completes a song will play in the background. You can pick the song if you want or it will pick from a list.

$ npm i npmusic -g

$ npmusic #play a random song

$ npmusic -m exciting #play an exciting song

$ npmusic -m budlight install express #play a song by pitbull and install express

$ npmusic -p https://www.youtube.com/watch?v=p7c3bQQmwVE #Start playing this song in your terminal

$ npmusic -a #Add this song to the npmusic rotation


See $ npmusic help for a listing of flags and how to use them

Todo:
1. set default, lock default
2.



You need node version {{MINIMUM VERSION}} and unfortunately for now, only a machines



I use NPM a LOT and it's always so exciting to watch all that output fly down the screen. It reminds me of random scenes from a Tom Cruise movie (this song would be perfect if it wouldn't immediately invite a DMCA takedown if I included it in this repo: https://www.youtube.com/watch?v=Og8v3vvYLvY) Use a tool like listentoyoutube.com and use the -file flag on the tool below


Under the hood uses youtube-dl, mpv for the actual heavy lifting, this is just a thin wrapper


## help
If you have messed up permissions, give this a shot: https://docs.npmjs.com/getting-started/fixing-npm-permissions



IMportants:

1. [x] easy install/uninstall [that actually works...need to do brew install youtube-dl, pv]
2. [x] output goes onto screen perfectly
3. babel/register for node-versions below certain level
4. Rejigger config--- use well-formed objects and extract URL


# Future
1. Add support for Yarn
2. Add support for playlists
3. Update functionality (without requiring users to re-npm install)



## ACTIVELY SOLICITING PULL REQUESTS FOR CONFIG.JSON MOODS. I HAVE TERRIBLE TASTE IN MUSIC


//We're gonna want to run youtube-dl -U

//We want to support very old node versions, maybe babelify it


//Brew
//and mpv, if you dont have mpv, this will install it. It's a hard dpeendecy, sorry...

//Should probably do nicely formed objects immediately so peeps can contribute

//Then we can make LISTS like for holidays, if around christmas time xmas muisc
//This really should phone to some type of external database

YOU MAKE THIS LIBRARY, (make sure they have pre-requisites)

npmmusic --mod



## Feature ideas

1. help, see available choices
2. color & ascii art [chalk]
3. hard: stops when npm install is finished
4. Pipe install output
5. See if fix works, can we edit things with sudo?




Crazy feature: npmusic shutup or npmusic silence, could find the PID and kill it? (that would probably stop npm install)

npmusic -m exciting

## todos
Random selection
First time is always exciting, but then you readfile and swap (make a utility file) then randomly shuffle

You can lock default (no random) or you can turn it on. If you have no default but are lcoked, it will go to random

shuffling random should be very lsat step, otherwise it's as impel property lookup


0. Stop playing as soon as npm stops
1. windows/linux, easy install/uninstall
2. moods to playlists
3. Get rid of player, use less expensive/painful tool

npmmusic install xyz
