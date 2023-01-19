import './index.css'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { io } from 'socket.io-client'
import { apolloClient } from '../../../../index'
import { GET_MESSAGES, GET_CHATROOMS } from '../../../../lib/graphql'

const currentRoomId = '63c69d5d72c2f53743ad68ff'  // 暂时hardcode，TODO:根据房间切换从本地状态层获取

const socket = io("ws://localhost:4000")
socket.on('chat message', function(msg) {
  console.log('message received', msg)
  updateNewMsg(msg)
})

function updateNewMsg(msg) {
  const data = apolloClient.readQuery({
    query: GET_MESSAGES, variables: { chatroomId: currentRoomId }
  })
  const myNewMsg = {
    content: msg.msg,
    send_time: msg.send_time || new Date().getTime(),
    // 暂时hardcode，后续需要区分服务端推送和本地调用，服务端需要返回用户信息
    sender: {
      full_name: 'Jenny White'
    }
  }
  apolloClient.writeQuery({
    query: GET_MESSAGES,
    data: {
      messages: [...data.messages, myNewMsg],
    },
    variables: { chatroomId: currentRoomId },
  })
}

function Chatroom() {
  const [ msg, setMsg ] = useState('')
  const userId = '63c69c5172c2f53743ad68f9'
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { chatroomId: currentRoomId },
  })
  const { loading: chatroomLoading, data: roomData } = useQuery(GET_CHATROOMS)
  if (loading || chatroomLoading) {
    return <>loading...</>
  }
  let thisRoom = roomData.chatrooms.filter(room => room._id === currentRoomId)[0]
  const onMsgKeyDown = (e) => {
    if (e.keyCode === 13) {
      socket.emit('chat message', { msg, userId, roomId: currentRoomId })
      updateNewMsg({ msg, userId, roomId: currentRoomId })
    }
  }
  const onMsgChange = (e) => {
    setMsg(e.target.value)
  }
  return (
    <div className="chatroom">
      <div className="chatroom-header">
        <div className="chatroom-title">{thisRoom.title}</div>
        <div className="chatroom-members">{thisRoom.members.length}</div>
      </div>
      <div className="chatroom-content">
        {
          data.messages.map(message => {
            let extraClass = message.sender._id === userId ? 'self' : ''
            return (
              <div className={`message-wrapper ${extraClass}`}>
                <div className="message-avator"></div>
                <div className="message-content-wrapper">
                  <div className="message-title">
                    <span>{message.sender.full_name}</span><span>{(dayjs(message.send_time-0)).format('HH:mm')}</span>
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="chatroom-input">
        <textarea onChange={onMsgChange} onKeyDown={onMsgKeyDown} />
      </div>
    </div>
  )
}

export default Chatroom
