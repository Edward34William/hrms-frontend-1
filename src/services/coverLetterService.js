import axios from "axios";

export default class CoverLetterService{
    getAll(){
        return axios.get("http://localhost:8080/api/coverletter/getAll")
    }

    add(values){
        return axios.post("http://localhost:8080/api/coverletter/add",values)
    }
}