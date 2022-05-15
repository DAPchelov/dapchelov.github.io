
import List from '@mui/material/List';
import React from 'react';
import { ChatListItem } from './ChatListItem';


const ChatList = () => {
    
    const makeChatList = (props: number) => {
        let list = [];
        for (let i = 0; i < props; i++) {
            list.push(<ChatListItem name='testName' message='testMessge'/>);
        }
        return (list);
    }

    return (
        <div className='body-Frame-ChatList'>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
            >
                {makeChatList(4)}
            </List>
        </div>
    )
}

export { ChatList }