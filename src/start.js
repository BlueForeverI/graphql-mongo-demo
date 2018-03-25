import {MongoClient, ObjectId} from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import { request, GraphQLClient } from 'graphql-request'
import cors from 'cors'
const Query = require('./resolvers/query.js')
const Post = require('./resolvers/post')
const Comment = require('./resolvers/comment')
const Mutations = require('./resolvers/mutations')
const types = require('./schema.js')

const URL = process.env.ENDPOINT || 'http://localhost'
const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGODB_URI

export const start = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL)
    const typeDefs = [types.schema]
    const resolvers = {
      Query: Query.buildQuery(db),
      Post: Post.buildResolver(db),
      Comment: Comment.buildResolver(db),
      Mutation: Mutations.buildMutations(db),
    }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    })

    const app = express()
    app.use(cors())
    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))

    const homePath = '/graphiql'
    app.use(homePath, graphiqlExpress({
      endpointURL: '/graphql'
    }))
    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}${homePath}`)
    })

  } catch (e) {
    console.log(e)
  }

}
