# DarkSIde

Mariah Jacobs | Fall 2020

## Overview

Each year, the number of devices and applications we use increases. As we use more technology, the technology also uses us to consume and commodify user data. With DarkSIde, users will learn to identify and resist the design tricks that applications use to distract and deceive.
DarkSIde uses interactivity to educate mobile app users on the most prevalent design dark patterns we encounter in our digital daily lives. Users can learn, on the go, how to spot dark patterns and then put their knowledge to the test in a competitive quiz.

Future releases will allow users to track and contribute their own knowledge by submiting their own evidence of dark patterns they find out in the wild.

## Steps to Run Locally

- Install Expo from Google Play store (Android) or Apple App Store (iOS).
- On your computer, in a terminal, please follow the instructions below:

  - Install the Expo CLI: `yarn global add expo-cli`
  - Clone this repository to your local machine
  - Navigate into the directory that was created when you cloned the repo
  - Run `yarn install` to install all dependencies
  - Create a [new Firebase project](https://console.firebase.google.com/u/0/). The app will use Google Firebase and you need to get a config object from the Firebase app's settings
  - Create a file called `secrets.js` in your and put your config object that you got from Firebase there
  - Run `expo start`

- Scan the QR code with a QR reader on your phone, which should navigate you to the Expo app. You should be able to see the loaded application now!

## Documentation

- [Project Proposal](https://docs.google.com/document/d/1yNnBzJ0z1-7hmg40Aj2YbZpZOG7tzOfyLX6e8EeLIzs/edit?usp=sharing)
- [Project Plan](https://docs.google.com/document/d/1yNnBzJ0z1-7hmg40Aj2YbZpZOG7tzOfyLX6e8EeLIzs/edit?usp=sharing)
- [Project Demo](https://drive.google.com/file/d/1b8eqyfMeXPC9Kfu94t3Z9jhcW8L5iAHM/view?usp=sharing)
- [Feature List](https://docs.google.com/document/d/1i84HblhnY_qo1FHvT0EMeY2_6PAQb8N1kZkuUlWq-cg/edit?usp=sharing)

## Built With

- [ReactNative](https://reactnative.dev/) - A mobile development framework for building native apps in React
- [Expo](https://expo.io/) - An open-source framework and platform for React app
- [Firebase](https://firebase.google.com/) - A mobile app development platform offering backend as a service

## Authors

- **Mariah Jacobs** - _Initial work_ - [mbjacobs](https://github.com/mbjacobs)

## Acknowledgments

- Code snippets from Mark Newman's [SI 669: Developing Mobile Experiences](https://www.si.umich.edu/programs/courses/669) at the University of Michigan - School of Information were referenced and incorporated into this project.
- Previous research and examples from previously-given conference talk ["Come to the Dark Side (of UX), We Have Cookies"](https://www.midcamp.org/2020/topic-proposal/come-dark-side-ux-we-have-cookies) (presented with colleagues at MidCamp 2020 ) were used as content in this project.
