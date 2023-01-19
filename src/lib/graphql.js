import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  query getMessages($chatroomId: ID!) {
    messages(chatroomId: $chatroomId) {
      _id
      content
      send_time
      sender {
        full_name
        _id
        avator_url
      }
      quote_message {
        content
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
        _id
        full_name
        short_name
      }
    }
  }
`