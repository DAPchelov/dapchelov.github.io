import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const InputForm = ({ addProp }) => {
  let textToAdd = "";

  const onPush = key => {
    if (key.keyCode === 13 && textToAdd.length > 0) {
      addProp(textToAdd);
    }
  };

  return (
    <Paper elevation={1}>
      <TextField
        id="filled-basic"
        label="What needs to be done? (press Enter to add Task)"
        variant="filled"
        onChange={event => {
          textToAdd = event.target.value;
        }}
        onKeyUp={key => onPush(key)}
        sx={{ width: "100%" }}
      />
    </Paper>
  );
};

export default InputForm;
