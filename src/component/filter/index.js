import { useEffect, useState } from 'react';
import Axios from 'axios';
import data_table from '../table/index'
import {Row, Col, Button} from 'react-bootstrap'
import traitsData from '../dataList/traitsData';
import FilterTable from '../data_table';
import dummyData from '../dataList/dummydata'
import tokenData from '../dataList/token_data'

function Filter() {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [street, setStreet] = useState("");
    const [special, setSpecial] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState(999);
    const [buyNow, setBuyNow] = useState(false);
    const [fdata, setfdata] = useState(dummyData);
    const[searchColumns,setSearchColums] = useState("");
    const ref = "https://api.opensea.io/api/v1/assets?asset_contract_address=0x18cb9db75fa62a9717aa98292b939e579b7c7ccd&order_direction=desc";
    const search = (rows) => {
        // const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) => 
        columns.some(
            column => String(row['User Name']).toLowerCase().indexOf(username.toLowerCase()) > -1
            && String(row['City Name']).toLowerCase().indexOf(city.toLowerCase()) > -1
            && String(row['District Name']).toLowerCase().indexOf(district.toLowerCase()) > -1
            && String(row['Street Name']).toLowerCase().indexOf(street.toLowerCase()) > -1
            && String(row['Special']).toLowerCase().indexOf(special.toLowerCase()) > -1
            && Number(row['Current Price']) >= minPrice
            && Number(row['Current Price']) < maxPrice
            )
            // String((row['City Name'])).toLowerCase().indexOf(q.toString().to LowerCase()) > -1
        )
    }

    function unique_sort(arr, keyProps, key) {
        const kvArray = arr.map(entry => {
        const key = keyProps.map(k => entry[k]).join('|');
        return [key, entry];
        });
        const map = new Map(kvArray);
        const usArray = Array.from(map.values())
        const sArray = usArray.sort(function compare( a, b ) {
        if ( a[key] < b[key] ){
            return -1;
        }
        if ( a[key] > b[key] ){
            return 1;
        }
        return 0;
        })
        return sArray;
    }

    const getUnique = (arr, prop) => {
        let unique = [...new Set(arr.map(x => x[prop]))]         
        return unique;
    }
    useEffect(()=>{
        async function GetData() {
        let main = new Array();
        let offset = 0;
        while (offset <= 5950){
            let url = `${ref}&offset=${offset}&limit=50`;
            const response = await Axios.get(url);
            // console.log(response.data)
            offset += 50;
            await response.data.assets.forEach((x)=>{
            let row = {}
            // username
            // if(x.owner.user === null) {
            //     x.owner.user = {username: "noname"}
            // };
            // console.log(data.owner);
            // if(x.owner.user.username !== null)
            // {
            //     row['User Name'] = x.owner.user.username;
            // } else {
            //     row['User Name'] = "noname";
            // }
            // address
            // row['Address'] = x.owner.address;
            // token id
            // row['Token ID'] = x.token_id
            // x.traits.forEach((trait)=> {row[trait.trait_type] = trait.value})
            // console.log(x.traits.filter((x)=>x["trait_type"]==="City Name").pop().value);
            if (x.traits.filter((x)=>x["trait_type"]==="City Name").pop()) {
                row["City Name"] = x.traits.filter((x)=>x["trait_type"]==="City Name").pop().value;
            } else {
                row["City Name"] = ""
            }
            if (x.traits.filter((x)=>x["trait_type"]==="District Name").pop()) {
                row["District Name"] = x.traits.filter((x)=>x["trait_type"]==="District Name").pop().value;
            } else {
                row["District Name"] = ""
            }
            if (x.traits.filter((x)=>x["trait_type"]==="Street Name").pop()) {
                row["Street Name"] = x.traits.filter((x)=>x["trait_type"]==="Street Name").pop().value;
            } else {
                row["Street Name"] = ""
            }
            if (x.traits.filter((x)=>x["trait_type"]==="Unit").pop()) {
                row["Unit"] = x.traits.filter((x)=>x["trait_type"]==="Unit").pop().value;
            } else {
                row["Unit"] = "";
            }
            if (x.traits.filter((x)=>x["trait_type"]==="Special").pop()) {
                row["Special"] = x.traits.filter((x)=>x["trait_type"]==="Special").pop().value;
            } else {
                row["Special"] = ""
            }
            // if (x.sell_orders !== null){
            //     row['Current Price'] = String(Number(x.sell_orders[0].current_price)/ Math.pow(10,18))
            //     // console.log(row.current_price);
            // } else {
            //     row['Current Price'] = ""
            // }
            row.token_id = x.token_id;
            main.push(row);
            // console.log(main.length);
            if (main.length === 6000){
                // console.log(main);
                console.log(JSON.stringify(main));
            }
            // console.log(row);
        })
        setData(main);
        setfdata(main);
        // setData(dummyData);
        // setfdata(dummyData);
        }
        }
        GetData();
    },[]);
    
    const columns = data[0] && Object.keys(data[0])
    // console.log(data.stringify);
    let idList = []
    // console.log(data);
    console.log(tokenData.filter((x) => x["Street Name"] === "Gorilla Gate").map((x)=> x["token_id"]));

        // console.log(districtNames);  
    return (
        <>
        <div className='container-fluid' style={{width : '90%',}} >
            <h1 className='h3 text-center text-muted d-none d-sm-block d-md-block mt-3 mb-3'> Property's NFT </h1>
            <div className='card border' style={{borderColor:'rgb(229, 232, 235)', marginBottom:"24px"}}>
            <div className='card-body' style={{backgroundColor:'#262B2F'}}>
                <div className="row justify-content-md-center">
                <Col className='col-sm col-lg-3 form-group'>
                    {/*<input className='form-control mb-2' autoComplete='off' placeholder='User Name' type="text" value ={username} height="28px" onChange={(e) =>
                        setUsername(e.target.value)}>
                    </input>*/}
                    {/* City */}
                    <input className='form-control mb-2' list="City Name" autoComplete='off' placeholder='City' type="text" value ={city} height="28px" onChange={(e) =>
                    setCity(e.target.value)}/>
                    <datalist id="City Name">
                        {
                            getUnique(traitsData,['city']).map((s) => (<option value={`${s}`}></option>))
                        }
                    </datalist>
                    {/* District */}
                    <input className='form-control mb-2' list="District Name" autoComplete='off' placeholder='District' type="text" value={district} height="28px" onChange={(e) =>
                    setDistrict(e.target.value)}/>
                    <datalist id="District Name">
                    {
                        unique_sort(traitsData,['district'],['district']).filter((x) => {
                        if (city !== "") {
                            return x.city === city
                        }else {return x}
                        }).filter((x) => {
                        if (street !== "") {
                            return x.street === street
                        }else {return x}
                        }).map((s) => (<option value={`${s.district}`}></option>))
                    }
                    </datalist>
                    {/* Street */}
                    <input className='form-control mb-2' list="Street Name" autoComplete='off' placeholder='Street' type="text" value ={street} height="28px" onChange={(e) =>
                    setStreet(e.target.value)}/>
                    <datalist id="Street Name">
                        {
                        unique_sort(traitsData,['street'],['street']).filter((x) => {
                            if (city !== "") {
                            return x.city === city
                            } else {return x}
                        }).filter((x) => {
                            if (district !== "") {
                            return x.district === district
                            } else {return x}
                        }).map((s) => (<option value={`${s.street}`}></option>))
                        }
                    </datalist>
                    <input className='form-control mb-2' list="Special" autoComplete='off' placeholder='Special' type="text" value ={special} height="28px" onChange={(e) =>
                    setSpecial(e.target.value)}/>
                    <datalist id="Special">
                        {
                        unique_sort(traitsData,['special'],['special']).map((s) => (<option value={`${s.special}`}></option>))
                        }
                    </datalist>
                </Col>
                <Col className="col-sm col-lg-5 d-none d-sm-block d-md-block">
                    <Row>
                    <div className='col-3 priceText'>
                        <h4 className='text-muted' style={{textAlign:"center", marginBottom: '12px'}}> Price: </h4>
                    </div>
                    <div className='col-4'>
                        <input type="text" name="min price" style={{textAlign:"center"}} class="form-control form-control-sm" placeholder="Min" onChange={(e) =>
                        setMinPrice(e.target.value)}/>
                    </div>
                    <div className='col-4'>
                    <input type="text" name="max price" style={{textAlign:"center"}} class="form-control form-control-sm" placeholder="Max" onChange={(e) =>
                        setMaxPrice(e.target.value)}/>
                    </div>
                    </Row>
                    <Row>
                    <div className='col-3 priceText'>
                        <h4 className='text-muted' style={{textAlign:"center", marginBottom: '12px'}}> Unit: </h4>
                    </div>
                    <div className='col-4'>
                        <input type="text" name="min price" style={{textAlign:"center"}} class="form-control form-control-sm" placeholder="Min" onChange={(e) =>
                        setMinPrice(e.target.value)}/>
                    </div>
                    <div className='col-4'>
                    <input type="text" name="max price" style={{textAlign:"center"}} class="form-control form-control-sm" placeholder="Max" onChange={(e) =>
                        setMaxPrice(e.target.value)}/>
                    </div>
                    {/*</Row>
                    <Row>
                    <div className='col-3 priceText'>
                        <h4 className='text-muted' style={{textAlign:"center", marginBottom: '12px'}}> Status: </h4>
                    </div>
                    <div className='col-4'>
                        <Button className='buyNowButton btn-block' onClick={()=> {
                        setBuyNow(!buyNow);
                        if(buyNow){
                            setfdata(data.filter((x) => x['Current Price'] !== ""))}
                            else {
                            setfdata(data);
                            }
                        }
                        }> Buy Now </Button>
                    </div>
                    </Row>
                    <Row>*/}
                    <div className='col-3'/>
                    <div className='col-4'>
                        <Button className='filterButton btn-block' onClick={()=> setfdata(search(data))}> Filter </Button>
                    </div>
                    </Row>
                </Col>
                {/*<Col className="col-sm col-lg-auto d-none d-sm-block d-md-block">
                    <Button className='filterButton'> Filter </Button>
                    </Col>*/}
                </div>
            </div>
            </div>
            <div className='mt-10'>
            {/*data_table(fdata.filter((x) => x['Current Price'] !== "").sort(function compare( a, b ) {
                if ( a['Current Price'] < b['Current Price'] ){
                return -1;
                }
                if ( a['Current Price'] > b['Current Price'] ){
                return 1;
                }
                return 0;
            }))*/}
            <FilterTable data = {fdata}></FilterTable>
            </div>
        </div>
        </>
        
        
    );
}

export default Filter;