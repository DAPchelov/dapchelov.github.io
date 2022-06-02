import { gql, useQuery, useSubscription } from "@apollo/client";
import List from "@mui/material/List";
import { ChatListItem } from "./ChatListItem";

import "../styles/ChatList.css";

const ChatList = () => {
  interface Imessage {
    _id: string;
    user: string;
    content: string;
  }

  const WS_MESSAGES = gql`
    subscription Subscription {
      newMessages {
        _id
        user
        content
      }
    }
  `;

  const QUERY_MESSAGES = gql`
    query GetMessages {
      messages {
        _id
        user
        content
      }
    }
  `;

  const queryData = useQuery(QUERY_MESSAGES);
  console.log("queryData", queryData);

  const { data } = useSubscription(WS_MESSAGES);
  console.log("wsData", data);

  const Messages = () => {
    if (!data && !queryData.data) {
      return null;
    }
    if (!data) {
      return queryData.data.messages.map(({ _id, user, content }: Imessage) => (
        <ChatListItem key={_id} user={user} content={content} />
      ));
    }
    return data.newMessages.map(({ _id, user, content }: Imessage) => (
      <ChatListItem key={_id} user={user} content={content} />
    ));
  };

  return (
    <div className="bodyFrame-ChatList">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <Messages />
      </List>
    </div>
  );
};

export { ChatList };
