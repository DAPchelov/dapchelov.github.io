import './CardArea.css'
import Card from './Card/Card';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IPropsCardArea {
    userLogin: string | undefined;
};
type TUser = {
    id: number;
    name: string;
    company: {
        name: string;
    }
}
type TPost = {
    userId: number;
    id: number;
    title: string;
    body: string;
};
type TPhoto = {
    thumbnailUrl: string;
};

const CardArea: React.FC<IPropsCardArea> = (props: IPropsCardArea) => {
    const [user, setUser] = useState<TUser>();
    const [posts, setPosts] = useState<TPost[]>([]);
    const [photos, setPhotos] = useState<TPhoto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (props.userLogin === undefined) && navigate("../", { replace: true });
    })

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users?username=${props.userLogin}`)
            .then(response => response.json())
            .then(json => setUser(json[0]))
    }, [props.userLogin]);

    useEffect(() => {
        if (user) {
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                .then(response => response.json())
                .then(json => setPosts(json))
            fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${user.id}`)
                .then(response => response.json())
                .then(json => setPhotos(json))
        }
    }, [user]);

    return (
        <div className='CardArea'>
            {posts.map((post) => <Card key={post.id} user={user} post={post} photo={photos[post.userId]} />)}
        </div>
    );
}
export type { TPost, TUser, TPhoto };
export default CardArea;