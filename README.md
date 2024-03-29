# SpotiWar

This project was originally created as a challenge in Globant's Bootcamp for a Junior position.
In that moment it was implemented using Angular 8 and developed without having previous knowledge in Angular.
Nowadays I'm using this project to apply all the knowledge I've learn throughout the years with good practices and more.
Take in mind it is a side project but I'll keep adding features and enhancing the code.

In order to Extend a Request to Spotify to make public the app and be used for everyone there are some guidelines I'm not complying. 
To try my app you need to request me to add your email in User Management in Spotify for Developers menu (limited to 25 users).
Another option for you is to create a developer account in Spotify and change Client ID from mine to yours.

These are the guideliness I'm not complying to make it public and accesible to everyone from Spotify:
- Add Album name in currently playing for mobile view.
- Add Spotify logo in currently playing for mobile view.
- Change app name from Spoti... to other.
- Add complete logo and brand name with R in desktop view.
- Check if: Playlist/album name: 25 characters Artist name: 18 characters Track name: 23 characters.
- Link to Spotify from everywhere. If user don't have the app redirect to store with the label of get Spotify for free.
- Setting a song as favorite should be handled by Spotify and not doing it from partner.
- Favorite option only be available from now playing with heart shape icon.

## Features

- Dashboard with user profile image
- Inn-app favorite songs (managed through LocalStorage)
- Remove favorite song pop up
- Search songs
- New Realeases List
- Artists Albums List
- Album Songs List
- Responsive views
- Mobile Views


## Run Locally
Clone the project

```bash
  git clone https://github.com/AxelWar/SpotiWar.git
```

Go to the project directory

```bash
  cd SpotiWar
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests
To run tests, run the following command

```bash
  npm run test
```


## Optimizations
1. Migrate Angular Version to v16 and required dependencies.
2. Refactored Code with SOLID principles.
3. Improve Performance with: Tree Shaking, linting anf formatting, modularize app, create Shared Module, implement lazy loading.
4. Enhance Accessibility: color and contrast, mobile views.
5. Improve Testing up to 94.54% Statements and 87.23% Functions.
   
## License
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

## Authors
- [GitHub@AxelWarneke](https://www.github.com/axelwar)
- [LinkedIn@AxelWarneke](https://www.linkedin.com/in/axelwarneke)

## Screenshots
![Main Screen](https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYQRcMhSLk_1QMYxGF_uaDtnkB0fUf3_prIc-xg8MfD7MwYn8UbRnomRMKPu6fYq3Ugp3h8xwfytizwuyvKqE5xJPoyaZQ=w1920-h944)
![App Mobile](https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYTfVVCoO9Rre2lRmWnG-Xr4I2p2a7BHih2VyzYflG7F16DMz0VL-Qv8rq0XOnRCftNOvNB6awPWeEfmGseAQn2spaxG=w966-h945)
![Artist View](https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYSUbt-E8P7J2KcOWL_WsrHts5wbFGpGpHuQgDQHG6JadgpWoY3a78iserItckFI29VoG448syZ-o2mrpOtE3D0VVPfa6g=w966-h945)
![Album View](https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYQ2OZqhEGPX8_hOcJ-7Kmsm1zxp4Tg5quEzhu3BN6bkav_oVU26NsN4BA-I8kk7O1w4lmKNiY_U_N4hgzQWs2dRYCZCOg=w966-h945)

