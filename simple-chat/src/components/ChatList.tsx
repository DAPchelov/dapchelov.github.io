import { gql, useQuery, useSubscription } from "@apollo/client";
import { Container } from "@mui/material";
import List from "@mui/material/List";
import React, { useEffect, useState } from "react";
import { ChatListItem } from "./ChatListItem";

import "../styles/ChatList.css";

const ChatList = () => {
  interface Imessage {
    id: number;
    user: string;
    content: string;
  }

  const GET_MESSAGES = gql`
    subscription Subscription {
      newMessages {
        id
        user
        content
      }
    }
  `;

  const Messages = () => {
    const { data } = useSubscription(GET_MESSAGES);
    if (!data) {
      return null;
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
