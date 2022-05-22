import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './home.scss'

const Home = () => {
    const [data, setData] = useState([]);
    const [time, setTime] = useState(`Today's`)
    // const [data, setData] = useState([200, 150, 102, 100, 75, 150, 60, 153, 290]);
    const svgRef = useRef()
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const getData = () => {
        const list = []
        for (let i = 0; i < 10; i++) {
            list.push(getRandomInt(25, 390))
        }
        return list
    }
    useEffect(() => {
        const w = 1020;
        const h = 454
        const max = d3.max(data)
        d3.selectAll("svg > *").remove();
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top', '32px')

        const xScale = d3.scaleBand()
            .domain(data.map((val, i) => i))
            .range([0, w])
            .padding(0.5)
        const yScale = d3.scaleLinear()
            .domain([0, max + 10])
            // .domain(data.map((val, i) => i))
            .range([h, 0]);

        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length);
        const yAxis = d3.axisLeft(yScale)
            .ticks(5);

        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`)
        svg.append('g')
            .call(yAxis)

        svg.selectAll('.bar')
            .data(data)
            .join('rect')
            .attr("fill", '#c5cdd4')
            .attr('x', (v, i) => xScale(i))
            .attr('y', yScale)
            .attr('width', xScale.bandwidth())
            .attr('height', val => h - yScale(val))
    }, [data])
    useEffect(() => {
        setData(getData())
    }, [])

    return (
        <div className='home'>
            <div className='chart-container'>
                <div className='chart-head'>
                    <div>
                        <h1 className='time-title'>This {time} Data</h1>
                    </div>
                    <div className='container'>
                        <span >{time} data </span>
                        <ul className='data-list'>
                            <li className='list-item' onClick={() => {
                                setTime(`Today's`);
                                setData(getData())
                            }} >Today</li>
                            <li className='list-item' onClick={() => {
                                setTime(`Month's`);
                                setData(getData())
                            }} >Month</li>
                            <li className='list-item' onClick={() => {
                                setTime(`Year's`);
                                setData(getData())
                            }} >Year</li>
                            <li className='list-item' onClick={() => {
                                setTime('All');
                                setData(getData())
                            }} >All</li>
                        </ul>
                    </div>
                </div>
                <svg ref={svgRef} />
            </div>
        </div>
    )
}

export default Home