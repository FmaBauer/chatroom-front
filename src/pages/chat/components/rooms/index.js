import './index.css'

function Rooms() {
  return (
    <div className="rooms">
      <div className="rooms-search">

      </div>
      <div className="rooms-list">
        <div className="room-item">
          <div className="room-avator">
            <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-1024.png" />
          </div>
          <div className="room-desc">
            <div className="room-name">
              Announcements
              <div className="room-latest-time">20:34</div>
            </div>
            <div className="room-message">Design guideline.pdf</div>
          </div>
        </div>
        <div className="room-item">
          <div className="room-avator">
            <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-1024.png" />
          </div>
          <div className="room-desc">
            <div className="room-name">
              Announcements
              <div className="room-latest-time">20:34</div>
            </div>
            <div className="room-message">Design guideline.pdf</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rooms
