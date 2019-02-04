---
title: File Api
id: version-2018.3.3-fileapi
original_id: fileapi
---

Indicium's file api allows for files to be streamed to the client. This enhances Indicium's filestorage capabilities:

- The binary data is no longer part of the JSON payload
- Allows the use of local (browser) caching
- No longer loads the data in memory

## Url format
When data from a table is requested Indicium will return a JSON object containing the urls for each file column.

```javascript
"column_id":
{
    "Url": ...
}
```

The final url will have the following format:

`<web_app_root_url>/iam/<appl>/<table>(<key>)/$download_<column>()`

Where:
- `app_id`: the application id or alias.
- `table`: the name of the table.
- `key`: the primary key(s) for the row.
- `column_id`: the name of the file column.

Additional query parameters can be used to control the returned image size, see the table below. Please keep in mind
that the image aspect ratio is _always respected_. The size must be given as an whole number. 

For example:

<https://server/indicium/iam/insights/employee(1)/$download_photo()?size=100>

Indicium will cache the image based on the requested size.

When using **database** storage it is advised to use the **$deselect** query parameters to deselect the storage columns.
This will reduce the response size drastically and improves performance.

## Caching

The File Api uses two caching methods. Regular _browser caching_ by including an [`Etag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) header in the
response, where the Etag is the the requested file's hashcode. For following requests which contain the Etag header, Indicium
will verify the Etag, via the `If-None-Match` header against the current file hashcode. When the file did not change
Indicium will respond with a `304 Not Modified` statuscode.

Another caching mechanism is introduced to save roundtrips to the server. By using the **$eager** query parameters Indicium
 will use this caching method. The hash is calculated beforehand and added as _file_id_ function parameter, like so:

<https://server/indicium/iam/123/employee(1)/$download_photo(file_id=’123456789’)>

This way the browser is able to cache the url locally. The latter caching method can be set for specific columns by using the 
**$eager** query option. Please be aware that Indicium needs to calculate the hash for each file beforehand, this could potentially 
delay the first response. However, for files that do not change often the saved roundtrips will have a greater benefit overall.
<br><br>
Query Parameter | Description
---|---
$size | The size of a square size image thumbnail
$width | Width of the thumbnail, height must also be given
$height | Height of the thumbnail, width must also be given
$eager | A comma separated list of column id’s which will have a *file_id* in the generated download url