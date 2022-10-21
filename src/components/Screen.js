
import React, {useEffect, useRef, useState} from 'react'
import Node from './Node'

/*
    false = nothing
    true = wall
*/


const Screen = (props) => {

    const WIDTH = props.width
    const HEIGHT = props.height
    const [value, setValue] = useState(0)
    const [nodes, setNodes] = useState(initNode(WIDTH, HEIGHT))
    const [origin, setOrigin] = useState(new MyNode({id: -1}))
    const [destination, setDestination] = useState(new MyNode({id: -1}))
    const [explorer, setExplorer] = useState()
    const [queue,setQueue] = useState([])
    const [travelNodes, setTravelNode] = useState([])
    const [sorroundings, setS] = useState([])
    const [pathFound, setPathFound] = useState(false)
    const gettingOrigin = useRef(true)
    const [searching, setSearching] = useState(false)
    

    useEffect(() => {
            search(false)
            if(searching)
                setValue(value => value + 1)
    },[value])
    
    const search = async (init) => {
        let soroundings = [explorer.getTop(), explorer.getRight(), explorer.getLeft(), explorer.getBot()]
        let priorDistance = explorer.getDistance()
        let mexplored = queue

        for(let i = 0; i < 4; i++){
            try{
                if(!soroundings[i].getSearched()){ 
                    soroundings[i].setDistance(priorDistance)                    
                    if(soroundings[i] == destination){
                        soroundings[i].setParent(explorer)
                        setSearching(false)
                        return soroundings[i]
                    }
                    if(!soroundings[i].getMe().isWall){
                        soroundings[i].setParent(explorer)
                        soroundings[i].setSearched(true)
                        mexplored.push(soroundings[i])
                    }
                }
            } catch (e) {
                
            }
        }
        
        if(init) {
        } else {
            setExplorer( mexplored[0])
            setQueue(mexplored.slice(1))
        }
        setSearching(true)
        setValue(value => value + 1)
        
    }
    
    const getFamily = (node) => {
        if(node.getParent()){
            console.log(node)
            node.setOrigin(true)
            console.log(getFamily(node.getParent()))
        }
        return 
    }
     
    const setTravel = (node) => {
        setSearching(false)
        clearMap()
        setQueue([])
        if(gettingOrigin.current){
            origin.setOrigin(false)
            setOrigin(node)
            setExplorer(node)
            node.setOrigin(true)
        } else {
            destination.setDestination(false)
            setDestination(node)
        }
        gettingOrigin.current = !gettingOrigin.current
    }

    const clearMap = () => {
        nodes.map((nodeRow) => {
            nodeRow.map((node) => {
                node.setSearched(false)
                node.rebaseDistance()
            })
        })
    }

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    
    return(
        <div className='flex justify-center'>
            <div className=''>
                {nodes.map((nodeRow, index) => {
                    return(
                    <div key={index} className='flex flex-row'>
                        {nodeRow.map((node, index) => {
                            
                            if(node.getisOrigin()){
                                return (
                                        <Node node={node} origin={true} cls='w-10 h-10 bg-green-500'/>
                                )
                            } 
                            if (node.isSearched){
                                return(
                                        <Node node={node} distance={node.getDistance()} searched={true} setOrigin={() => setTravel(node)} cls=' text-xxs w-10 h-10 bg-pink-100'/>
                                )
                            } 
                            if (node == destination){
                                return(
                                        <Node node={node}  destination={true} cls='w-10 h-10 bg-red-500'/>
                                )
                            }
                            return(
                                    <Node node={node} origin={node == origin} setOrigin={() => setTravel(node)} cls='w-10 h-10 bg-slate-100'/>
                            )
                        })}
                    </div>
                    )
                })}
                <button onClick={() => search(true)}>search
                </button>
                -
                <button onClick={() => getFamily(destination)}>get Family
                </button>
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
            let value = getValue()
            let newNode = new MyNode({id: (i * width) + j, x:j, y:i , isWall: value})
            nodeRow.push(newNode)
        }
        nodeArr.push(nodeRow)
    }
    return assignNodes(nodeArr, width, height)
}


const getValue = () => {
    const x = Math.floor(Math.random() * 3)
    if(x == 1){
        return true
    }
    return false
}

export default Screen