import { createSlice } from '@reduxjs/toolkit'
import request from '../../../lib/request'

const initialState = {
  rooms: [],
  current_room_id: 1
}

export const chatroomsSlice = createSlice({
  name: 'chatrooms',
  initialState,
  reducers: {
    setChatrooms: (state, action) => {
      state.rooms = action.payload
    },
    addChatroom: (state, action) => {
      state.rooms.push(action.payload.chatroom)
    },
  },
})

export const getChatrooms = (roomId) => async (dispatch) => {
  const chatrooms = await request('/chatrooms')
  dispatch(setChatrooms(chatrooms))
}

export const { setChatrooms, addChatroom } = chatroomsSlice.actions

export default chatroomsSlice.reducer