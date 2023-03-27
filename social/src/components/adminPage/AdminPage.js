import React from 'react'
import "./Admin.css"
import Navigation from '../navigation/Navigation'

export default function AdminPage(){
    return (
        <div className="page">
            <div className="left-sidebar">
                <div>
                    
                </div>
                <Navigation></Navigation>
            </div>
            <div className="main">
                <div className='bubble'>
                
                </div>
            </div>
            <div className="right-sidebar">
                <div className='bubble'>
                
                </div>
            </div>
        </div>
    );
}