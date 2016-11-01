#!/bin/bash

#******************************************
# Various checks for youtube-dl, mpv
#
# Updates for mpv, youtube-dl
#******************************************

case "$(uname -s)" in

   Darwin)
     echo 'Appears to be a mac continuing...'
     ;;

   *)
     echo "******************************************"
     echo "ERROR"
     echo 'Sorry you do not appear to be running a Mac. $ npmusic is currently only supported on Mac machines'
     echo 'Please consider adding a port by contributing here: http://github.com/valgaze/npmusic'
     echo "******************************************"
     exit 1
     ;;
esac



if ! [ -x "$(command -v brew)" ]; then
  echo "******************************************"
  echo "ERROR"
  echo "BREW NOT INSTALLED."
  echo "Please visit http://brew.sh/, install brew, then re-attempt:"
  echo "$ npm i -g npmusic"
  echo "******************************************"
  exit 1
fi



if ! [ -x "$(command -v mpv)" ]; then
  echo 'No MPV installed...' >&2

  if ! [ -x "$(command -v youtube-dl)" ]; then
    echo 'No youtube-dl installed...' >&2
      echo "Installing youtube-dl..."
      brew install youtube-dl
  fi

  brew link --overwrite youtube-dl
  echo "Installing mpv..."
  brew install mpv

fi
