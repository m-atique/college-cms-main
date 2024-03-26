import axios from "axios";
//=============================================================Login 
const login = (user, pwd,  userALert, pwdAlert, fn) => {
  if (user != "accounts" && user != "academics"  ) {
    alert(userALert);
  } 


  else if(pwd != 123) {
    alert(pwdAlert);
  } else {
    fn();
  }
};

//============== get max id 
const getmaxid =async(table,id)=>{

  const ids =  await axios.get(`http://localhost:5010/gen/maxId/${table}/${id}`)
  return ids.data[0].maxid
   
  
}

//============get id by name 
const idbyname =async(table,id,field,value)=>{

  const result =  await axios.get(`http://localhost:5010/gen/getField/${table}/${id}/${field}/${value}`)
  return result.data[0]
   
  
}

//============get id by name 
const idby2candy =async(table,field1,field2,value2,field3,value3)=>{

  const result =  await axios.get(`http://localhost:5010/gen/getbycandy2/${table}/${field1}/${field2}/${value2}/${field3}/${value3}`)
  return result.data[0].acId
   
  
}

export {login,getmaxid,idbyname,idby2candy}
