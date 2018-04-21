# MMM-Unsplash
A <a href="https://github.com/MichMich/MagicMirror">MagicMirror²</a> module used to pull a random photo from one or more Unsplash collections. Like <a href="https://github.com/diego-vieira/MMM-RandomPhoto">MMM-RandomPhoto</a>, but for specific collections. Tested with MagicMirror² v2.2.2, v2.3.1 servers, Chrome 65 on Windows 10 and Midori 0.4.3 on a Raspberry Pi Zero W with Raspbian Jessie.

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/parnic/MMM-Unsplash.git`.
2. Add the module inside `config.js` placing it where you prefer.

## Config
|Option|Type|Description|Default|
|---|---|---|---|
|`opacity`|double|The opacity of the image.|0.3|
|`collections`|string|(REQUIRED) Comma-delimited list of collections to pull from.|`''`|
|`width`|int|Desired image width.|`1080`|
|`height`|int|Desired image height.|`1920`|
|`orientation`|string|Orientation of the image. Valid values: `landscape`, `portrait`, `squarish`|`'portrait'`|
|`apiKey`|string|(REQUIRED) Your Unsplash API key.|`''`|
|`updateInterval`|int|Number of seconds between image updates. Note that your API key is rate-limited, so if, for example, your rate limit was 50/hr, this should be no less than 72.|`1800` (30mins)|

Here is an example of an entry in config.js
```
{
	module: 'MMM-Unsplash',
	position: 'fullscreen_below',
	config: {
		collections: '369966,1240111,1136512,629911,150672,920773',
		apiKey: 'your_api_key'
	}
},
```

## Notes
Pull requests are very welcome! If you'd like to see any additional functionality, don't hesitate to let me know.

## Dependencies
None!

## Special Thanks
<a href="https://github.com/diego-vieira/MMM-RandomPhoto">MMM-RandomPhoto</a> for the inspiration. The core image update functionality is cribbed from this module.
