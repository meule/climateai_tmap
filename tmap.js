// aws s3 sync tmap s3://varik.ru/climateai/test --profile kostya --acl public-read

mapboxgl.accessToken = 'pk.eyJ1IjoidmFyaWsiLCJhIjoiTC1IZFkzNCJ9.Bh1S9ujLfb9hW6GlunR2eA'

const fieldNames = ['all_fields','field_1', 'field_2', 'field_3', 'field_4']

let map = new mapboxgl.Map({
    container: 'map',
    style: mapStyle,
    zoom: 5,
    center: [-91.48, 42.43]
});

let layerList = document.getElementById('menu')

let inputs = layerList.getElementsByTagName('input')

let currentLayerId = 'all_fields'

const switchLayer = (layer) => {

  map.setLayoutProperty(currentLayerId, 'visibility', 'none')
  currentLayerId = layer.target.id
  map.setLayoutProperty(currentLayerId, 'visibility', 'visible')

  document.getElementById("legend-all_fields").style.display = currentLayerId == 'all_fields' ? 'block' : 'none'
  document.getElementById("legend-field").style.display = currentLayerId != 'all_fields' ? 'block' : 'none'

}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer
}

map.on('load', function () {

  makeGeoJSON( (err, data) => {

    if(err){
      console.log(err)
      return
    }

    data.features.forEach( f => {
        for(let k in f.properties) { f.properties[k] = +f.properties[k] }
    })

    allFieldsLayer.source.data = data
    map.addLayer(allFieldsLayer)

    for(let i = 1; i < fieldNames.length; i++ ){
      let layer = Object.assign({}, fieldLayer)
      layer.source.data = data
      layer.id = 'field_' + i
      layer.paint['circle-color'][2][1] = 'field_' + i
      map.addLayer(layer)
    }

  })
})


const makeGeoJSON = (cb) =>
  csv2geojson.csv2geojson(csvData, {
      latfield: 'latitude',
      lonfield: 'longitude',
      delimiter: ','
    }, cb)
