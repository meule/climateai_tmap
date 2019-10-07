const BASEMAP_BASIC_URL = 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',

mapStyle = {
    "version": 8,
    "sources": {
        "basemap_basic": {
          "type": 'raster',
          "tiles": [BASEMAP_BASIC_URL],
          "tileSize": 256
        },
    },
    "layers": [
        {
            "id": 'basemap_basic',
            "source": 'basemap_basic',
            "type": 'raster',
            "minzoom": 0,
            "maxzoom": 22
        },
    ]
}


let allFieldsLayer = {
  'id': 'all_fields',
  'type': 'circle',
  'source': {
    'type': 'geojson',
    'data': null
  },
  //'source-layer': 'fields',
  "layout": { "visibility": 'visible' },
  'paint': {
    // make circles larger as the user zooms from z12 to z22
    'circle-radius': {
      'stops': [[2, 0.5], [5, 2], [16, 40]]
    },
    'circle-color': [
      'match', ['get', 'all_fields'],
      1, '#3ab092',
      2, '#de7fd5',
      3, '#b0ea72',
      4, '#ef966f',
      /* other */ '#ccc'
    ]
  }
}

let fieldLayer = {
  'id': null,
  'type': 'circle',
  'source': {
    'type': 'geojson',
    'data': null
  },
  //'source-layer': 'fields',
  "layout": { "visibility": 'none' },
  'paint': {
    // make circles larger as the user zooms from z12 to z22
    'circle-radius': {
      'stops': [[2, 0.5], [5, 2], [16, 40]]
    },
    'circle-color': [
        "interpolate", ["linear"], ['get',null],
        0, '#2c115f',
        0.1, '#721f81',
        0.2, '#b73779',
        0.3, '#f1605d',
        0.4, '#feb078',
        0.5, '#fcfdbf',
    ]
  }
}
"#","#","#","#","#","#"
