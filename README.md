# A tutorial for android hybrid apps build with cordova
## Description
This is a tutorial how to setup your system to create a cordova app for android including some helpful scripts

## Pre-requirements
1. You have to install [apache ant](http://ant.apache.org/bindownload.cgi)
2. You have to install [Oracle JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) *Note: you need at least JDK6 to compile apps for android, but if you want to use eclipse (and I recommend that) you have to use JDK6! But some platforms are not compatible with JDK6, like MacOSX, but the vendor provides [a package](http://support.apple.com/kb/DL1572).*
3. You have to download the [adt-bundle](https://developer.android.com/sdk/index.html?hl=i). Unzip the package to a folder of your choice. *But do not devide the content in several folders!* Register the location of your adt-bundle in your `PATH` and/or in the `ANDROID_HOME` environment-variable.
4. You have to install the android API 19. Open `android` from your console. Go to section `Android 4.4.2 (API 19)`. Install at least the `SDK platform`, but I recommend to install both System Images if you want to use the emulator.
5. You have to install [node.js](http://nodejs.org/) *Note: Many repositories do not have the latest node version. You can install the node version manager after installing node as npm package with `npm install -g nvm`. With nvm you are able to switch easily between different node versions or simply update your current version.*
6. You have to install cordova globally over npm with `npm install -g cordova`.

### Checking pre-requirements
You can check your pre-requirements with a node script bundled with this tutorial. Go to the repository folder with your console and type the following commands:
```
npm install

node check.js

```

## Set up a project
Now we should be able to generate our first cordova project.
### Create a new project
Go to your workspace where you want to create the new project with your console and type the following command:

```
cordova create hello com.atd-schubert.hello HelloWorld

```

The command is structured this way:

```
cordova create {Directory to create} {Project identifier in reverse domain-style} {optional display-title}

```

*Note: You have to specify a directory-name that should not already exists. The identifier have to be unique, otherwise it will overwrite other apps on your device. It is recommend to indicate the display-title immediately.*

### Manage platforms
Switch into your project-folder (eg.: `cd hello`). You have the following commands to handle platforms in cordova:

* `cordova platforms list`: get a list of supported platforms you can replace with {platform-name}.
* `cordova platform add {platform-name}`: add a platform.
* `cordova platform remove {platform-name}`: remove a platform.

### Manage plugins
You are able to add plugins to your hybrid app. These plugins use native functions of the device and transport these functions to your html-app.

* `cordova plugin search {space seperated keywords}`: Get a list of plugins with identifier and Name.
* `cordova plugin add {plugin}`: Add a plugin to your project.
* `cordova plugin rm {plugin}`: Remove a plugin from your project.
* `cordova plugin ls`: List all plugins you use in your project.

*Note: You are able to specify plugins by identifier from the cordova repository, additionally with version by adding a version this style '@1.2.3' after your identifier, or with a  *

#### Plugin examples
* From corodova repository: `cordova plugin add org.apache.cordova.console@latest`.
* From corodova repository with version: `cordova plugin add org.apache.cordova.console@0.1.2`.
* The latest from corodova repository: `cordova plugin add org.apache.cordova.console@latest`.
* From a git repository: `cordova plugin add https://github.com/apache/cordova-plugin-console.git`.
* From a git branch: `cordova plugin add https://github.com/apache/cordova-plugin-console.git#develop`.
* From a folder of a git branch: `cordova plugin add https://github.com/apache/cordova-plugin-console.git#develop:/my/subdir`.
* From a local path: `cordova plugin add ../my_plugin_dir`.

#### Pupular plugins:
* Device informations: `org.apache.cordova.device`.
* Network informations: `org.apache.cordova.network-information`.
* Battery status: `org.apache.cordova.battery-status`.
* Accelerometer: `org.apache.cordova.device-motion`.
* Compass: `org.apache.cordova.device-orientation`.
* Geolocation: `org.apache.cordova.geolocation`.
* Camera: `org.apache.cordova.camera`.
* Media Capture: `org.apache.cordova.media-capture`.
* Media playback: `org.apache.cordova.media`.
* Files access (compatible with File API): `org.apache.cordova.file`.
* Remote files access (compatible with File API): `org.apache.cordova.file-transfer`.
* Dialogs: `org.apache.cordova.dialogs`.
* Vibrations: `org.apache.cordova.vibration`.
* Access to contacts: `org.apache.cordova.contacts`.
* Internationalization: `org.apache.cordova.globalization`.
* Splashscreen: `org.apache.cordova.splashscreen`.
* In App Browser: `org.apache.cordova.inappbrowser`.
* Debug Console: `org.apache.cordova.console`.

## Build, emulate and run
Cordova has five commands for the build process. Some of them you can call standalone for all setted platforms or only for a specified platform:

* `cordova prepare {optional platform}`: copy content from your project `www` folder to your platform `www` folder.
* `cordova compile {optional platform}`: make a build from your platform `www` folder.
* `cordova build {optional platform}`: a shorthand for `cordova prepare` plus `cordova compile`.
* `cordova emulate {platform}`: start your app in an emulator.
* `cordova run {platform}`: start your app on a real device.



## Best practice with git
You can gitignore the `platforms` folder, because you can build it with the `prepare` command.