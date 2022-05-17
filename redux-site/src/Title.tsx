import { ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputText } from "./redux/actions";

const Title = () => {
  const dispatch = useDispatch();
  const text = useSelector(state => {
    const { inputReducer }: any = state;
    return inputReducer.text;
  });
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(inputText(event.target.value));
    },
    []
  );

  return (
    <div className="cartTitle">
      <div className="cartTitleTop">
        <textarea className={"title"} onChange={handleChange} />
      </div>
      <p>{text}</p>
    </div>
  );
};

export { Title };
