import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth0();
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [abandoned, setAbandoned] = useState([]);
  const [fetchCategory, setFetchCategory] = useState(false);

  // get user
  useEffect(() => {
    if (user) {
      setFetchCategory(false);
      const headers = { email: user.email };
      fetch("/api/user", { headers })
        .then((res) => res.json())
        .then((data) => {
          setBacklog(data.data.backlog);
          console.log(data.data);
          setCompleted(data.data.completed);
          setInProgress(data.data.inProgress);
          setAbandoned(data.data.abandoned);
          setFetchCategory(true);
        })
        .catch((error) => console.log(error));
    } else if (!user) {
      setFetchCategory(true);
      setBacklog([]);
      setInProgress([]);
      setCompleted([]);
      setAbandoned([]);
    }
  }, [user]);

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
    } else {
      return null;
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
        fetchCategory,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
