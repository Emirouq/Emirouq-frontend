import defaults from './defaults'

const post = {
  getPosts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/post',
    },
  },
  updateStatus:{
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/post/updateStatus/:id',
    },
  }
 
 
}

export default post
