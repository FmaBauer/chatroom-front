import './index.css'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { io } from 'socket.io-client'
import { apolloClient } from '../../../../index'
import { GET_MESSAGES, GET_CHATROOMS } from '../../../../lib/graphql'
import quoteIcon from '../../../../images/quote.png'

const socket = io("ws://localhost:4000")
socket.on('chat message', function(msg) {
  console.log('message received', msg)
  updateNewMsg(msg)
})

function updateNewMsg(msg) {
  const data = apolloClient.readQuery({
    query: GET_MESSAGES, variables: { chatroomId: msg.roomId }
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
    variables: { chatroomId: msg.roomId },
  })
}

function Chatroom(props) {
  const { roomId } = props
  const [ msg, setMsg ] = useState('')
  const [ metion, setMetion ] = useState(false)
  const [ quoteMsg, setQuoteMsg ] = useState({})
  const userId = '63c69c5172c2f53743ad68f9'
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { chatroomId: roomId },
  })
  const { loading: chatroomLoading, data: roomData } = useQuery(GET_CHATROOMS)
  if (loading || chatroomLoading) {
    return <>loading...</>
  }
  if (error) {
    return <>error encoutered...</>
  }
  let thisRoom = roomData.chatrooms.filter(room => room._id === roomId)[0]
  const onMsgKeyDown = (e) => {
    if (e.keyCode === 13) {
      let message = { msg, userId, roomId: roomId }
      if (quoteMsg._id) {
        message.quoteMsgId = quoteMsg._id
      }
      socket.emit('chat message', message)
      updateNewMsg({ msg, userId, roomId: roomId })
      setMsg('')
      setQuoteMsg({})
    }
  }
  const onMsgChange = (e) => {
    let value = e.target.value
    setMsg(value)
    if (value.indexOf('@') >= 0) {
      let input = value.slice(value.indexOf('@')+1)
      let targets = thisRoom.members.filter(
        m => m.short_name.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
      if (targets.length > 0) {
        setMetion(targets[0])
      }
    } else {
      setMetion({})
    }
  }
  const quote = (msg) => {
    setQuoteMsg(msg)
  }
  const setThisMetion = () => {
    let input = msg.slice(msg.indexOf('@')+1)
    setMsg(msg.replace(input, metion.short_name))
    setMetion({})
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
            let self = message.sender._id === userId
            let extraClass = self ? 'self' : ''
            return (
              <div key={message._id} className={`message-wrapper ${extraClass}`}>
                <div className="message-avator"><img src={message.sender.avator_url} /></div>
                <div className="message-content-wrapper">
                  <div className="message-title">
                    <span>{message.sender.full_name}</span> <span>{(dayjs(message.send_time-0)).format('HH:mm')}</span>
                  </div>
                  <div className="message-content">
                    {message.content}
                    {self ? null : <div className="message-toolkit" onClick={()=>quote(message)}>
                      <span><img src={quoteIcon} /></span>
                    </div>}
                  </div>
                  {message.quote_message && message.quote_message._id ? <div className="message-quote">
                    {message.quote_message.content.slice(0, 80)+'...'}
                  </div> : null}
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="chatroom-input">
        <div className={'metion-tip' + (metion._id ? '' : ' hidden')}
          onClick={setThisMetion}>
          {metion.full_name}
        </div>
        <textarea value={msg} onChange={onMsgChange} onKeyDown={onMsgKeyDown} />
        {
          quoteMsg._id
          ? <div className='quotemsg'>{`${quoteMsg.content.slice(0, 60)}...`}</div>
          : null
        }
      </div>
    </div>
  )
}

export default Chatroom
