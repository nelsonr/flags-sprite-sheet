# Country Flags Sprite Sheet

Application to create a [CSS sprite sheet](https://www.tutorialrepublic.com/css-tutorial/css-sprites.php) of country flags.

## Setup

This application uses [Node.js](https://nodejs.org/). Before going forward you need to have Node.js installed in your system.

After you install Node.js, run the command `npm install` inside the application folder to install the required dependencies. After this you're ready to go.

This was tested with Node.js version 16.16.0.

## How to create the sprite sheet?

Place the images to be converted within the `assets/flags/` folder. Each image file should be named after the country it represents (e.g., `United Kingdom.png`). Check the names on the `assets/flags.json` file.

> **Note:** All the images should have the same dimensions (width and height). Otherwise, it will not work correctly.

Run the build command with `npm run build` within the root folder of the app.

The script should create a new `build` folder with the generated assets:

- `flags_sprite.png` - the main sprite sheet image;
- `flags_sprite.css` - the style sheet with the coordinates of each image;
- `flags` - a folder with each individual flag image renamed with the respective country code. The usage of these images is optional.

## How to use the sprite sheet?

Include the generated assets (both sprite sheet and style sheet) in your application.

To render an image of the sprite sheet. Create an element like the example below:

```
<div class="flag flag-UK"></div>
```

This will render a flag image with the default size of 32px. To change the size of the image use the `size` CSS variable:

```
<div class="flag flag-UK" style="--size: 48;"></div>
```
> **Note:** The value of the `size` variable should be **without** units.

## Previewing the sprite sheet

Run the `npm run preview` command on the terminal inside the project folder to preview the generated sprite sheet in the browser.

## Adding a new image to sprite sheet

To add a new image to the sprite sheet, edit the `assets/flags.json` file and add the respective image in the `assets/flags/` folder. The image should use the same dimensions (width and height) as the existing ones.

If you want to use a different size for the images inside the sprite sheet, you'll to export and substitute all the image files with the new size.

After the necessary changes, run the `npm run build` command to generate a new sprite sheet.

> **Note:** When editing the file `flags.json` file, make sure to fill both the `name` and `code` values. If the `code` is empty the image will **not** be added to the sprite sheet.

## Available CLI commands

The application contains a list of commands that can be called in the terminal:

- `npm run build` - creates the sprite sheet assets;
- `npm run preview` - launches a browser preview of the generated sprite sheet.