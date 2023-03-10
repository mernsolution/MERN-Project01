var Userdb=require('../model/model');

//create and save new user
exports.create=(req,res)=>{
//validate request
if(!req.body){
    res.status(400).send({message:"content can not be empty"});
    return;
}
//new user
const user = new Userdb({
name:req.body.name,
email:req.body.email,
gender:req.body.gender,
status:req.body.status
})
//save user in the database
user
 .save(user)
 .then(data=>{
    //  res.send(data);
   res.redirect('/add_user');
  
 })
.catch(err=>{
    res.status(500).send({
        message:err.message||'some error occurred whhile creaateing a creating a create operation'
    });
});
}






//receive and return all users/ receive and return a single user

exports.find=(req,res)=>{
if(req.query.id){
const id=req.query.id;

Userdb.findById(id)
.then(data=>{
if(!data){
    res.status(404).send({message:'Not found user with id '+ id})
}
else{
  res.send(data)  
}
})
.catch(err=>{
res.status(500).send({message:'error retrieving user with id'+ id})
})

}
else{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||'some error occurred while receiving data information from DB'});
    
    });
}
}




//update a new identified user by user id
exports.update=(req,res)=>{
if(!req.body){
    return res
    .status(400)
    .send({message:'Data to update can not be empty'})
}

const id=req.params.id;
Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
.then(data=>{
    if(!data){
        res.status(404).send({message:`can not update user with ${id}.maybe user not found`})
    }else{
        res.send(data)
    }
})
.catch(err=>{
    res.status(500).send({message:'Error update user information' });
});

}
//Delete a new identified user by user id
exports.delete=(req,res)=>{
  const id=req.params.id;
  Userdb.findByIdAndDelete(id) 
  .then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot delete id${id}.Maybe id is wrong`})
    }else{
        res.send({message:"user was deleted successfully!"})
    }


  })
  .catch(err=>{
    res.status(500).send({message:'Could not delete user with id='+id });
});

}