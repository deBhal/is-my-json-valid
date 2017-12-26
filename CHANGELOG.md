#### v3.0.0

- Fixed a bug where the boolean `false` schema accepted was treated as `true` (i.e. `validate(false)` will now always fail instead of always succeeding.)
