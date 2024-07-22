const app = require('./src/app')
const main = () => {
    app.listen(app.get('port'))
    console.log(`Server is running on port ${app.get('port')}`)
}
main()

/* Baklsdfjadklsñf */