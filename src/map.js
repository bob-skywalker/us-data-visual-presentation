import { count } from "d3"

export const map = async function(){
    const guide2 = document.querySelector('#guide2')
    const tooltip1 = document.querySelector('#tooltip');
    const tooltip22 = document.querySelector('#tooltip2');
    const legends2 = document.querySelector('#legend2');
    const guide = document.querySelector('#guide');
    const body = document.querySelector('body');
    const title = document.querySelector('#title');
    const title2 = document.querySelector('#title2');
    const toggle = document.getElementById("toggle");
    const canvas1 = document.querySelector('#canvas');
    const canvas2 = document.querySelector('#canvas2');
    const leftSide = document.querySelector('#leftSide');
    const legend = document.querySelector('#legend');
    const container2 = document.querySelector('#container2');
    // const tabs = document.querySelector('.tabs');
    toggle.onclick = function(){
      guide2.classList.toggle('hidden')
      tooltip1.classList.toggle('hidden')
      tooltip22.classList.toggle('hidden')
      legends2.classList.toggle('hidden')
      guide.classList.toggle('hidden')
      toggle.classList.toggle('active')
      body.classList.toggle('active')
      title.classList.toggle('hidden')
      title2.classList.toggle('hidden')
      canvas1.classList.toggle('hidden')
      canvas2.classList.toggle('hidden')
      leftSide.classList.toggle('hidden')
      legend.classList.toggle('hidden')
      container2.classList.toggle('hidden')
      // tabs.classList.toggle('hidden')
    }


  let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  let covidURL = 'https://raw.githubusercontent.com/Zoooook/CoronavirusTimelapse/master/static/population.json'

  let countyData
  let covidData
  let parsedData = await fetch('./data/unemployment.json')
  let unemployData = await parsedData.json()
  // console.log(unemployData)


  let canvas = d3.select('#canvas')
  let canvasTwo = d3.select('#canvas2')
  let tooltip = d3.select('#tooltip')
  let tooltip2 = d3.select('#tooltip2')

  let drawMap = () => {

    canvas.selectAll('path')
            .data(countyData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class','county')
            .attr('data-pop',(el)=>{
              return el.id
            })
            .on('mouseover',(countyDataItem)=>{
              tooltip.transition()
                    .style("visibility", "visible")
              tooltip2.transition()
                    .style("visibility", "visible")

                let id = countyDataItem['id']
                let county = covidData.find((item)=>{
                  return +item.us_county_fips === id
                })
                
                if (!county){
                  tooltip.text('No info available at this time!')}
                else if (county['population']< 3000){
                  tooltip.text('Severity: Low County Cases: ' + county['population'])
                } else if ((county['population'] > 3000) && (county['population'] < 8000)){
                  tooltip.text('Severity: Mild County Cases: ' + county['population'])
                } else if ((county['population'] > 8000) && (county['population'] < 20000)){
                  tooltip.text('Severity: Moderate County Cases: ' + county['population'])
                } else if ((county['population'] > 20000) && (county['population'] < 250000)){
                  tooltip.text('Severity: Severe County Cases: ' + county['population'])
                }
                else {
                  tooltip.text('Severity: Devilish County Cases: ' + county['population'])
                }


            })
            .on('mouseout',(countyDataItem)=>{
              tooltip.transition()
                    .style("visibility","hidden")

            })
            .attr('fill',(countyDataItem)=>{
              let id = countyDataItem['id']
              let county = covidData.find((item)=>{
                // console.log(item['us_county_fips'])
                return +item.us_county_fips === id

              })


              if (!county){
                return 'black'
                // return 'limegreen'
              }
              let numbers = +county['population']

              if(numbers < 3000){
                return 'limegreen'
              } else if ((numbers > 3000) && (numbers < 8000)){
                return 'lightgreen'
              } else if ((numbers > 8000) && (numbers < 20000)){
                return 'orange'
              } else if ((numbers > 20000) && (numbers < 250000)){
                return 'tomato'
              } else {
                return 'firebrick'
              }
            })

            .attr('county-fips',(countyDataItem)=>{
              return countyDataItem['id']
            })
            .attr('covid-county-population',(countyDataItem)=>{
              let id = countyDataItem['id']
              let county = covidData.find((item)=>{
                // console.log(item['us_county_fips'])
                return +item.us_county_fips === id

              })

              // let numbers
              // if (typeof +county['population'] === 'undefined') {
              //   return '1000'
              // } else {
              //   numbers = +county['population']
              // }
              let numbers = +county['population']
              return numbers
            })
  }

  d3.json(countyURL).then(
    (data, error)=>{
      if(error){
        console.log(error)
      } else{
        countyData = topojson.feature(data, data.objects.counties).features
        // console.log(countyData)

        d3.json(covidURL).then(
          (data,error)=>{
            if(error){
              console.log(error)
            }else
              window.covidData = data
              covidData = data
              // console.log(covidData)
              drawMap()
          }
        )
      }
    })


    let drawMap2 = () => {

      canvasTwo.selectAll('path')
              .data(countyData)
              .enter()
              .append('path')
              .attr('d', d3.geoPath())
              .attr('class','county')
              .attr('data-pop',(el)=>{
                return el.id
              })
              .on('mouseover',(countyDataItem)=>{
                tooltip2.transition()
                      .style("visibility", "visible")

                  let id = countyDataItem['id']
                  let county = unemployData.find((item)=>{
                    return +item.fips === id
                  })
                  if(county['unemp'] < 3.0){
                    tooltip2.text('County Unemployment Rate: ' + county['unemp'] + '%')
                  } else if ((county['unemp'] > 3.0 ) && (county['unemp'] < 4)){
                    tooltip2.text('County Unemployment Rate: ' + county['unemp'] + '%')
                  } else if ((county['unemp'] > 4 ) && (county['unemp'] < 6)){
                    tooltip2.text('County Unemployment Rate: ' + county['unemp'] + '%')
                  } else if ((county['unemp'] > 6 ) && (county['unemp'] < 8)){
                    tooltip2.text('County Unemployment Rate: ' + county['unemp'] + '%')
                  } else {
                    tooltip2.text('County Unemployment Rate: ' + county['unemp'] + '%')
                  }


              })
              .on('mouseout',(countyDataItem)=>{
                tooltip2.transition()
                      .style("visibility","hidden")
              })
              .attr('fill',(countyDataItem)=>{
                let id = countyDataItem['id']
                let county = unemployData.find((item)=>{
                  // console.log(item['us_county_fips'])
                  return +item.fips === id
                })

                if (!county){
                  return 'black'
                }

                if(county['unemp'] < 3.0){
                  return 'dodgerblue'
                } else if ((county['unemp'] > 3.0 ) && (county['unemp'] < 4)){
                  return 'royalblue'
                } else if ((county['unemp'] >= 4 ) && (county['unemp'] < 6)){
                  return 'bisque'
                } else if ((county['unemp'] >= 6 ) && (county['unemp'] < 8)){
                  return 'lightsalmon'
                } else if ((county['unemp'] >= 8 ) && (county['unemp'] < 99)){
                  return 'crimson'
                } else
                  return 'royalblue'
              })





    }

    d3.json(countyURL).then(
      (data, error)=>{
        if(error){
          console.log(error)
        } else{
          countyData = topojson.feature(data, data.objects.counties).features
          // console.log(countyData)

          d3.json(covidURL).then(
            (data,error)=>{
              if(error){
                console.log(error)
              }else
                window.covidData = data
                covidData = data
                // console.log(covidData)
                drawMap2()
            }
          )
        }
      })

}
