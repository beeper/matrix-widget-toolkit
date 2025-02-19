# `@matrix-widget-toolkit/testing`

## 2.3.4

### Patch Changes

- 86bb7d9: Adjust build files
- Updated dependencies [86bb7d9]
  - @beeper/matrix-widget-toolkit-api@3.3.3

## 2.3.3

### Patch Changes

- Bump versions to re-deploy to npm
- Updated dependencies
  - @beeper/matrix-widget-toolkit-api@3.3.1

## 2.3.2

### Patch Changes

- 2524e2f: Add room account data and improve message fetching

## 2.3.1

### Patch Changes

- cd3d072: Bump `rxjs` 7.8.0 to 7.8.1.
- Updated dependencies [cd3d072]
- Updated dependencies [f65e688]
  - @matrix-widget-toolkit/api@3.2.1

## 2.3.0

### Minor Changes

- a021ec7: Implement searching the user directory.

### Patch Changes

- a021ec7: Bump `matrix-widget-api` from 1.1.1 to 1.3.1.
- Updated dependencies [a021ec7]
- Updated dependencies [a021ec7]
  - @matrix-widget-toolkit/api@3.2.0

## 2.2.1

### Patch Changes

- 5534372: Explain the default values of the parameters of `mockWidgetApi` in the docs.

## 2.2.0

### Minor Changes

- 704e6aa: Implement sending and receiving of _to device_ messages.
- 84f4e88: Expose turn servers in the widget API.

### Patch Changes

- Updated dependencies [704e6aa]
- Updated dependencies [84f4e88]
  - @matrix-widget-toolkit/api@3.1.0

## 2.1.0

### Minor Changes

- 7759822: Support a type filter for `clearRoomEvents()`.

### Patch Changes

- Updated dependencies [df0fef9]
  - @matrix-widget-toolkit/api@3.0.0

## 2.0.0

### Major Changes

- aa806cf: Remove `originalEvent` from `readEventRelations`.

  This field was removed by the matrix-widget-api.

### Patch Changes

- 6584d71: Support the `direction` option when reading event relations.

  This also changes the default behavior of the `MockWidgetApi` that returned the events in the wrong order when no direction is provided.

- 31f2441: Reject returning event relations when the referenced event doesn't exist.
- Updated dependencies [aa806cf]
- Updated dependencies [6584d71]
  - @matrix-widget-toolkit/api@2.0.0

## 1.0.1

Initial release
