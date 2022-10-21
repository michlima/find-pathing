import React from 'react'

const Node = (props) => {
    const me = props.node.me
    if(me.isWall){
        return (
            <button onClick={() => console.log('I am wall')} className='w-10 h-10 bg-black'>
                
            </button> 
        )
    }
    
    return (
        <button  onClick={() => props.setOrigin()} className={props.cls}>
            {props.distance}
        </button>
    )
}
/*
let node = e.getMe()
                           
                            sorroundings.map((s) => {
                                if(e == s){
                                    console.log(s)
                                    return (
                                        <button onClick={() => console.log(e)} className='w-7 h-7 bg-red-700'>
                                            {node.id}
                                        </button>
                                    )
                                }
                            })
                            if(e ==  origin){
                                return (
                                    <button onClick={() => console.log(e)} className='w-3 h-3 bg-red-300'>
                                        {node.id}
                                    </button>
                                )
                            }
                            if(e == destination){
                                return (
                                    <button onClick={() => console.log(e)} className='w-3 h-3 bg-blue-300'>
                                        {node.id}
                                    </button>
                                )
                            }
                            if(node.isSearched){
                                return(
                                    <button onClick={() => console.log(e)} className='w-3 h-3 bg-green-300'>
                                        {node.id}
                                    </button>
                                )
                            }
                            
                            return (
                                <button onClick={() => test(node.x, node.y)} className={node.isOrigin ? 'w-3 h-3 bg-blue-200' : 'w-3 h-3 bg-slate-100'}>
                                    {node.id}
                                </button>
                                )
* */

export default Node