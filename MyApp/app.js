import express from 'express'
import cors from 'cors';

import { getBusinessBy, getTenBusiness} from './database.js'

const app = express()

app.use(cors())  // only this should works for every case also you can try 

app.use(cors({
  origin: '*' // that will for all like  https / http 
}))


app.get("/getBusinessBy/:term/:city/:state/:open/:sortingMethod", async (req, res) => {
    const term = req.params.term
    const city = req.params.city
    const state = req.params.state
    const open = req.params.open
    const sortingMethod = req.params.sortingMethod

    const businesses = await getBusinessBy(term, city, state, open, sortingMethod)
    res.send(businesses)
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


app.listen(8080, () => {
    console.log('Server is running on port 8080')
})