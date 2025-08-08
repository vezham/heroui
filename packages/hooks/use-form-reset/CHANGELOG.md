# @heroui/use-form-reset

## 0.1.1

### Patch Changes

- [`a3d5805`](https://github.com/vezham/heroui/commit/a3d5805edfb4e667b1ebf9dac14b157b2fcacceb) Thanks [@v0xvigneshwaran](https://github.com/v0xvigneshwaran)! - ver bump

## 0.1.0

### Minor Changes

- [`6f3c3d3`](https://github.com/vezham/heroui/commit/6f3c3d3d7cb5c5557718edef344326660d3a8a7e) Thanks [@v0xvigneshwaran](https://github.com/v0xvigneshwaran)! - ver bump

## 0.0.12

### Patch Changes

- [`a67cd0e`](https://github.com/vezham/heroui/commit/a67cd0e9d2ccde3f4e809b12c189d1547165f9d2) Thanks [@v0xvigneshwaran](https://github.com/v0xvigneshwaran)! - fix: re-ver bump

## 0.0.11

### Patch Changes

- [`f8822fb`](https://github.com/vezham/heroui/commit/f8822fbfa68f4d634772889afd15a9c4c4faf2c6) Thanks [@v0xvigneshwaran](https://github.com/v0xvigneshwaran)! - re-ver bump

## 0.0.10

### Patch Changes

- [`025a889`](https://github.com/vezham/heroui/commit/025a889e233360bb9b589b36e60460937a509d0b) Thanks [@v0xvigneshwaran](https://github.com/v0xvigneshwaran)! - chore: vx-oss impl

## 0.0.9

### Patch Changes

- [#42](https://github.com/vezham/heroui/pull/42) [`702b9f2`](https://github.com/vezham/heroui/commit/702b9f2638cf0213d56d4f3ca7f7679c1b42f34a) Thanks [@github-actions](https://github.com/apps/github-actions)! - test ver chk

- [`3e72c2d`](https://github.com/vezham/heroui/commit/3e72c2d873c421daf7297d962ebfa559e186a92a) Thanks [@v0xvigneshwaran](https://github.com/v0xvigneshwaran)! - final ver sync init

## 0.0.8

### Patch Changes

- [`7b2f673`](https://github.com/vezham/heroui/commit/7b2f673eaf0ecbe5592eb91b29921f3534f7782c) Thanks [@v0xvigneshwaran](https://github.com/v0xvigneshwaran)! - chore: tailwind v4 basic init

## 2.0.1

### Patch Changes

- [`e489af8`](https://github.com/heroui-inc/heroui/commit/e489af83c189d0b42dca1b0afca1f5d003cd6033) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - ## Consolidated Changes

  ### Major Update

  - TailwindCSS v4

  ### Bug Fixes & Improvements

  #### Theme & Styling

  - fix rotate transition (#5441)
  - fix incorrect target theme (#5469)
  - fixed missing radius styles in th and td in Table (#4988)
  - fixed transition (#5409)
  - fix text selection in table (#5413)
  - Fix transition scale (#5271)
  - fix outline styles (#5266)

  #### Components

  **Toast**

  - Renaming loadingIcon to loadingComponent
  - Fix toast items closing in reverse order. Toasts now close in proper FIFO instead of LIFO (#5096)
  - Remove the bottom extension of the toast (#5231)
  - Enable programmatically closing a toast with a specific key (#5084)

  **Slider**

  - introduce `getTooltipValue` prop for custom tooltip value (#4741)
  - fixed slider component NaN values when min and max are the same value (#5014)

  **Select**

  - add `isClearable` and `onClear` prop to Select component (#2239)

  **Calendar**

  - Replace rectangle intersection detection with center-point distance calculation to make the calendar picker more resilient when browser zoom is changed. The new approach finds the closest picker item to the highlight element's center, preventing mismatches between displayed and selected year / month. (#5117)

  **Input**

  - fix `Input` accessibility label duplication (#5150)

  **Date Input**

  - add 'outside-top' prop to input (#3058)

  **Table**

  - support custom sort icon in Table (#5223)
  - remove `removeWrapper` from virtualized table (#4995)

  **Autocomplete**

  - do not render selector button if selector icon is null (#5423)

  **Image & Avatar**

  - fixed image src double fetch issue (#3847)

  #### System & Core

  - add useInputLabelPlacement
  - remove `@heroui/aria-utils` dependency

  #### Hooks & Utilities

  - fix use-theme logic
  - Fix skeleton animate
  - bump RA versions
  - Draggable modal will be scrollable in mobile devices (#5280)
  - refactor: overlay & interactOutside

## 2.0.0-beta.3

### Patch Changes

- [`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8) Thanks [@wingkwong](https://github.com/wingkwong)! - trigger beta release

## 2.0.0-beta.2

### Patch Changes

- [`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0) Thanks [@wingkwong](https://github.com/wingkwong)! - sync 2.7.11 release

## 2.0.0-beta.1

### Patch Changes

- [#5401](https://github.com/heroui-inc/heroui/pull/5401) [`a2c4745`](https://github.com/heroui-inc/heroui/commit/a2c4745f078b2fe30890149d336b1a19a09d394d) Thanks [@wingkwong](https://github.com/wingkwong)! - remove `@heroui/aria-utils` dependency
