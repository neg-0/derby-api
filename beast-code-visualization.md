# Visualization Standard

 

This standard defines how the viewer can lookup colors that a component should use when rendering.

 

## Extends

 

- [**@bc-standards/standards-services**](https://gitlab.phactory.beast-code.com/bc-standards/standards/services/standards-services) v1.0.3

- [**@bc-standards/standards-discovery**](https://gitlab.phactory.beast-code.com/bc-standards/standards/standards-discovery) v2.1.0

 

## Types

 

### color

 

Colors are represented as an array of numbers with a length of 3 with a layout of red, green, blue. Each array member has a valid range of 0-255.

 

## Endpoints

 

NOTE: Responses should be wrapped in the StandardsResponse from the service standard.

 

### `POST /visualizer/colors`

 

This endpoint takes in a list of components. In response it gives a list of colors and the components associated with that color.

There should be a 1:1 relationship between the components within the request and response (eg. only components requested are in the response and everything within the request should be in the response).

 

Request: `VisualizerColorRequest`

 

```json

{

  "components": [

    "Example Part Id #1",

    "Example Part Id #2",

    "Example Part Id The Implementation Does Not Know About"

  ]

}

```

 

Response: `VisualizerColorResponse[]`

 

The response returns an array of objects containing the color and a list of components that should use that color.

 

```json

[

  {

    "color": [0, 255, 255],

    "components": ["Example Part Id #1", "Example Part Id #2"]

  },

  {

    "color": [255, 0, 255],

    "components": ["Example Part Id The Implementation Does Not Know About"]

  }

]