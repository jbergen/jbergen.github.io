#!/bin/bash
echo "bootstrap website"

IMG_DIR=assets/img

generate () {
    echo "👌 Resizing: directory: $1, scale: $2"
    # pwd
    SUB_DIR=$IMG_DIR/$1
    cp -R media $SUB_DIR
    cd $SUB_DIR
    mogrify -resize $2 -format jpg *.png
    mogrify -resize $2 -quality 60 -format webp *.jpg
    rm *.png
    # pwd
    cd ../../..
    # pwd
}

echo "removing old thumbnails"
rm -rf $IMG_DIR

echo "creating new thumb folders"
mkdir $IMG_DIR

generate display '1200x1200^'
generate thumbnails_large '500x500^'
generate thumbnails_small '250x250^'



# echo "resizing display"
# cd assets/img/display
# mogrify -resize '1200x1200^' - quality 60 -format webp *.jpg
# # mogrify -resize '1200x1200^' -format webp *.png
# mogrify -resize '1200x1200^' -quality 20 -format jp2 *.jpg
# rm *.jpg
# rm *.png

# echo "resizing large"
# cd ../thumbnails_large
# mogrify -resize '500x500^' -format webp *.jpg
# mogrify -resize '500x500^' -format webp *.png

# echo "resizing small"
# cd ../thumbnails_small
# mogrify -resize '250x250^' -format webp *.jpg
# mogrify -resize '250x250^' -format webp *.png
