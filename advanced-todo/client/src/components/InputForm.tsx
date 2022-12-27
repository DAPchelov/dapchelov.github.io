import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";


const InputForm: React.FC = () => {
  

  return (
    <Paper elevation={1}>
      <TextField
        id="filled-basic"
        label="What needs to be done? (press Enter to add Task)"
        variant="filled"
        sx={{ width: "100%" }}
      />
    </Paper>
  );
};

export default InputForm;
