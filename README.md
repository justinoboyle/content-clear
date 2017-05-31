# content-clear

Clear, clean, readable content.

## Screenshots

![light mode](https://github.com/justinoboyle/content-clear/blob/master/img/light.png?raw=true)

## How to use

Simply use [build/style-min.css](https://github.com/justinoboyle/content-clear/blob/master/build/style-min.png?raw=true) in your HTML file. content-clear will automatically transform all `<article>`s.

Example schema:

```html
<html>
    <head>
        <!-- Include the CSS -->
    </head>
    <body>
        <article>
            <h1>Title</h1>
            <p>This is some <strong>content</strong>!</p>
        </article>
    </body>
</html>
```

Output:

![output](https://github.com/justinoboyle/content-clear/blob/master/img/example.png?raw=true)

## API usage

First, install from NPM:

```
npm i content-clear --save
```

Then, use it in your project:

```javascript
import contentClear from 'content-clear';

console.log(contentClear.location); // Output build location

contentClear.content().then(console.log); // Output built CSS
```