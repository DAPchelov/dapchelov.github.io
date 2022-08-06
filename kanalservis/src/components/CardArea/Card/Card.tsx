import './Card.css';
import type { TPost, TUser, TPhoto } from '../CardArea';

interface IPropsPost {
    post: TPost;
    user: TUser | undefined;
    photo: TPhoto;
};

const Card: React.FC<IPropsPost> = (props: IPropsPost) => {
    return (
        <div className='Card'>
            <div className='Card-header'>
                <div className='Card-image'>
                    <img src={props.photo?.thumbnailUrl} alt='photo' />
                </div>
                <div className='Header-annotation'>
                    <div className='Header-item'>
                        Autor: {props.user?.name}
                    </div>
                    <div className='Header-item'>
                        Company: {props.user?.company.name}
                    </div>
                </div>
            </div>
            <div className='Card-annotation'>
                Title:{props.post.title}
            </div>
            <div className='Description'>
                {props.post.body}
            </div>
        </div>
    );
}

export default Card;