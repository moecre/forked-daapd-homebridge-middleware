For use in conjunction with
* [forked-daapd](https://github.com/ejurgensen/forked-daapd)
* [Shairport Sync](https://github.com/mikebrady/shairport-sync) (Optional)
* [Homebridge](https://github.com/nfarina/homebridge)
* [homebridge-better-http-rgb](https://github.com/jnovack/homebridge-better-http-rgb)

to play your favourite radio stations with just a voice command and control multiple output devices.

Examples:

* "Hey Siri, start ROCK ANTENNE"
* "Hey Siri, start [YOUR_FAVOURITE_RADIO_STATION]"
* "Hey Siri, turn on Speaker in Hallway"
* "Hey Siri, turn off [SPEAKER_NAME] in [ROOM_NAME]"

# Overview

This package acts like a standalone proxy server which endpoints get to be called by the homebridge-better-http-rgb plugin.
The plugin is responsible for advertising the various accessories to homebridge then (see [config.json](config/homebridge/config.json)).
The server is using the amazing [forked-daapd JSON API](https://github.com/ejurgensen/forked-daapd/blob/master/README_JSON_API.md)
to control the various accessories and redirect their actions to forked-daapd. Therefore it is possible to advertise almost
any forked-daapd action to HomeKit.

# Installation
tbd (for the impatient please open an issue or contact me)