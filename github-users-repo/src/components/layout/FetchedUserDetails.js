import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  Paper,
  Avatar,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Container,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import RepoList from "../repositories/RepoList";
import { getRepos } from "../../store/actions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function FetchedUserDetails(props) {
  const [showTimeline, setShowTimeline] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user);
  const userRepos = useSelector((state) => state.repos);
  const classes = useStyles();

  const handleClick = async () => {
    dispatch(getRepos(currentUser.login));
    setShowTimeline(true);
  };

  console.log("Repos: ", userRepos);
  return (
    <>
      <Container maxWidth="xs" style={{ marginTop: 25 }}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.avatarUrl}
              title="userAvatar"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.userBio}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                Total Repositories: {props.totalRepos}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="medium" color="primary" onClick={handleClick}>
              Generate Timeline
            </Button>
          </CardActions>
        </Card>
      </Container>
      {showTimeline && (
        <RepoList
          repos={userRepos}
          username={props.username}
          userUrl={props.html_url}
        />
      )}
    </>
  );
}
