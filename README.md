## 2020 US Data Visualizer
[The US Data Visualizer](https://bob-skywalker.github.io/us-data-visual-presentation/)
 aims to provides detailed, precise data to accurately represent the count in numbers of varies data ranging from unemployment rate to number of confirmed covid cases in the year of 2020 with a simple hover over.
## Demo
![Alt Text](https://media2.giphy.com/media/EI43r9zeRLr4VhPQWI/giphy.gif?cid=790b76118106635abe40e87948bb63b97525bfb62da868f9&rid=giphy.gif&ct=g)


## Features
*  interact with the databa base through simple mouseover, to display varies datas
*  toggle at the bottom of the page that dynamically changes the data & color of data
*  running on two datasets that correlates to all counties in the US
*  basic guide tab / user guide on the rightside
*  give level of severity for Covid cases in the county you are mousing over
## Technologies, Libraries, APIs
*  interact with the databa base through simple mouseover, to display varies datas
*  Webpack and Babel to bundle and transpile JavaScript code
*  asynchronically fetching 2 set of databases  


## Code Snippet

**D3 Draw Map && filter by county population**

```js
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
                return +item.us_county_fips === id

              })


              if (!county){
                return 'black'
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
                return +item.us_county_fips === id

              })
              let numbers = +county['population']
              return numbers
            })
  }
```

