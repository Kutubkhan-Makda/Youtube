import axios from "axios";

const request = axios.create({
    baseURL:"https://www.googleapis.com/youtube/v3/",
    params:{
        key:"AIzaSyADsUQt_ysuCPQYcOPcgHQjHW2GjXoXDlg",
    }
})

export default request