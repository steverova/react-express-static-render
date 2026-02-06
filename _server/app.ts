import app from "./src/index"

const PORT: string | number = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})
