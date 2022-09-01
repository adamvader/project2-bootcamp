import React, { useEffect, useState } from "react";
import { onChildAdded, ref as databaseRef } from "firebase/database";
import { database } from "./Firebase";
import "./NewsFeed.css";
import DisplayRating from "./DisplayRating";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const POSTS_FOLDER_NAME = "posts";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = databaseRef(database, POSTS_FOLDER_NAME);
    onChildAdded(postsRef, (data) => {
      const value = data.val();
      setPosts((state) => [
        ...state,
        {
          key: data.key,
          image: value.imageLink,
          author: value.authorEmail,
          caption: value.caption,
          comment: value.comment,
          location: value.locationName,
          rating: value.rating,
        },
      ]);
    });
  }, []);

  let postCards = posts.map((post) => (
    <Card
      sx={{ maxWidth: 390, height: 510 }}
      key={post.key}
      className="Card"
      variant="Outlined"
    >
      <CardHeader
        title={post.location}
        subheader={post.author}
        align="left"
        sx={{ mb: -1 }}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.image}
        alt="post-image"
        className="Card-Img"
      />
      <CardContent>
        <DisplayRating data={post.rating} />
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          sx={{ fontSize: 18 }}
        >
          Beer: {post.caption}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          sx={{ fontSize: 18 }}
        >
          Comment: {post.comment}
        </Typography>
      </CardContent>
    </Card>

    /*   <Card  key={post.key} className="Card">
      <Card.Img variant="top" src={post.image} className="Card-Img" />
      <DisplayRating data={post.rating} />
      <Card.Text>Beer: {post.caption}</Card.Text>
      <Card.Text>Comment: {post.comment}</Card.Text>
      <Card.Text>Location: {post.location}</Card.Text>
      <Card.Text>Author: {post.author}</Card.Text>
    </Card> */
  ));
  postCards.reverse();
  return postCards;
};

export default NewsFeed;
