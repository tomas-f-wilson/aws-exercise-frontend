import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { UserData } from "../common/interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    input: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "column",
      width: "100%",
      gap: 5,
      "& > *": {
        margin: theme.spacing(1),
        with: "100%",
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      borderRadius: 15,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
      outline: "none",
    },
    deleteIcon: {
      width: 30,
    },
  })
);

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  getValues: ({ email, username }: { email: string; username: string }) => void;
  onSubmit: () => void;
  onDelete: () => void;
  email?: string;
  username?: string;
  editMode: boolean;
};

const AddUserModal: React.FunctionComponent<Props> = ({
  isOpen,
  handleClose,
  getValues,
  onSubmit,
  email,
  username,
  editMode,
  onDelete,
}) => {
  const [userData, setUserData] = React.useState<UserData>({
    email: "",
    username: "",
  });
  const classes = useStyles();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    getValues(userData);
  }, [userData]);

  React.useEffect(() => {
    if (email && username) {
      setUserData({ email, username });
    } else if (email && !username) {
      setUserData({ email, username: "" });
    } else if (!email && username) setUserData({ email: "", username });
    else {
      setUserData({ email: "", username: "" });
    }
  }, [email, username]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Create User</h2>
            <form className={classes.form} noValidate>
              <div className={classes.input}>
                <TextField
                  type="text"
                  label="User name"
                  variant="outlined"
                  onChange={onChange}
                  name="username"
                  value={username || userData.username}
                />
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  onChange={onChange}
                  name="email"
                  value={email || userData.email}
                />
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={onSubmit}>
                Create
              </Button>
              {editMode && (
                <Button className={classes.deleteIcon} onClick={onDelete}>
                  <DeleteForeverIcon />
                </Button>
              )}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddUserModal;
