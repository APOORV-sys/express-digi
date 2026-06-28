import express from 'express'     // standard
const app =express()  //standard

const port =3000  // standard
// app.get("/",(req,res)=>{
//     res.send("Hello, World!")
// })

// app.get("/ice-tea", (req, res) => {
//   res.send("What ice tea would you prefer?");
// });
// app.get("/twitter", (req, res) => {
//   res.send("appydotcom");
// });

// accept some data from frontend

app.use(express.json())     // to get data from frontend

let teaData=[]  
let nextId=1


// whenever you take any data you use post mmostly
// add new tea

app.post('/teas',(req,res)=>{
    
    const {name,price} = req.body    // hame body se kya abstrat krna hau
    const newTea={id: nextId++,name,price} // ek object joki stor krega data jo ki hai id ,name , price
    teaData.push(newTea)
    res.status(202).send(newTea)  // here we throw new data thriugh send so that the user can get to nn=know about new data

})
//list all the teas
    
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

// get a tea with id
 app.get('/teas/:id',(req,res)=>{
    const tea= teaData.find(t=>t.id === parseInt(req.params.id))   //anything that comes in body we say req.body and if anything comes in URL we say params
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
 })

 //update  tea

 app.put('/teas/:id',(req,res)=>{
    const teaId=req.params.id
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found0')

    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price 
    res.status(200).send(tea)
 })



 //delete tea

 app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t=>t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('tea not found')
    }
    teaData.splice(index,1)
    return res.status(204).send('deleted')

 })








app.listen(port,()=>{
    console.log(`server is running on port ${port}...`)
})



// find() returnd=s object and findIndex returns tha absolute position at the index