

const GetLocalData=()=>{
    let localStorageData=localStorage.getItem("userData");
    return localStorageData ? localStorageData : null;
}

export default GetLocalData;