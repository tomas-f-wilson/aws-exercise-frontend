import React from "react";

import axios from "axios";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

import Content from "./components/Table";
import AddUserModal from "./components/AddUserModal";
import { UserData } from "./components/common/interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "100px",
    },
    fab: {
      margin: theme.spacing(1),
      position: "fixed",
      right: 20,
      bottom: 20,
    },
  })
);

type UserAttributes = {
  id: number;
  username: string;
  email: string;
};

const apiUrl = process.env.REACT_APP_API_URL;

const App = () => {
  const [users, setUsers] = React.useState<UserAttributes[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<number | null>(null);
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<UserData>({
    email: "",
    username: "",
  });

  const classes = useStyles();

  const fetchUsers = async () => {
    const {
      data: { data },
    } = await axios.get(`${apiUrl}/users`);
    setUsers(data);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const openEditModal = (e: any) => {
    setEditMode(true);
    setUserId(e.id);
    setUserData({ email: e.email, username: e.username });
    setOpen(true);
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditMode(false);
    setUserData({
      email: "",
      username: "",
    });
    setUserId(null);
  };

  const handleChange = (e: any) => {
    setUserData({ ...userData, email: e.email, username: e.username });
  };

  const submitNewUser = async () => {
    if (!userData.email && !userData.username) {
      return;
    }

    try {
      const {
        data: { data },
      } = await axios.post(`${apiUrl}/users`, userData);

      setUsers([...users, data]);
      closeModal();
    } catch (error) {
      console.error(`[Error]: ${error}`);
    }
  };

  const submitEditUser = async () => {
    if (!userData.email && !userData.username) {
      return;
    }

    try {
      await axios.put(`${apiUrl}/users/${userId}`, userData);

      fetchUsers();
      closeModal();
    } catch (error) {
      console.error(`[Error]: ${error}`);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      fetchUsers();

      closeModal();
    } catch (error) {
      console.error(`[Error]: ${error}`);
    }
  };

  return (
    <Container className={classes.root}>
      <Content users={users} getValues={openEditModal} />
      <AddUserModal
        onSubmit={editMode ? submitEditUser : submitNewUser}
        isOpen={open}
        handleClose={closeModal}
        getValues={handleChange}
        email={userData.email}
        username={userData.username}
        editMode={editMode}
        onDelete={deleteUser}
      />
      <Tooltip title="Add user">
        <Fab
          onClick={openModal}
          color="primary"
          aria-label="add"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  );
};

export default App;
