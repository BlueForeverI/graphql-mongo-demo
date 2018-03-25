const buildResolver = (db) => {
    const Comments = db.collection('comments')

    return {
        post: async ({postId}) => {
          return await Posts.findOne(ObjectId(postId))
        }
    }
}

module.exports = {buildResolver}