# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.4] - 2019-03-25
### Fixed
- Socket hang up on `/player/stop` because of missing `send()`

## [1.2.3] - 2019-03-25
### Added
- Changelog
- Optional param `shuffle` for endpoint `/playlists/:playlist/play`

### Changed
- Added shuffle option to README

## [1.1.3] - 2019-03-15
### Added
- Log given output device name if device not found

### Changed
- Let winston log errors to stderr

## [1.1.2] - 2019-03-15
### Added
- Implemented winston as global logger

## [1.1.1] - 2019-03-02
### Removed
- Removed unnecessary error logging if there is no playback at all

## [1.1.0] - 2019-03-02
### Changed
- Completed README.md (for now)
- Made some minor improvements to error logging

## [1.0.0] - 2019-02-28
### Added
- This is v1.0 which contains all of my current use cases so far.

[Unreleased]: https://github.com/moecre/forked-daapd-homebridge-middleware/compare/1.2.4...HEAD
[1.2.4]: https://github.com/moecre/forked-daapd-homebridge-middleware/compare/1.2.3...1.2.4
[1.2.3]: https://github.com/moecre/forked-daapd-homebridge-middleware/compare/1.1.3...1.2.3
[1.1.3]: https://github.com/moecre/forked-daapd-homebridge-middleware/compare/1.1.2...1.1.3
[1.1.2]: https://github.com/moecre/forked-daapd-homebridge-middleware/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/moecre/forked-daapd-homebridge-middleware/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/moecre/forked-daapd-homebridge-middleware/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/moecre/forked-daapd-homebridge-middleware/tag/1.0.0