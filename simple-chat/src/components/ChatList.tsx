import { gql, useQuery, useSubscription } from "@apollo/client";
import List from "@mui/material/List";
import { ChatListItem } from "./ChatListItem";

import "../styles/ChatList.css";

const ChatList = () => {
  interface Imessage {
    id: number;
    user: string;
    content: string;
  }

  const WS_MESSAGES = gql`
    subscription Subscription {
      newMessages {
        id
        user
        content
      }
    }
  `;

  const QUERY_MESSAGES = gql`
    query GetMessages {
      messages {
        id
        user
        content
      }
    }
  `;

  const queryData = useQuery(QUERY_MESSAGES);

  const { data } = useSubscription(WS_MESSAGES);

  const Messages = () => {
    if (!data && !queryData.data) {
      return null;
    }
    if (!data) {
      return queryData.data.messages.map(({ id, user, content }: Imessage) => (
        <ChatListItem key={id} name={user} message={content} />
      ));
    }
    return data.newMessages.map(({ id, user, content }: Imessage) => (
      <ChatListItem key={id} name={user} message={content} />
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
