import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags }));

      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keycode === 13) {
      searchPost();
    }
  };

  const handleKeyPressTags = (tag) => {
    return setTags(tag.target.value);
  };

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Experiences"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TextField
                name="tags"
                variant="outlined"
                label="Search Tags"
                onKeyPress={handleKeyPressTags}
                fullWidth
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
