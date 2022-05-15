import '../styles/BodyFrame.css';

import Paper from '@mui/material/Paper';
import { ChatList } from './ChatList';

const BodyFrame = () => {
    return (
        <div className='body-Frame'>
            <Paper>Menu</Paper>
            <Paper className='body-Frame-ChatList'>
                <ChatList />
            </Paper>
        </div>
    )
}

export { BodyFrame }