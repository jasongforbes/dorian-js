# Dorian.js

This project is a simple blogging platform which converts user written markdown files into HTML and is available via the MIT OpenSource License.

One of the goals of this project is to provide a simple use-case for learning react-js and basic web-development. The aim was to make this project extensible while retaining simplicity.

Dorian.js was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Getting Started
To lauch the application for debugging, execute the following commands.

```
npm install
npm run start
```

To generate the single-page application for distribution.

```
npm run build
```

## Writing Posts
Posts are written in markdown, with a required YAML header for supplying meta-data. A typical post is in the following format:

```md
---
title: Test Post
date: 2017-03-02
banner: media/images/test-post-banner.jpg
description: This is a test post.
---

Content goes here

```

As seen above, the meta-data is seperated from the post body using three dashes. The two required fields in the YAML frontmatter are "Title", which appears as a h2 tag in the html, and date. The date (or date-time if higher precision is required) is also used for sorting the posts from newest to oldest.

The banner field inputs an image in the post-summary and post. In the example above, the image is found locally in the /media/images/ directory. This directory is loaded from ./public/images on build.

Images are scaled using the image-loader. and the scaled images are placed in the build directory. This can be customized in the [App.js](App.js) importAll statement.

```js
importAll(require.context('!json!./loaders/image-loader?path=/media/images/&resizeWidth[]=1000&placeholder!../images/', true, /\.(jpe?g|png)$/));
```

The description field is an optional field to provide a short synopsis of the post.

The required fields can be adjusted in [App.js](App.js) where they are defined in the importAll call.

```js
importAll(require.context('!json!./loaders/frontmatter-loader?expected[]=date,expected[]=title!../posts/', true, /\.md$/))
```

## Writing Pages
Pages are differentiated from posts in that they are relatively static content you want displayed at all times. This is typically content such as "About" or "Contact". Links to all defined Pages are displayed in the header nav-bar.

A page is a markdown file with YAML frontmatter. The frontmatte currently has two required fields, title and order. Title is used as the text in the navigation link, and order is used to define the ordering of the posts in the navigation bar.

See the example About page for example format:

```md
---
title: About
order: 1
---
## About
Dorian is a single-page app framework built using react that simplifies landing-pages and blogs. See the [github page](https://github.com/jasongforbes/dorian-js) for up-to-date instructions on installation and usage.
```

The required fields can be adjusted in [App.js](App.js) where they are defined in the importAll call.

```js
importAll(require.context('!json!./loaders/frontmatter-loader?expected[]=title,expected[]=order!../pages/', true, /\.md$/))
```

## Configuration
The supplied config.json file allows the user to configure the dorian-app. Below is a list of the configurations and their default values.

```json
{
  "header": {
    "title": "My Landing Page",
    "description": "This is the landing page description.",
    "avatarAlt": "Default Image."
  },
  "numPostsToLoad": "3"
}
```

* `numPostsToLoad` -  Defines the number of posts to load in background using the auto-load scroll feature.
* `header.title` - Title of the web-page.
* `header.description` - Description, or subheader, for the web-page.
* `header.avatarAlt` - Alt-text for the avatar image.

## Contributing
Feel free to contribute to this project and submit enhancements or bugs to the issue tracker.
