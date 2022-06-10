import { PostLine } from "./PostLine";
import { Post } from "./Post";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useEffect } from "react";
import { fetchPosts } from "store/action-creators/post";
import { PostActionTypes } from "../types/posts";

const nullResponse: string = "Response is null";

interface PropsPostList {
  postsList: Post[];
}

const PostsList: React.FC<PropsPostList> = (props: PropsPostList) => {
  const { posts, error, loading } = useTypedSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: PostActionTypes.FETCH_POSTS });
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json =>
        dispatch({ type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: json })
      );
  }, []);

  const deletePost = (remPost: Post) => {
    if (posts != null && posts.length > 0) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${remPost.id}`, {
        method: "DELETE"
      }).then(() =>
        dispatch({
          type: PostActionTypes.DELETE_POST,
          payload: posts.filter(post => post !== remPost)
        })
      );
    } else {
      console.log("Пост не существует!");
    }
    console.log(posts);
  };

  if (loading) {
    return (
      <div className={"list"}>
        <div className={"postLine"}>Загрузка постов...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={"list"}>
        <div className={"postLine"}>{error}</div>
      </div>
    );
  }

  return (
    <div className={"list"}>
      {posts.map(post => (
        <div className={"postLine"}>
          <PostLine propsPost={post} key={post.id} />
          <div className={"trashBt"} onClick={() => deletePost(post)} />
        </div>
      ))}
    </div>
  );
};
export { PostsList };
