import List from "@mui/material/List";
import React, { useEffect, useState } from "react";
import { ChatListItem } from "./ChatListItem";

const ChatList = () => {
  interface Imessage {
    id: number;
    name: string;
    text: string;
  }

  const MakeChatList = () => {
    const [messagesList, setMessagesList] = useState<Imessage[]>([]);

    useEffect(() => {
      const response = fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: `{
                            messages {
                              id
                              name
                              text
                            }
                          }`
        })
      })
        .then(response => response.json())
        .then(json => setMessagesList(json.data.messages));
    }, []);
    let list = [];
    if (messagesList == undefined) {
      list.push(<ChatListItem name="Loading" message="Loading" />);
      return list;
    } else {
      for (let i = 0; i < messagesList.length; i++) {
        list.push(
          <ChatListItem
            key={messagesList[i].id}
            name={messagesList[i].name}
            message={messagesList[i].text}
          />
        );
      }
    }

    return list;
  };

  return (
    <div className="bodyFrame-ChatList">
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper"
        }}
      >
        {MakeChatList()}
      </List>
    </div>
  );
};

export { ChatList };
