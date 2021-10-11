# Image Finder

## Brief
We would like to build a JS application that displays images fetched from an external service.

A basic service would have the following functionalities:
- Ability to fetch data from an external image searching API
- Transform and filter the data
- Display on the page

We could plan to extend the service by introducing:
- Add test coverage or implementing directly a TDD approach

For the purpose of this exercise, the external API will be NASA's media searching API

    https://images-api.nasa.gov/search?q=moon

Here is an example of the payload:

```
{
  "collection": {
    "href": "https://images-api.nasa.gov/search?q=moon",
    "version": "1.0",
    "items": [
      {
        "href": "https://images-assets.nasa.gov/image/PIA12235/collection.json",
        "data": [ ... ],
        "links": [
          {
            "href": "https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg",
            "render": "image",
            "rel": "preview"
          }
        ]
      }
    ]
  }
}
```

Here is what we expect our App to show:

```
<div>
    <img src="https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg" />
    <img src="https://images-assets.nasa.gov/image/PIA12235/PIA12236~thumb.jpg" />
    <img src="https://images-assets.nasa.gov/image/PIA12235/PIA12237~thumb.jpg" />
    (...)
</div>
```

## Usage
To start the application you need to build it first:

```
npm install
npm run start
```

You are free to code and run the application using any IDE/text editor of your choice.
You can search the web for information as you'd do in normal work day or ask your interviewers for help and collaboration.
