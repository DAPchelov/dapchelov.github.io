import React from 'react'
import './styles/Likes.css';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';

interface Likes {
    likes: number;
}

const Likes: React.FC<Likes> = (props: any) => {
    console.log('render > ', props);
    return (
        <div className='buttons'>
            <button onClick={props.onIncrementLikes}>❤{props.likes}</button>
            <button onClick={props.onDecrementLikes}>Dislike</button>
        </div>
    )
}

function mapStateToProps(state: any) {
    console.log ('mapStateToProps > ', state);
    return {
        likes: state.likes
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        onIncrementLikes: () => {
            const action = {
                type: 'INCREMENT'
            };
            dispatch (action);
        },
        onDecrementLikes: () => {
            const action = {
                type: 'DECREMENT'
            };
            dispatch (action);
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Likes);