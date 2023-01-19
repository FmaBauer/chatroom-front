import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  query getMessages($chatroomId: ID!) {
    messages(chatroomId: $chatroomId) {
      content
      send_time
      sender {
        full_name
        _id
      }
    }
  }
`

export const GET_CHATROOMS = gql`
  query getChatrooms {
    chatrooms {
      _id
      title
      members {
        full_name
        short_name
      }
    }
  }
`