import React, { useEffect, useState } from 'react'


const Node = (props) => {
    const [value, setValue] = useState(0)
    
    const node = props.node
    const handleClick = () => {
        if(props.gettingOrigin){
            node.setOrigin(true)
            props.click()
            setValue(value => value + 1)
        } else  {
            node.setDestination(true)
            props.click()
            setValue(value => value + 1)
        }
    }

    const becomeWall = () => {
        props.clearMap()
        if(props.mouseDown ) {
            if(!node.me.isWall)
                node.me.isWall = true
            else
                node.me.isWall = false
        }
        setValue(value => value +1)
    }
    


    if(node.me.isWall)
        return <button onClick={() => console.log('I am wall')} className='w-6 h-6'>
            <div className='w-6 h-3 bg-white'/>
        </button>
        
    
    if(node.isOrigin){
        return <button node={node} origin={true} className=' bg-black'>
            <div className='w-6 h-6 bg-green-500 rounded-lg'/>
        </button>
    }

    if(node.isDestination){
        return <button node={node} origin={true} className='bg-black'>
                <div className='w-6 h-6 bg-emerald-800 rounded-lg'/>
            </button>
    }
    if(props.buildingWall)
        return <button onMouseDown={becomeWall} onMouseOver={becomeWall} className='w-6 h-6 bg-black  border-[1px]'/>

    if(node.isPath){
        return <button onClick={handleClick} node={node} origin={true} className=' w-6 h-6 bg-black flex items-center justify-center'>
            <div className=' w-6 h-6 bg-yellow-300 scale-50'/>
        </button>
    }
    if(node.isSearched){
        return <button node={node} onClick={handleClick} origin={true} className='bg-black '>
            <div className={ props.pathFound ? '  w-6 h-6 bg-teal-300 scale-50 rounded-lg' : ' animate-spin-slow w-6 h-6 bg-teal-300 scale-50 rounded-lg'}/>
        </button>
    }

    

    return <button  onClick={handleClick} className='w-6 h-6 bg-black '/>

}


export default Node