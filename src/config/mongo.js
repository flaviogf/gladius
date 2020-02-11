export default {
  url: process.env.MONGO_URL,
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
}
