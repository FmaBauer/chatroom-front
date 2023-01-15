import { configureStore } from '@reduxjs/toolkit'
import chatroomsSlice from './pages/chat/store/chatrooms'
import messagesSlice from './pages/chat/store/messages'

export const store = configureStore({
  reducer: {
    chatrooms: chatroomsSlice,
    messages: messagesSlice,
  },
})