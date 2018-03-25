const buildQuery = (db) => {

    const Posts = db.collection('posts')
    const Comments = db.collection('comments')

    return {
        post: async (root, {_id}) => {
          return await Posts.findOne(ObjectId(_id))
        },
        posts: async () => {
          return (await Posts.find({}).toArray())
        },
        comment: async (root, {_id}) => {
          return await Comments.findOne(ObjectId(_id))
        },
        lastPosts: async (root, {last}) => {
          let allPosts = (await Posts.find({}).toArray())
          return allPosts.slice(allPosts.length - last, allPosts.length)
        }
    }
}

module.exports = {buildQuery}