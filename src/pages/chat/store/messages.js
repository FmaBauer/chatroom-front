import { createSlice } from '@reduxjs/toolkit'
import request from '../../../lib/request'

const initialState = {}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state[action.payload.roomId] = action.payload.messages
    },
    addMessage: (state, action) => {
      state[action.payload.roomId].push(action.payload.message)
    },
  },
})

export const getMessages = () => async (dispatch, getState) => {
  const state = getState()
  let currentRoomId = state.chatrooms.currentRoomId
  const messages = await request('/messages', {room_id: currentRoomId})
  dispatch(setMessages({roomId: currentRoomId, messages}))
}

export const { setMessages, addMessage } = messagesSlice.actions

export default messagesSlice.reducer