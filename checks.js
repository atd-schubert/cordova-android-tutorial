"use strict";

var winston = require("winston");
var spawn = require("child_process").spawn;
var fs = require("fs");
var path = require("path");

var logger = new (winston.Logger)({
  levels: {
    info: 0,
    check: 1,
    warn: 2,
    error: 3
  },
  colors: {
    info: 'blue',
    check: 'green',
    warn: 'orange',
    error: 'red'
  }
});

logger.add(winston.transports.Console, {
  level: 'info',
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: false
});

var getWhich = function(names, cb){
  if(typeof names === "string") names = [names];
  var stream = spawn("which", names); // , {env:process.env}
  var collector = "";
  stream.stdout.on("data", function(data){
    collector += data.toString();
  });
  stream.stderr.on("data", function(err){
    cb(err);
    cb = function(){};
  });
  stream.on("close", function(data){
    var arr = collector.split(/\r?\n/);
    while (arr.indexOf("")>=0) arr.splice(arr.indexOf(""), 1);
    
    cb(null, arr);
    cb = function(){};
  });
};


var doChecks = function(){
  logger.info("Analyzing system to get compatibility with cordova for android...");
  logger.check("You have installed node.js...");
  
  // Ant
  getWhich("ant", function(err, paths){
    if(err) return console.error(err);
    if(paths.length === 0) return logger.error("Can't find 'ant' on your system!");
    
    logger.check("Found 'ant' in '"+paths.join(", ")+"' on your system...");
    
    var colector = "";
    var checkVer = spawn(paths[0], ["-version"]);
    checkVer.stdout.on("data", function(data){
      colector += data.toString();
    });
    checkVer.stderr.on("data", function(data){
      console.error(data.toString());
    });
    checkVer.on("close", function(){
      logger.check("Got 'ant' version '"+colector.split("version ")[1].split(" ")[0]+"' on your system...");
    });
    
  });
  
  // JDK
  getWhich("java", function(err, paths){
    if(err) return console.error(err);
    if(paths.length === 0) return logger.error("Can't find 'java' on your system!");
    
    logger.check("Found 'java' in '"+paths.join(", ")+"' on your system...");
    
    var colector = "";
    var checkVer = spawn(paths[0], ["-version"]);
    checkVer.stderr.on("data", function(data){
      colector += data.toString();
    });
    checkVer.on("close", function(){
      var version = colector.split('"')[1].split(".");
      if(version[0]>=1 && version[1]>=6) logger.check("Got 'java' version '"+version.join('.')+"' on your system...");
      else logger.error("Got wrong 'java' version '"+version.join('.')+"' on your system! You have to have at least '1.6.x'...");
    });
    
  });
  
  // adt
  getWhich("android", function(err, paths){
    if(err) return console.error(err);
    var androidSDKPath;
    var gotAndroid = paths.length === 0;
    if(gotAndroid) {
      logger.warn("Can't find 'android' on your system. You have not setup the adt-bundle path in your PATH enviroment. This is recommend!");
      androidSDKPath= path.resolve(paths[0], "../..");
    }
    else logger.check("Found 'android' in '"+paths.join(", ")+"' on your system...");
    
    if("ANDROID_HOME" in process.env) {
      logger.check("You have setup the 'ANDROID_HOME' environment variable...");
      if(fs.existsSync(process.env.ANDROID_HOME+"/android")) logger.check("You have setup your 'ANDROID_HOME' environment variable correctly...");
      else logger.error("Your 'ANDROID_HOME' environment variable is incorrect!");
      androidSDKPath= path.resolve(process.env.ANDROID_HOME, "..");
    }
    else {
      logger.warn("You have not setup the 'ANDROID_HOME' environment variable.");
      if(!gotAndroid) logger.error("You have not setup the adt-bundle path to your PATH or ANDROID_HOME environment variable, or have not installed the adt-bundle on your system!");
    }
    
    if(fs.existsSync(androidSDKPath+"/platforms/android-19")) {
      logger.check("You have installed android v4.4.2 (API 19)...");
      if(fs.existsSync(androidSDKPath+"/platforms/android-19/android.jar") &&
        fs.existsSync(androidSDKPath+"/platforms/android-19/data") &&
        fs.existsSync(androidSDKPath+"/platforms/android-19/framework.aidl") &&
        fs.existsSync(androidSDKPath+"/platforms/android-19/sdk.properties") &&
        fs.existsSync(androidSDKPath+"/platforms/android-19/skins") &&
        fs.existsSync(androidSDKPath+"/platforms/android-19/templates") &&
        fs.existsSync(androidSDKPath+"/platforms/android-19/uiautomator.jar")
      ) logger.check("You have moved android v4.4.2 (API 19) to the right location...");
      else logger.error("You have not moved android v4.4.2 (API 19) to the right location!");
    }
    else logger.error("You have not installed android v4.4.2 (API 19)!");
    
    
  });
  
  // cordova
  getWhich("cordova", function(err, paths){
    if(err) return console.error(err);
    if(paths.length === 0) return logger.error("Can't find 'cordova' on your system!");
    
    logger.check("Found 'cordova' in '"+paths.join(", ")+"' on your system...");
  });
};

doChecks();
