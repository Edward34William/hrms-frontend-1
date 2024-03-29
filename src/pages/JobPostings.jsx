import React from "react";
import { useState, useEffect } from "react";
import JobPostingsService from "../services/jobPostingsService";
import {
  Button,
  Card,
  Checkbox,
  Image,
  Icon,
  Grid,
  Feed,
  Input,
  Dropdown,
  Menu
} from "semantic-ui-react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import JobPostingService from "../services/jobPostingsService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../store/actions/favoriteActions";
import { number } from "yup";
import { render } from "@testing-library/react";

export default function JobPostings() {
  const [jobPostings, setjobPostings] = useState([]);
  const [city, setCity] = useState([]);
  const [jobpositions, setJobPositions] = useState([]);
  const [pageSize, setPageSize] = useState([]);
  const dispatch = useDispatch();

  const handleAddToFavorite=(posting)=>{
    dispatch(addToFavorite(posting))
  }



  // const [activePage, setActivePage] = useState();
  // let jobPostingService = new JobPostingService();
  // useEffect(() => {
  //   jobPostingService.getAllPageSize(pagingOptions.pageNo,pagingOptions.pageSize)
  //     .then((result) => setActivePage(result.data.data));
  // }, [])



  const pagingOptions = {
    totalCount: jobPostings.length,
    pageSize : 2, 
    pageNo: 1, 
    location:"aa",
  }

  function setPageNo(params) {
    if (params==="next") {
      let a = pagingOptions.pageNo+1;
    pagingOptions.pageNo=a;
    let jobPostingsService = new JobPostingsService();
    jobPostingsService
      .getAllPageSize(pagingOptions.pageNo,pagingOptions.pageSize)
      .then((result) => setjobPostings(result.data.data));
      console.log(pagingOptions)
      return
    }
    if (params==="back") {
      let a = pagingOptions.pageNo-1;
    pagingOptions.pageNo=a;
    if (pagingOptions.pageNo<1) {
      alert("Sayfa Zaten En Başta")
      return
    }
    let jobPostingsService = new JobPostingsService();
    jobPostingsService
      .getAllPageSize(pagingOptions.pageNo,pagingOptions.pageSize)
      .then((result) => setjobPostings(result.data.data));
      console.log(pagingOptions)
      return
    }
    let a = params;
    pagingOptions.pageNo=a;
    let jobPostingsService = new JobPostingsService();
    jobPostingsService
      .getAllPageSize(pagingOptions.pageNo,pagingOptions.pageSize)
      .then((result) => setjobPostings(result.data.data));
      console.log(pagingOptions)
      return
    
  }



  function getTotalPage() {
    return Math.ceil(pagingOptions.totalCount/pagingOptions.itemPerPage )
  }

  


  



  useEffect(() => {
    let jobPostingsService = new JobPostingsService();
    jobPostingsService
      .getAllPageSize(pagingOptions.pageNo,pagingOptions.pageSize)
      .then((result) => setjobPostings(result.data.data));
  }, []);

  useEffect(() => {
    let cityService = new CityService();
    cityService.getAll().then((result) => setCity(result.data.data));
  }, []);

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getAll()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  
  


  function filterFunction(params) {
    if (params == 0) {
      let jobPostingsService = new JobPostingsService();
      jobPostingsService
        .filterWorkplace(0)
        .then((result) => setPageSize(result.data.data));
    }
    if (params == 1) {
      let jobPostingsService = new JobPostingsService();
      jobPostingsService
        .filterWorkplace(1)
        .then((result) => setjobPostings(result.data.data));
    }
    if (params == 2) {
      let jobPostingsService = new JobPostingsService();
      jobPostingsService
        .filterTypeOfWork(2)
        .then((result) => setjobPostings(result.data.data));
    }
    if (params == 3) {
      let jobPostingsService = new JobPostingsService();
      jobPostingsService
        .filterTypeOfWork(3)
        .then((result) => setjobPostings(result.data.data));

    }
    
  }

  // function filterEmptyChange(option){
  //   if (option.empty === false) {
  //     option.empty == true;
  //   }else{
  //     option.empty == false;
  //   }
     
  // };

  const workplace = [
    {
      key: 0,
      text: "İş Yerinde",
      value: 0,
      label: { color: "red", empty: true, circular: true },
    },
    {
      key: 1,
      text: "Uzaktan",
      value: 1,
      label: { color: "red", empty: true, circular: true },
    },
  ];

  const typeOfWork = [
    {
      key: 2,
      text: "Tam Zamanlı",
      value: 2,
      label: { color: "red", empty: true, circular: true },
    },
    {
      key: 3,
      text: "Yarı Zamanlı",
      value: 3,
      label: { color: "red", empty: true, circular: true },
    },
  ];

  

 
  
  return (
    <div>
      
      
      <Grid style={{ paddingTop: "1em" }}>
        <div style={{ width: "93%" }}>
          <Dropdown
            style={{
              float: "right",
              marginTop: "5em",
              backgroundColor: "black",
              color: "white",
              marginBottom: "2em",
              paddingBottom: "1em",
            }}
            text="Filtrele"
            icon="filter"
            floating
            labeled
            button
            className="icon"
          >
            <Dropdown.Menu style={{}}>
              <Dropdown.Divider />
              <Dropdown.Header icon="tags" content="Filtrele" />
              <Dropdown.Menu scrolling>
                {typeOfWork.map((option) => (
                  <Dropdown.Item
                    key={option.value}
                    {...option}
                    onClick={() => filterFunction(option.value)  }
                    // onClick={()=>filterEmptyChange(option) }
                      
                  />
                ))}
              </Dropdown.Menu>
              <Dropdown.Menu scrolling>
                {workplace.map((option) => (
                  <Dropdown.Item
                    key={option.value}
                    {...option}
                    onClick={() => filterFunction(option.value) }
                    // onClick={()=>filterEmptyChange(option) }
                   
              
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Menu>
          </Dropdown>
          <div></div>
        </div>

        <Grid.Row>
          
          <Grid.Column width={5} style={{ paddingLeft: "3em" }}>
          <div style={{backgroundColor:"#F9F9F9",paddingTop:"0.5em",paddingBottom:"0.5em" ,width:"68%",paddingLeft:"2em"}}>{jobPostings.length} Adet İş İlanı Listelendi</div>
            <Card style={{ backgroundColor: "#F9F9F9" }}>
              <Card.Content>
                <Card.Header style={{ textAlign: "left" }}>Şehir</Card.Header>
              </Card.Content>
              <Card.Content style={{ overflowY: "scroll", height: "300px" }}>
                <div style={{ textAlign: "left" }}>
                  <div>
                    <Input
                      icon="search"
                      iconPosition="left"
                      placeholder="Şehir Ara"
                    />
                  </div>
                  <br />
                  <div style={{ paddingBottom: "1em" }}>
                    <Formik
                      initialValues={{
                        checked: [],
                      }}
                      onSubmit={async (values) => {
                        alert(JSON.stringify(values, null, 2));
                      }}
                    >
                      {({ values }) => (
                        <Form>
                          <div role="group" aria-labelledby="checkbox-group">
                            {city.map((result) => (
                              <div style={{ paddingBottom: "0.5em" }}>
                                <label>
                                  <Field
                                    type="checkbox"
                                    name="checked"
                                    value={result.city}
                                  />
                                  {result.city}
                                </label>
                                <br />
                              </div>
                            ))}
                          </div>
                          <Card.Description extra>
                            <button type="submit">Filtrele</button>
                          </Card.Description>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <br />
            <Card style={{ backgroundColor: "#F9F9F9" }}>
              <Card.Content>
                <Card.Header style={{ textAlign: "left" }}>
                  Pozisyon
                </Card.Header>
              </Card.Content>
              <Card.Content style={{ overflowY: "scroll", height: "300px" }}>
                <div style={{ textAlign: "left" }}>
                  <div>
                    <Input
                      icon="search"
                      iconPosition="left"
                      placeholder="Pozisyon Ara"
                    />
                  </div>
                  <br />
                  {jobpositions.map((result) => (
                    <div style={{ paddingBottom: "1em" }}>
                      <Checkbox label={result.positionName} />
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

          

          </Grid.Column>

          <Grid.Column width={10} style={{ paddingRight: "2em" }}>
            {jobPostings.map((result) => (
              <Card
                fluid
                style={{
                  paddingRight: "1em",
                  backgroundColor: "#F9F9F9",
                  marginBottom:"3em"
                }}
              >
                <Card.Content>
                  <Image
                    src="./company.png"
                    size="mini"
                    style={{ float: "left" }}
                  ></Image>

                   <Button  animated style={{float:"right",backgroundColor:"#F9F9F9"}}
                   onClick={()=>handleAddToFavorite(result)}
                   >
                      <Button.Content visible><Icon className="starIcon" name="star" /></Button.Content>
                      <Button.Content hidden >
                        Ekle
                      </Button.Content>
                    </Button>

                  <Card.Header>{result.companyName}
                  </Card.Header>
                  <Card.Meta style={{ paddingBottom: "2em" }}>
                    {result.jobPosition}
                  </Card.Meta>
                  <Card.Description>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          <label style={{ float: "left" }}>
                            <strong> Açıklama:</strong> {result.description}
                          </label>
                          <br />
                          <label style={{ float: "left" }}>
                            <strong>Çalışma Yeri:</strong>{" "}
                            {result.workplace == 0
                              ? "İş Yerinde"
                              : result.workplace || result.workplace == 1
                              ? "Uzaktan"
                              : result.workplace || result.workplace == null
                              ? alert("Bulunamadı")
                              : result.workplace}
                          </label>
                          <br />
                          <label style={{ float: "left" }}>
                            <strong>Çalışma Zamanı:</strong>{" "}
                            {result.typeOfWork == 2
                              ? "Tam Zamanlı "
                              : result.typeOfWork || result.typeOfWork == 3
                              ? "Yarı Zamanlı"
                              : result.typeOfWork || result.typeOfWork == null
                              ? alert("Bulunamadı")
                              : result.typeOfWork}
                          </label>
                          <br />
                          <label style={{ float: "left" }}>
                            <strong>Açık Pozisyon Sayısı:</strong>{" "}
                            {result.numberOfOpenPosition}
                          </label>
                          <br />
                          <label style={{ float: "left" }}>
                            <strong>Son Başvuru Tarihi:</strong>{" "}
                            {result.applicaitonDeadline}
                          </label>
                          <label style={{ float: "right" }}>
                             <Icon name="clock outline" color="blue"></Icon>(
                            {result.applicaitonDeadline})
                          </label>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green">
                      Başvur
                    </Button>
                    
                  </div>
                </Card.Content>
              </Card>
            ))}
            <Menu  pagination>
            
               
              
            <Menu.Item onClick={()=>setPageNo(1)} as='a'>1</Menu.Item>
            <Menu.Item onClick={()=>setPageNo(2)} as='a'>2</Menu.Item>
               <Menu.Item onClick={()=>setPageNo(3)} as='a'>3</Menu.Item>
               <Menu.Item   as='a'>20</Menu.Item>
               <Menu.Item   as='a'>50</Menu.Item>
               <Menu.Item   as='a'>100</Menu.Item>
               
              
           
          
          </Menu>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
