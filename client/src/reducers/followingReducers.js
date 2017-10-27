import _ from 'lodash';
import { FETCH_FOLLOWING } from '../actions/types';

const initialState = [{ likes: [{ name: '' }], comments: [] }];

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FOLLOWING:
      let posts = [];
      action.payload.forEach(user => {
        const postList = user.posts.map(post => {
          post.userName = user.firstName + ' ' + user.lastName;
          post.userAvatar = user.avatar;
          return post;
        })
        posts = posts.concat(postList);
      });
      return _.shuffle(posts);
    default:
      return state;
  }
}
