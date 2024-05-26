const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    var arr =[]
    fs.readdir(`./files`,function(err,files){
        files.forEach(function(file){
        let data =fs.readFileSync(`./files/${file}`)
        arr.push({filename: file, filedata:data})

        })
        res.render('index',{files:arr})
    })

})
app.get('/create',(req,res)=>{
    res.render('create')
})
app.post('/create',(req,res)=>{
    
   fs.writeFile(`./files/${req.body.filename}`,req.body.filedata,function(err){
      if(err) res.send(err)
      else res.redirect('/')
   })
})

app.get(`/delete/:filename`,(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`,function(err){
            if(err) res.send(err)
            else res.redirect('/')
        })
})
app.get(`/edit/:filename`,(req,res)=>{
    let filename= req.params.filename
    fs.readFile(`files/${req.params.filename}`,function(err,data){
        
        res.render('edit',{filename,data})
    })
})

app.post('/edit/:filename',(req,res)=>{
    
    fs.writeFile(`./files/${req.params.filename}`,req.body.filedata,function(err){
       if(err) res.send(err)
       else res.redirect('/')
    })
 })

app.listen(3000)
