import './styles/Likes.css';
import { useDispatch, useSelector } from "react-redux";
import { incrementLikes, decrementLikes } from './redux/actions'

interface Likes {
    likes: number;
}

const Likes = () => {
    const dispatch = useDispatch();
    const likeNum = useSelector(state => {
        const { likesReducer }: any = state;
        return likesReducer.likes
    });

    return (
        <div className='buttons'>
            <button onClick={() => dispatch(incrementLikes())}>❤{likeNum}</button>
            <button onClick={() => dispatch(decrementLikes())}>Dislike</button>
        </div>
    )
}


export { Likes };