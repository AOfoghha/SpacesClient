<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/spaces-dev/SpacesClient/master/src/images/logo_transparent.png" alt="Spaces" width="500">
  <br>
</h1>

<h4 align="center"><a href="https://spcs.me" target="_blank">Spaces.ru</a> Unofficial Android Client.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://raw.githubusercontent.com/spaces-dev/SpacesClient/master/src/images/Screenshot_2.png)

## Key Features (TODO)

* Multiple Accounts
* Dark/Light mode
* Cross platform
  - Android and iOS ready.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/spaces-dev/SpacesClient

# Go into the repository
$ cd SpacesClient

# Install dependencies
$ npm install

# Run the app
$ react-native run-android

# Clean cache
$ react-native start --reset-cache
```

## Help Commands

```bash
# List devices
$ adb devices

# Connect to device
$ adb -s <ID> reverse tcp:8081 tcp:8081

# Reload app (emulated double tap R)
$ adb shell input keyevent 82

# Release
$ cd android && gradlew assembleRelease

# Debug
$ cd android && gradlew assembleDebug

# Clean cache
$ cd android && gradlew clean
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## Download

You can [download](https://github.com/spaces-dev/SpacesClient/releases) latest installable version of Spaces for Android & iOS.

## Credits

This software uses following open source packages.

- [React Native](https://github.com/facebook/react-native)
- [Android Studio](https://developer.android.com/studio/)
- [Node.js](https://nodejs.org)

## License

MIT
