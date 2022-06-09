import { createContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth0();
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [abondoned, setAbandoned] = useState([]);

  // saving the game on backlog list
  const handleBacklog = (gameId) => {
    fetch("/api/add-backlog", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user, gameId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBacklog(data.backlog);
        setInProgress(data.newInProgressList);
        setCompleted(data.newCompletedList);
        setAbandoned(data.newAbandonedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // saving the game on completed list
  const handleCompleted = (gameId) => {
    fetch("/api/add-completed", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user, gameId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBacklog(data.newBacklogList);
        setInProgress(data.newInProgressList);
        setCompleted(data.completed);
        setAbandoned(data.newAbandonedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // saving the game on in progress list
  const handleInProgress = (gameId) => {
    fetch("/api/add-inProgress", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user, gameId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBacklog(data.newBacklogList);
        setInProgress(data.inProgress);
        setCompleted(data.newCompletedList);
        setAbandoned(data.newAbandonedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // saving the game on abandoned list
  const handleAbandoned = (gameId) => {
    fetch("/api/add-abandoned", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user, gameId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBacklog(data.newBacklogList);
        setInProgress(data.newInProgressList);
        setCompleted(data.newCompletedList);
        setAbandoned(data.abandoned);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <LibraryContext.Provider
      value={{
        handleBacklog,
        handleCompleted,
        handleInProgress,
        handleAbandoned,
        backlog,
        setBacklog,
        inProgress,
        completed,
        abondoned,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
