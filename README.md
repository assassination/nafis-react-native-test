
E-commerce App, displaying all kind of ascii-based faces. It was build to run on iOS and Android.

## Overview

Projects consists of two parts: 1) server side code, i.e. **server**; 2) client-side code, i.e. **creatella-test**.

**server** is a fake REST API built based on [json-server](https://github.com/typicode/json-server). It provides user-specified JSON response to client.

**creatella-test** is a mobile apps code built upon [react-native] (https://facebook.github.io/react-native/) framework. It was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). Could run on both iOS and Android.

## Instruction

### Run server first

  * run ```npm run server``` on terminal
  * Wait until ```\{^_^}/ hi!``` message appear on terminal
  * You are good to go

### Run mobile app on a simulator

  * iOS Simulator
    * Open terminal and run the following
    ```
    npm run ios
    ```
    * wait until simulator appears and app shown

  * Android Emulator (on MacOS)
    * Download [Android Studio](https://developer.android.com/studio/)
    * Install Android Studio
    *While choosing component which needs to be installed, please tick Performance and Android Virtual Device, for a smoother experience*
    * Open terminal and create/edit .bash_profile
    ```
    nano ~/.bash_profile
    ```
    * Add following line to .bash_profile:
    ```
    export ANDROID_HOME=~/Library/Android/sdk
    export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
    ```
    * Look for available emulator
    ```
	  $ANDROID_HOME/tools/emulator -list-avds
    ```
  	*Output examples:*
  	```
  	3.2_QVGA_ADP2_API_22
  	Pixel_API_22
  	```
    * Start Android emulator and run the app
    ```
    $ANDROID_HOME/tools/emulator -avd Pixel_API_22 & react-native run-android
    ```

## Available Scripts

### `npm run server`
Start server

### `npm run ios`
Run mobile app on iOS simulator
