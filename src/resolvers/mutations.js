const buildMutations = (db) => {
    const Posts = db.collection('posts')
    const Comments = db.collection('comments')
    
    return {
        createPost: async (root, args, context, info) => {
          const res = await Posts.insert(args)
          return await Posts.findOne({_id: res.insertedIds[1]})
        },
        createComment: async (root, args) => {
          const res = await Comments.insert(args)
          return await Comments.findOne({_id: res.insertedIds[1]})
        },
    }
}

module.exports = {buildMutations}