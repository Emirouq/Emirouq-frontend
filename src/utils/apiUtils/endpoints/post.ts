import defaults from './defaults'

const post = {
  getPosts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/post',
    },
  },
 
 
}

export default post
