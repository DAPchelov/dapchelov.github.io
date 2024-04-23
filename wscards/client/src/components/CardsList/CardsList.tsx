import React, { useContext, useEffect } from 'react';
import Card from '../CardsList/Card'
import { Context } from '../App'
import { observer } from 'mobx-react-lite';
import { Paper } from '@mui/material';

const CardsList: React.FC = () => {
    const store = useContext(Context);

    useEffect(() => {
        store.receiveCards(store.getCurrentGroupId());
    }, [])

    return (
        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            padding: 1,
        }}>
            {store.getCards().length > 0 && store.getCards()
                .map(card => {
                    if (store.getIsCompletedDisplayMode() === undefined) {
                        return (
                            <Card key={card._id} _id={card._id} isAccepted={card.isAccepted} isCompleted={card.isCompleted} message={card.message} todos={card.todos} />
                        )
                    }
                    if (card.isCompleted === store.getIsCompletedDisplayMode()) {
                        return (
                            <Card key={card._id} _id={card._id} isAccepted={card.isAccepted} isCompleted={card.isCompleted} message={card.message} todos={card.todos} />
                        )
                    }
                })}
        </Paper>
    );
}
export default observer(CardsList);
