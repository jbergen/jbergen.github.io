#!/bin/bash
echo "bootstrap website"

echo "removing old thumbnails"
rm -rf assets/img

echo "creating new thumb folders"
mkdir assets/img
cp -R media assets/img/display
cp -R media assets/img/thumbnails_large
cp -R media assets/img/thumbnails_small

echo "resizing display"
cd assets/img/display
mogrify -resize '1200x1200^' -format webp *.jpg
mogrify -resize '1200x1200^' -format webp *.png
# rm *.jpg
# rm *.png

echo "resizing large"
cd ../thumbnails_large
mogrify -resize '500x500^' -format webp *.jpg
mogrify -resize '500x500^' -format webp *.png
# rm *.jpg
# rm *.png

echo "resizing small"
cd ../thumbnails_small
mogrify -resize '250x250^' -format webp *.jpg
mogrify -resize '250x250^' -format webp *.png
# rm *.jpg
# rm *.png
