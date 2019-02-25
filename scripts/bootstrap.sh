#!/bin/bash
echo "bootstrap website"

IMG_DIR=assets/img

generate () {
    echo "👌 Resizing: directory: $1, scale: $2"
    SUB_DIR=$IMG_DIR/$1
    cp -R media $SUB_DIR
    cd $SUB_DIR
    mogrify -resize $2 -format jpg *.png
    mogrify -resize $2 -quality 60 -format webp *.jpg
    rm *.png
    cd ../../..
}

echo "removing old thumbnails"
rm -rf $IMG_DIR

echo "creating new thumb folders"
mkdir $IMG_DIR

generate display '1200x1200^'
generate thumbnails_large '500x500^'
generate thumbnails_small '250x250^'
