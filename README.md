## 选型介绍

最初使用 redux 做前端状态管理，后来因为引入 graphql 改用 apollo-client 作为请求库和状态存储，主要存储的是聊天室和消息数据。聊天功能通过 socket.io 与后端对接实现，新消息在界面上的更新通过更新 apollo-client 本地缓存实现。目前看起来 apollo-client 有能力作为本地状态管理使用，但还需要进一步调研。

后端选择轻量的 express，使用 apollo-server 定义实现 graphql 接口，使用轻量的 mongodb 包连接 mongo数据库，通过 socket.io 实现消息推送。

## 数据库结构如下

message: _id, sender_id, content, send_time, chatroom_id

chatroom: _id, title, members Array

user: _id, short_name, full_name, intro, avator_url