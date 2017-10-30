import _ from 'lodash';
import {
  FETCH_FOLLOWING,
  LIKE_FOLLOWING_POST,
  COMMENT_FOLLOWING_POST,
  DELETE_COMMENT
} from '../actions/types';

const initialState = [{ _id: '', likes: [{ name: '' }], comments: [] }];

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_COMMENT:
      return state.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });
    case COMMENT_FOLLOWING_POST:
      const { post, comment } = action.payload;
      return state.map(element => {
        if (element._id === post._id) {
          post.comments = [...post.comments, comment];
          return post;
        } else {
          return element;
        }
      });
    case LIKE_FOLLOWING_POST:
      const newList = state.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });
      return newList;
    case FETCH_FOLLOWING:
      let posts = [];
      action.payload.forEach(user => {
        const postList = user.posts.map(post => {
          post.userName = user.firstName + ' ' + user.lastName;
          post.userAvatar = user.avatar;
          post.userId = user._id;
          return post;
        });
        posts = posts.concat(postList);
      });
      return _.shuffle(posts);
    default:
      return state;
  }
}
