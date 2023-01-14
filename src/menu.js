import forumIcon from './images/forum.png'
import chatIcon from './images/chat.png'
import matchIcon from './images/matches.png'
import membersIcon from './images/members.png'
import contributorsIcon from './images/contributors.png'
import { Link } from 'react-router-dom'

function Menu() {
  return (
    <div className="menu">
      <div className="menu-engage menu-group">
        <div className="menu-group-title">Engage</div>
        <div className="menu-items">
          <div className="menu-item">
            <Link to="/forum"><img src={forumIcon} />Forum</Link>
          </div>
          <div className="menu-item">
            <Link to="/"><img src={chatIcon} />Chat</Link>
          </div>
          <div className="menu-item">
            <Link to="/matches"><img src={matchIcon} />Matches</Link>
          </div>
        </div>
      </div>
      <div className="menu-people menu-group">
        <div className="menu-group-title">Engage</div>
        <div className="menu-items">
          <div className="menu-item">
            <img src={membersIcon} />Members
          </div>
          <div className="menu-item">
            <img src={contributorsIcon} />Contributors
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
