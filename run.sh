#!/usr/bin/env bash

YEAR=$1
DAYN=$2
DAY=`printf %02d $2`
PART=$3

if [[ -z $PART ]]; then
  if [[ -f solutions/$YEAR-$DAY-1.ts ]]; then
    PART=2
  else
    PART=1
  fi
fi

CODE=$YEAR-$DAY-$PART
FILE=solutions/$CODE.ts

if [[ ! -f $FILE ]]; then
  if [[ $PART == 2 ]]; then
    SOURCE=solutions/$YEAR-$DAY-1.ts
  else
    SOURCE=solutions/template.ts
  fi
  sed -e 's/^aoc(.*);$/aoc('$YEAR', '$DAYN', '$PART');/' < $SOURCE > $FILE
fi

mkdir -p data/$YEAR/$DAYN
touch data/$YEAR/$DAYN/input
code data/$YEAR/$DAYN/input
code $FILE
deno run -A --watch $FILE
