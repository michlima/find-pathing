
import { withTheme } from '@emotion/react'
import React, {useEffect, useRef, useState} from 'react'
import Node from './Node'

/*
    false = nothing
    true = wall
*/


const Screen = (props) => {

    const WIDTH = props.width
    const HEIGHT = props.height
    const [nodes, setNodes]         = useState(initNode(WIDTH, HEIGHT))
    const [pathFound, setPathFound] = useState(false)
    const [buildWall, setBuildWall] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)
    const [value, setValue]         = useState(0)

    const origin        = useRef(new MyNode({id: -1}))
    const destination   = useRef(new MyNode({id: -1}))
    const exporer       = useRef(new MyNode({id: -1}))
    const queue         = useRef([])
    const refreshAt     = useRef(4)
    const searching     = useRef(false)
    
    const gettingOrigin = useRef(true)
    const counter       = useRef(0)
    
    
    
    const search = async () => {
        let soroundings = [exporer.current.top, exporer.current.right, exporer.current.left, exporer.current.bot]
        let priorDistance = exporer.current.getDistance()
        let mexplored = queue.current
        for(let i = 0; i < 4; i++){
            try{
                if(!soroundings[i].isSearched && !soroundings[i].me.isWall){
                    soroundings[i].setDistance(priorDistance)                    
                    if(soroundings[i] == destination.current){
                        soroundings[i].setParent(exporer.current)
                        searching.current = false
                        getFamily(exporer.current)
                        return soroundings[i]
                    }
                    if(!soroundings[i].getMe().isWall){
                        soroundings[i].setParent(exporer.current)
                        soroundings[i].setSearched(true)
                        mexplored.push(soroundings[i])
                    }
                }
            } catch (e) {
            }
        }

        console.log(exporer)
        
        
        queue.current = mexplored.slice(1)
        searching.current = true
        counter.current = counter.current + 1
        if(searching.current){
            exporer.current = mexplored[0]
            await sleep(1).then(() => {
                search(false)
            })
            
        }
        if(counter.current > refreshAt.current){
            refreshAt.current = queue.current.length + 1            
            counter.current = 0
            setValue(value => value + 1)
        }
    }

    const getFamily =  async (node) => {
        node.setIsPath(true)
        while(node.parent != origin.current && pathFound){
            await sleep(50)
            getFamily(node.parent)    
            setValue(value => value + 1)
            return 
        }
        setPathFound(true)
    }
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
     
    const setTravel = (node) => {
        clearMap()
        console.log('traveling')
        if(gettingOrigin.current){
            setPathFound(true)
            origin.current.setOrigin(false)
            origin.current = node
            exporer.current = node
            node.setOrigin(true)
            setValue(value => value + 1)
        } else {
            destination.current.setDestination(false)
            destination.current = node
            setValue(value => value + 1)
        }
        gettingOrigin.current = !gettingOrigin.current
    }


    const clearMap = () => {
        queue.current = []
        searching.current = false
        setPathFound(true)
        nodes.map((nodeRow) => {
            nodeRow.map((node) => {
                node.setSearched(false)
                node.setIsPath(false)
                node.setParent(false)
                node.rebaseDistance()
            })
        })
    }

    const buttonClass = 'm-12 w-24 h-24 hover:scale-125 hover:bg-white hover:text-black duration-200 min-24 h-12 rounded-full border-r-8 border-y-2 text-white' 

    
    return(
        <div className='flex justify-center flex-col items-center bg-black  p-12'>
            <div className=' flex flex-row w-full h-full items-center justify-center '>
                <button onClick={() => setBuildWall(!buildWall)} className={buildWall ? 'w-24 h-24 bg-white rounded-full m-12 scale-125' : buttonClass}>
                    Make Wall
                </button>
                <button onClick={() => search(true)} 
                    className={buttonClass}>
                    search
                </button>
            </div>
            
            <div onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)} className=''>
                {nodes.map((nodeRow, index) => {
                    return(
                    <div key={index} className='flex flex-row'>
                        {nodeRow.map((node, index) => {
                            return(
                                    <Node node={node} click={() => { 
                                            setTravel(node)
                                        }} 
                                        gettingOrigin = {gettingOrigin.current}
                                        buildingWall = {buildWall}
                                        mouseDown = {mouseDown}
                                        pathFound = {pathFound}
                                        clearMap = {() => clearMap()}
                                        cls='w-6 h-6 bg-slate-100 rounded-md'
                                    />
                            )
                        })}
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

class MyNode  {
    constructor(me) {
        this.me = me
        this.top = null
        this.bot = null
        this.right = null
        this.left = null
        this.isSearched = false
        this.distance = 1
        this.isOrigin = false
        this.isDestination = null
        this.parent = null
        this.isPath = false
    }


    setTop(top)             { this.top = top}
    setBot(bot)             { this.bot = bot}
    setRight(right)         { this.right = right }
    setLeft(left)           { this.left = left}

    
    setOrigin(value)        { this.isOrigin = value }
    setDestination(value)   { this.isDestination = value}
    setSearched(value)      { this.isSearched = value}
    setDistance (value)     { this.distance = this.distance + value}
    setParent(node)         { this.parent = node}
    setIsPath(value)        { this.isPath = value}

    rebaseDistance()        { this.distance = 1}
    getDistance()           { return this.distance}
    getTop()                { return this.top}
    getRight()              { return this.right}
    getLeft()               { return this.left}
    getBot()                { return this.bot}
    getSearched()           {return this.isSearched}
    getisOrigin()           { return this.isOrigin}
    getDistance()           { return this.distance}
    getParent()             { return this.parent}
    



    getMe(){
        return this.me    
    }

    showMe(){
        return(
            <div>
                {this.me.id}
            </div>
        )
    }

}

const assignNodes = (myNodes, width, height) => {
    let nodes = myNodes
    for(let i = 0; i < height; i+=1){ 
        for(let n = 0; n < width; n+=1){
            if(i > 0)
                nodes[i][n].setTop(nodes[i - 1][n])

            if(i < height - 1)
                nodes[i][n].setBot(nodes[i + 1][n])
            
            if(n < width)
                nodes[i][n].setRight(nodes[i][n + 1])
            
            if(n != 0)
                nodes[i][n].setLeft(nodes[i][n - 1])
       
        }
    }
    return nodes
}

const initNode = (width, height) => {
    let nodeArr = []

    for (let i = 0; i < height; i++){
        let nodeRow = []
        for(let j = 0; j < width; j++) {
            let wall = getValue()
            let newNode = new MyNode({id: (i * width) + j, x:j, y:i , isWall: wall})
            nodeRow.push(newNode)
        }
        nodeArr.push(nodeRow)
    }
    return assignNodes(nodeArr, width, height)
}

const getValue = () => {
    const x = Math.floor(Math.random() * 9)
    if(x == 1){
        return true
    }
    return false
}


export default Screen