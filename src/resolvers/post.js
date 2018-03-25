const buildResolver = (db) => {
    const Posts = db.collection('posts')

    return {
        comments: async ({_id}) => {
          return (await Comments.find({postId: _id}).toArray())
        }
      }
}

module.exports = {buildResolver}