import './index.css'
import { useQuery } from '@apollo/client'
import { GET_CHATROOMS } from '../../../../lib/graphql'
import searchIcon from '../../../../images/search.png'
import { useEffect } from 'react'

function Rooms(props) {
  const { loading, error, data } = useQuery(GET_CHATROOMS)
  const { roomId, setRoomId } = props
  useEffect(() => {
    if (!loading && !error) {
      setRoomId(data.chatrooms && data.chatrooms[0]._id)
    }
  }, [loading])
  if (loading) {
    return <>loading...</>
  }
  if (error) {
    return <>error encoutered...</>
  }
  return (
    <div className="rooms">
      <div className="rooms-search">
        <img src={searchIcon} />Search
      </div>
      <div className="rooms-list">
        {
          data.chatrooms.map(room => {
            return (
              <div className={'room-item' + (room._id === roomId ? ' current' : '')}
                onClick={() => setRoomId(room._id)}>
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
