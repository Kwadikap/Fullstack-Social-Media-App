import React from 'react'
import './Homepage.css'
import Topbar from '../../components/topbar/Topbar'
import Leftbar from '../../components/leftbar/Leftbar.jsx';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar'

export default function Homepage() {
  return (
      <>
        <Topbar />
        <div className="homeContainer">
        <Leftbar />
        <Feed />
        <Rightbar />
        </div>
      </>
  )
}

