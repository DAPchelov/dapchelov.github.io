import Stack from '@mui/material/Stack';
import React, { useContext, useEffect } from 'react';
import Card from './Card'
import { Context } from '../index'
import { observer } from 'mobx-react-lite';
import LoadingCard from './LoadingCard';

const CardsList: React.FC = () => {
    const store = useContext(Context);
    
    useEffect(() => {
        store.receiveCards();
      }, [])
    
    return (
        <Stack>
            {!store.getIsCardsLoading() ? store.getCards()
                .map(card => {
                    if (store.getIsCompletedDisplayMode() === undefined) {
                        return (
                            <Card key={card._id} _id={card._id} isAccepted={card.isAccepted} isCompleted={card.isCompleted} message={card.message} todos={card.todos}/>
                        )
                    }
                    if (card.isCompleted === store.getIsCompletedDisplayMode()) {
                        return (
                            <Card key={card._id} _id={card._id} isAccepted={card.isAccepted} isCompleted={card.isCompleted} message={card.message} todos={card.todos}/>
                        )
                    }
                }) : <LoadingCard />}
        </Stack>
    );
}

export default observer(CardsList);
