#!/bin/bash
echo "bootstrap website"

echo "removing old thumbnails"
rm -rf thumbnails_large
rm -rf thumbnails_small

echo "creating new thumb folders"
cp -R media thumbnails_large
cp -R media thumbnails_small

echo "resizing large"
cd thumbnails_large
mogrify -resize '500x500^' *.jpg

echo "resizing small"
cd ../thumbnails_small
mogrify -resize '250x250^' *.jpg
