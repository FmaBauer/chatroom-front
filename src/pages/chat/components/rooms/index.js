import './index.css'
import { useQuery } from '@apollo/client'
import { GET_CHATROOMS } from '../../../../lib/graphql'

function Rooms() {
  const { loading, error, data } = useQuery(GET_CHATROOMS)
  if (loading) {
    return <>loading...</>
  }
  return (
    <div className="rooms">
      <div className="rooms-search">

      </div>
      <div className="rooms-list">
        {
          data.chatrooms.map(room => {
            return (
              <div className="room-item">
                <div className="room-avator">
                  <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-1024.png" />
                </div>
                <div className="room-desc">
                  <div className="room-name">
                    {room.title}
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
