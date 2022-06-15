import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

interface IPropsInputForm {
  addProp: (value: string) => void;
}

const InputForm: React.FC<IPropsInputForm> = (props: IPropsInputForm) => {
  let textToAdd = "";

  const onPush = (keyKode: string) => {
    if (keyKode === "Enter" && textToAdd.length > 0) {
      props.addProp(textToAdd);
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
        onKeyUp={event => onPush(event.key )}
        sx={{ width: "100%" }}
      />
    </Paper>
  );
};

export default InputForm;
