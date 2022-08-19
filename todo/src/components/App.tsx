import { useEffect, useState } from "react";
import InputForm from "./InputForm";
import SelectButtons from "./SelectButtons";
import ClearButton from "./ClearButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import Typography from '@mui/material/Typography';
import TodoList from './TodoList'
import { useNavigate, useSearchParams } from "react-router-dom";
import { gql, useQuery, useSubscription } from "@apollo/client";


interface ITask {
  _id?: string,
  __typename?: string,
  id: string,
  complete: boolean,
  content: string,
}

const App: React.FC = () => {
  const [taskArray, setTaskArray] = useState<ITask[]>([]);
  const [completed, setCompleted] = useState<boolean | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const UUID: string | null = searchParams.get('id');

  // get data from server
  const QUERY_MESSAGES = gql`
    query TasksCollection {
      tasks (UUID: "${UUID}") {
        id
        complete
        content
      }
    }
  `;

  const WS_TASKS = gql`
  subscription Subscription {
    newTasks (UUID: "${UUID}") {
      id
      complete
      content
    }
  }
  `;

  const queryData = useQuery(QUERY_MESSAGES);
  const { data } = useSubscription(WS_TASKS);

  useEffect(() => {
    if (!data && !queryData.data) {
      setTaskArray([]);
    } else
      if (data) {
        setTaskArray(data.newTasks);

      } else {
        setTaskArray(queryData.data.tasks);
      }
  }, [queryData, data]);

  const clearCompleted = () => {
    setTaskArray([...taskArray.filter(task => task.complete === false)]);
  };

  return (
    <Container maxWidth="sm" sx={{
      pt: "100px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Typography variant="h4" color="text.secondary" gutterBottom>
        TODOS
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <InputForm UUID={UUID} />
        <TodoList taskArray={taskArray} completed={completed} UUID={UUID} />
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography color="text.secondary" ml={1} sx={{ fontSize: 14 }}>
            {`${taskArray.filter(task => task.complete === false).length}`.concat(" items left")}
          </Typography>
          <SelectButtons setCompleted={setCompleted} completed={completed} />
          <ClearButton clearCompleted={clearCompleted} />
        </Paper>
      </Box>
    </Container>
  );
};

export type { ITask };
export { App };
