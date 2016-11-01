#!/bin/bash

#******************************************
# Various fixes to resolve playback issues
# Checks for youtube-dl, mpv
# Updates for mpv, youtube-dl
#******************************************

echo "******************************************"
echo "Fix up script, if any permissions issues try running"
echo "$ sudo ./fix.sh"
echo "******************************************"
echo ""

echo "Checking on youtube-dl issues..."
  if ! [ -x "$(command -v youtube-dl)" ]; then
    echo 'No youtube-dl installed...' >&2
    echo "Installing youtube-dl..."
      brew install youtube-dl
  else
    echo "Attempting to update youtube-dl..."
     youtube-dl -U
  fi

echo "Checking on mpv issues..."
  if ! [ -x "$(command -v mpv)" ]; then
    echo 'No mpv installed...' >&2
    echo "Installing mpv..."
    brew install mpv
  else
   echo "MPV is installed, try to update it"
  fi
