import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';

import useStyles from './styles'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'));

    let isGoogleId
    let isCustomId
    if (user) {
        isGoogleId = user.result.googleId
        isCustomId = user.result._id
    } // ?. cause error

    const openPost = () => {
        history.push(`posts/${post._id}`)
    }

    const Likes = () => {

        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (isGoogleId || isCustomId))
            ? (
              <React.Fragment><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</React.Fragment>
            ) : (
              <React.Fragment><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</React.Fragment>
            );
        }
    
        return <React.Fragment><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</React.Fragment>;
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
            
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {
                    (isGoogleId === post.creator || isCustomId === post.creator) && (
                        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize="small" /> Delete
                        </Button>
                    )
                }
                {
                    (isGoogleId === post.creator || isCustomId === post.creator) && (
                        <div className={classes.overlay2}>
                            <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
                        </div>
                    )
                }  
                
            </CardActions>
        </Card>
    )
}

export default Post