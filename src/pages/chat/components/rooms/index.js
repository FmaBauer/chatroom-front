import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getChatrooms } from '../../store/chatrooms'

function Rooms() {
  const chatrooms = useSelector((state) => state.chatrooms.rooms)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getChatrooms())
  }, [])
  return (
    <div className="rooms">
      <div className="rooms-search">

      </div>
      <div className="rooms-list">
        {
          chatrooms.map(room => {
            return (
              <div className="room-item">
                <div className="room-avator">
                  <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-1024.png" />
                </div>
                <div className="room-desc">
                  <div className="room-name">
                    {room.name}
                    <div className="room-latest-time">{room.last_message_time}</div>
                  </div>
                  <div className="room-message">{room.last_message}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Rooms
