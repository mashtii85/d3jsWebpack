import * as d3 from "d3";
import data from '../data/data.json'




const barWidth = 25;
const margin={top:50,bottom:50,left:50,right:50}




function responsiveD3({container,width,height}){
    
function xAxios(g){
    const numberOfBar=5
  g
  .attr('transform',`translate(0,${height-margin.bottom})`)
  .call(d3.axisBottom(x)
    .tickValues(x.domain().filter(function(d, idx) {
     return idx%numberOfBar===0 
}))
.tickFormat(i=>i*2*10))
.attr('font-size','13px')

}

function yAxios(g){
    g
    .attr('transform',`translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null,data.format))
    .attr('font-size','13px')
}


    const x = d3.scaleBand().domain(d3.range(data.length)).range([margin.left,width-margin.right]).padding(0.1)

    const y = d3.scaleLinear()
    .domain([0,Math.max(...data)])
    .range([height-margin.bottom,margin.right])

    
const svg = container
.attr('width',width-margin.left-margin.right)
.attr('height',height-margin.top-margin.bottom)
.attr('viewBox',[0,0,width,height])
.style('background','#f4f4f4')



svg.append('g').attr('fill','#2DA68E').selectAll('rect')
.data(data).
join('rect')
.attr('x',(d,i)=>x(i))
.attr('y',d=>y(d))
.attr('height',d=>y(0)-y(d))
.attr('width',x.bandwidth())
    svg.append('g').call(xAxios)
    svg.append('g').call(yAxios)

    svg.node()

}


function render(){
const width = data.length*(barWidth)
    const height =document.body.clientHeight*50/100
    responsiveD3({container:d3.select('svg'),width,height})
}
render()

window.addEventListener('resize',render)

