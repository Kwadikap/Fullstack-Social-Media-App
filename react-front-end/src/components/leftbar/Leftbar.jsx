import React from 'react'
import './leftbar.css'
import { RssFeed, CompassCalibrationOutlined, Notifications, Settings, ChatOutlined } from '@material-ui/icons';
import { Users } from  '../../dummyData'
import CloseFriends from '../closeFriends/CloseFriends'





export default function Leftbar() {
  return (
    <div className='leftbar'>
      <div className="leftbarWrapper">
        <ul className="leftbarList">
            <li className="leftbarListItem">
              <RssFeed className='leftbarIcon'/>
              <span className="leftbarListItemText">Feed</span>
            </li>
            <li className="leftbarListItem">
              <ChatOutlined className='leftbarIcon'/>
              <span className="leftbarListItemText">Chats</span>
            </li>
            <li className="leftbarListItem">
              <CompassCalibrationOutlined className='leftbarIcon'/>
              <span className="leftbarListItemText">Explore</span>
            </li>
            <li className="leftbarListItem">
              <Notifications className='leftbarIcon'/>
              <span className="leftbarListItemText">Notifications</span>
            </li>
            <li className="leftbarListItem">
              <Settings className='leftbarIcon'/>
              <span className="leftbarListItemText">Settings</span>
            </li>
        </ul>
        <button className='leftbarButton'>Show More</button>
        <hr className='leftbarHr' />
        <ul className='leftbarFriendList'>
            {Users.map((u) => (
              <CloseFriends key={u.id} user={u} />
            ))}
        </ul>
      </div>
    </div>
  )
}
 