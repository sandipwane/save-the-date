# Goal
Update the images present in @hero-images folder into the website @index.html

## Context:
The index pages shows a random image from the @hero-images folder. When a user opens the page, the image is displayed. We have implemeted the logic to show random images in folder in such a way that the same image is not shown twice in a row. The images are added in `heroImages` array in `index.html` file. There is also a cache version added to make sure when we add new images the cache or localstorage of the user is refreshed and the new images are shown. cache invalidation


## Task:
1. Add updated images in `heroImages` array in `index.html` file to make sure new images are shown.
2. Fix the logic to show random images in `index.html` file to make sure the same image is not shown twice in a row.

## Current Issues in image display logic:
Images are shown in random and not repeated but they are not in sequnce.

I want the user journey to say start with a random images, however we should store this starting images in localstore and then we show the images in sequence. The images should cycle in a certain sequence. We can decide a sequnce for the images. and user can start with any index however I want user to cycle to a sequcne to same images is not repeated quickly. This acts as an easter egg for the user.


### Post Task:
Update the credits page with the new images.


