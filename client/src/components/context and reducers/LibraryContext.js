import { createContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth0();
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [abandoned, setAbandoned] = useState([]);

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
        setBacklog(data.data.backlog);
        setInProgress(data.data.newInProgressList);
        setCompleted(data.data.newCompletedList);
        setAbandoned(data.data.newAbandonedList);
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
        setBacklog(data.data.newBacklogList);
        setInProgress(data.data.newInProgressList);
        setCompleted(data.data.completed);
        setAbandoned(data.data.newAbandonedList);
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
        setBacklog(data.data.newBacklogList);
        setInProgress(data.data.inProgress);
        setCompleted(data.data.newCompletedList);
        setAbandoned(data.data.newAbandonedList);
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
        setBacklog(data.data.newBacklogList);
        setInProgress(data.data.newInProgressList);
        setCompleted(data.data.newCompletedList);
        setAbandoned(data.data.abandoned);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // check if the gameId exist in one of the categories, if yes, change the + sign to name of the category

  const findCategory = (gameId) => {
    if (backlog.includes(gameId)) {
      return "Backloged";
    } else if (inProgress.includes(gameId)) {
      return "Playing";
    } else if (completed.includes(gameId)) {
      return "Completed";
    } else if (abandoned.includes(gameId)) {
      return "Abandoned";
    }
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
        setInProgress,
        completed,
        setCompleted,
        abandoned,
        setAbandoned,
        findCategory,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
