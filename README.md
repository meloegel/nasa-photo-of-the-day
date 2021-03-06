# Nasa Photo of The Day

## Created By: Mark Loegel

## Deployed Link: https://nasa-photo-of-the-day-mloegel.vercel.app/

## Description

This project was originally given to me by Lambda school and the assignment was to build an entire app from scratch and the app includes an API call to the NASA potd (photo of the day) API. I originally created this project in an afternoon and even completed a stretch goal of being able to select photos from different days via date input. After completing Lambda, I decided this being one the first apps I created from scratch, I should go back and touch up the project a bit. I added the ability to watch videos, which NASA sometimes will have for thier POTD. I also added the ablility to view the HD version of the photos. In a later update I added live ISS tracking utilizing the ISS-now api and Mapbox.

## Technologies Used

-React <br>
-ReactPlayer <br>
-ReactJS-Popup <br>
-Reactstrap <br>
-Axios <br>
-Sass <br>
-Styled-Components <br>
-Mapbox GL <br>
-React Map GL <br>

## Api's Used

-Nasa Photo of the day: https://api.nasa.gov/<br>
-ISS-Now: http://api.open-notify.org/<br>

## Home Page

<img src="./src/styles/imgs/HomePage.PNG" width = "600" />

#### Description: Home Page

<br>

## HD Image

<img src="./src/styles/imgs/HDImage.PNG" width = "600" />

#### Description: Clicking on an image will bring up the HD version, clicking again closes it.

## Video

<img src="./src/styles/imgs/Viedo.PNG" width = "600" />

#### Description: Videos will automatically play, clicking the screen will pause.

## ISS Live Tracker

<img src="./src/styles/imgs/ISSTracker.PNG" width = "600" />

#### Description: The map will display and track the live location of the ISS.

## Code Snippets

#### Here is the implementation of ReactPlayer and also the conditional rendering of a photo of video.

<img src="./src/styles/imgs/ReactPlayer.PNG" width = "800" />

#### Here is the implementation of ReactJs-Popup used to display the HD photos.

<img src="./src/styles/imgs/Popup.PNG" width = "800" />
