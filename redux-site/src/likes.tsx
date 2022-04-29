import React from 'react'
import './styles/Likes.css';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { incrementLikes, decrementLikes } from './redux/actions'

interface Likes {
    likes: number;
}

const Likes = (props: any) => {
    console.log('render > ', props);
    return (
        <div className='buttons'>
            <button onClick={props.onIncrementLikes}>❤{props.likes}</button>
            <button onClick={props.onDecrementLikes}>Dislike</button>
        </div>
    )
}

function mapStateToProps(state: any) {
    console.log('mapStateToProps > ', state);
    const { likesReducer } = state;
    return {
        likes: likesReducer.likes
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        onIncrementLikes: () => {dispatch(incrementLikes())},
        onDecrementLikes: () => {dispatch(decrementLikes())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Likes);