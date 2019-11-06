---
title: Maps
---

The Maps component creates a visual representation of a single data set, i.e. a table or a view. In this, the Maps component doesn’t differ much from the Grid component, which also visualizes a single data set. However, the Maps component requires some additional settings in order for the component to make sense of the data, much like how the PivotGrid component requires a cube configuration.

Configuring a Maps component for a certain subject is done by means of an Extender in the SF. It’s important to know that each record in a subject represents a single entity on the Maps component. How that entity is visualized and how it can be interacted with is determined by the Extender properties.

## Global settings

**Table** (required)

The ID of the table or view to which this Maps configuration applies.

**Table variant** (optional)

The ID of the variant of the table or view to which this Maps configuration applies.

**Initial latitude/longitude/zoom level** (optional)

The initial center coordinates and zoom level of the map.

**Geocoder** (optional)

A geocoder is a third-party service that can translate an address to coordinates. If you want to mark points on the map and you only have addresses, then this is a mandatory setting for you. We support several geocoders, such as Google Maps, and most of them require an API key. There is often a price plan associated with an API key that requires you to pay depending on how much you will use the geocoder.

**Popup HTML template** (optional, but it’s recommended to use either this or the *Popup HTML column*)

The value of this property should be an HTML template that will be used to construct the HTML shown in the popup balloon when selecting. Only one template can be defined, but values of columns and images can be parameterized through *Column template mappings* and *Image template mappings*.

Example:

```html
<div><h1>[title_column]</h1><img src="[image_column]"/></div>
```

## Column bindings

**Type** (required)

The value of this property determines which column is responsible for supplying the *Configuration id* of a record. The value of the column must the *Configuration id* of an *Entity configuration*, which will be explained later on.

**Free form address column** (optional)

The value of this property determines which column is responsible for supplying the address of an entity. This property is only relevant for points (markers) on the map and should only be used when the coordinates of the point are unknown. If this property is used, then it is mandatory to configure a Geocoder as well, which will be used to translate the address to its coordinates on the map. These coordinates will then be written back to the table/view with an update-statement, to avoid translating the same address over and over.

**Coordinates column** (optional, though recommended)

The value of this property determines which column is responsible for supplying the coordinates of an entity. For points (markers) the coordinates will have priority over the address to improve performance and lower the costs of geocoding. For other geometric shapes, the coordinates column is mandatory and will contain a sequence of coordinates which will form the shape on the map by drawing straight lines between them. The value of the column must have the following JSON format:

```json
{
    "CoordSets": [
        [
            {
                "Lat": 12.34567
                "Lon": 12.34567
            },
​            ... (more coordinate objects)
        ],
​        ... (more arrays of coordinate objects)
    ]
}
```

The double array is necessary to support geometric shapes with gaps in them. The coordinates within each inner array will be connected by lines. The arrays themselves will not be connected by lines.

**Popup HTML column** (optional, it’s recommended to use either this or the *Popup HTML template*)

The value of this property should be the name of the column that is responsible for supplying the HTML that will be shown in the popup balloon when selecting an entity. With this property it’s possible to use a completely different piece of HTML for every record in the subject.

## API key column

Geocoders often require an API key to be added to the query string of the request URL (i.e. `?key=abc`). For every key property that needs to be added to the request URL, a column needs to be added to the subject. The ID of the column should match the name of the key parameter and the value of the column should be the value of the key. The column can be an expression column if needed.

> Note: The value of the *Table* property must be the same as the main *Table* property.

## Legend menu

The legend menu allows you to map a translation to an icon. You can add as many entries as necessary and they will be shown in a small menu in the top right corner of the map.

## Layer menu

The layer menu is similar to the legend menu in that it allows you to map a translation to an icon. However, the layer menu is a bit more interactive as it allows you to choose between base layers (e.g. switch between a street map and a satellite map) and toggle overlay layers (e.g. show/hide traffic information or show/hide groups of entities).

Base layers are represented by radio buttons because there must always be exactly one base layer. Non-base layers are represented by checkboxes, all of them can be turned on or off individually. Entity configurations must always be mapped to a layer which has the *Data entity layer* property set to *true*.

## Tiles layer configurations

Tiles layers are layers that are built out of blocks (tiles) of pictures that are loaded lazily as you pan the map. Tiles layers are typically base layers retrieved from a third-party that form the background map on top of which the other layers are visualized, though this isn’t strictly necessary.

**Manual tiles layer configuration**

A manual tiles layer configuration is for tiles that can be retrieved through simple GET requests of a parameterized URL. Not all maps providers offer such a service, but for those that do, a manual tiles layer configuration can be used.

Examples can be found here:
<https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers>

**Library tiles layer configuration**

If a manual tiles layer configuration is not an option, then a library configuration can be used. The Maps component is based on leaflet which means that we support tiles layers of maps providers for which a leaflet plugin has been made.

One example of such a maps provider is MapQuest. To get a MapQuest tiles layer, the following configuration can be used:

- Library URI: <https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-map.js?key=APIKEY>
- Creation script: `MQ.mapLayer()` or `MQ.satelliteLayer()` or `MQ.hybridLayer()` or `MQ.darkLayer()` or `MQ.lightLayer()`
  *(You can also add all of them as individual configurations and switch between them in the Maps component.)*

## Marker entries

Points on the map are called markers. Entity configurations with *Geometric type: Point* should have a marker entry associated with them. A marker entry is simply an icon and a translation. The icon will be shown on the map at the coordinates of the point and the translation will be shown upon hovering the icon.

## Entity configuration

An entity configuration is a collection of settings that determine how a record is visualized by the Maps component. For instance, some records represent a point on the map while others are lines or other geometrical shapes. Furthermore, some points might represent companies or locations, while others represent trucks, boats or people.

**Legend menu entry** (required)

The legend menu entry that corresponds to this entity configuration. Note that for markers it is possible to have a different icon on the marker than on the legend menu entry. Doing so, however, defeats the purpose of having a legend.

**Layer menu entry** (optional)

The layer menu entry that corresponds to this entity. Note that this must be a data entity layer. All entities that belong to the entity configuration will be added to the chosen layer, allowing you to show/hide them all at once.

**Marker entry** (optional, required when geometric type is point)

The marker entry that corresponds to this entity configuration. This determines the icon and tooltip of the entity on the map.

**Geometric type** (required)

Determines if the entities belonging to this entity configuration are shown as points, lines, polygons, etc.

**Draggable** (optional, only applicable to points/markers)

Determines if the point can be moved on the map. Upon moving it, an update-statement with the new coordinated will be sent to the database for the moved entity.