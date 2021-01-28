let dataObj = [];
let imgPayLoad=''
export const showData = () => {
  // console.log('--------------------------------')

  let res = localStorage.getItem("data");
  console.log(JSON.parse(res));
  return JSON.parse(res);
};
export const imgData = data => {
  //     console.log('--------------------------------')
  //    localStorage.setItem('tabs',[...tabsData,data])
  //     tabsData = localStorage.getItem('tabs')
};
export const addScreen = data => {
  let val2 = JSON.stringify(data);
  localStorage.setItem("data", val2);
  // console.log(showItem())
  // console.log( data)
};

// ----------------------------------------------------------------------------------------------------------------------
export const getLocalStoreData = () => {
  // console.log('--------------------------------')
  let res = localStorage.getItem("localData");
 
 if(res){
   imgPayLoad=JSON.parse(res);
 }
  return JSON.parse(res);
};

export const localStoreData = data => {
     debugger;
  if (data.type == "imgSrcNamePush") {
    dataObj = []
    // debugger;
    imgPayLoad?dataObj.push(...imgPayLoad,data.payLoad):dataObj.push(data.payLoad);
    let currentData = JSON.stringify(dataObj);
    localStorage.setItem("localData", currentData);



  } else {
      dataObj=[]
      localStorage.clear();
      imgPayLoad=data.payLoad
      let currentData = JSON.stringify(data.payLoad);
      localStorage.setItem("localData", currentData); 
  }
};


