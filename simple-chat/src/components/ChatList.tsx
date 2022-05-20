import { gql, useQuery } from "@apollo/client";
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
                        query {
                            messages {
                              id
                              user
                              content
                            }
                          }`

    const Messages = () => {
        const { data } = useQuery(GET_MESSAGES, {
        });
        if (!data) {
            return null;
        }
        return (data.messages.map(({ id, user, content }: Imessage) => (
            <ChatListItem key={id} name={user} message={content} />)))
    }

    return (
        <div className="bodyFrame-ChatList">
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <Messages />
            </List>
        </div>
    );
};

export { ChatList };
