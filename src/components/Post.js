import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import { likePost, unlikePost, deletePost } from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";
//icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteConfirm from "../util/DeleteConfirm";
const styles = theme => ({
  deletebtn: {
    position: "absolute",
    top: "0px",
    right: "0px"
  },
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    
  },
  content: {
    padding: 25,
    objectFit: "cover",
    position: "relative"
  }
});

class Post extends Component {
  islikedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.post.postId)
    ) {
      console.log("its been likedddd");
      return true;
    } else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };
  deletePost = () => {
    this.props.deletePost(this.props.post.postId, this.props.history);
  };

  render() {
    dayjs.extend(relativeTime);
    const { 
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;



    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorderIcon color="primary" />
        </Link>
      </MyButton>
    ) : this.islikedPost() ? (
      <MyButton tip="Unlike Post" onClick={this.unlikePost}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like Post" onClick={this.likePost}>
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    );

    const deleteButton =
      authenticated && handle === userHandle ? (
        <div className={classes.deletebtn}>
          <DeleteConfirm contentName ="Post" handleSubmit={this.deletePost} />
         
        </div>
      ) : null;

    const username =
      handle === userHandle ? (
        <Typography variant="h5" color="secondary">
          <Link to={`/users/${userHandle}`}>{userHandle}</Link>
        </Typography>
      ) : (
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
      );
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />

        <CardContent className={classes.content}>
          {username}
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <Link to={`/posts/${postId}`}>
              {" "}
              <ChatIcon color="primary" />
            </Link>
          </MyButton>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = {
  likePost,
  unlikePost,
  deletePost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
//cont at 4:57:49
