import React from 'react'

const Node = (props) => {
    console.log('i')
    const me = props.node.me
    if(me.isWall){
        return (
            <button onClick={() => console.log('I am wall')} className='w-4 h-4 bg-black'>
                
            </button> 
        )
    }
    
    return (
        <button  onClick={() => props.click()} className={props.cls}>
        </button>
    )
}

export default Node