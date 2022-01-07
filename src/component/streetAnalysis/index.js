import { useEffect, useState } from 'react';
import Axios from 'axios';
import data_table from '../table/index'
import {Row, Col, Button} from 'react-bootstrap'
import traitsData from '../dataList/traitsData';
import FilterTable from '../data_table';
import tokenData from '../dataList/token_data'
import streetOptions from '../dataList/streetOptions';
import cityOptions from '../dataList/cityOptions';
import districtOptions from '../dataList/districtOptions';
import Select from 'react-select'

const aggregate = (data, key, counter) => {
    let result = [];
    // console.log(data);
    data.reduce(function(res, value) {
        if (!res[value[key]]) {
            res[value[key]] = {"img" : value["img"], "City Name" : value["City Name"], "District Name" : value["District Name"], "Street Name" : value["Street Name"],"User Name" : value["User Name"], "Address" : value["Address"],count : 0, Brix : 0}
            result.push(res[value[key]]);
        }
        // console.log(res);
        res[value[key]].count += value[counter]
        res[value[key]].Brix += Number(value["Brix"])
        return res;
    },{});
    return result;
}

function StreetAnalysis() {
    const [stats,setStats] = useState([])
    const [data, setData] = useState([]);
    const [aData, setaData] = useState([]);
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [street, setStreet] = useState("");
    const [special, setSpecial] = useState("");
    const [key,setKey] = useState('counter');
    const [des, setDes] = useState(false)
    const[loading, setLoading] = useState(false)
    // const [fdata, setfdata] = useState(dummyData);
    const ref = "https://api.opensea.io/api/v1/assets?asset_contract_address=0x18cb9db75fa62a9717aa98292b939e579b7c7ccd&order_direction=desc";

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

    const sortData = (unsortedData, key, des) => {
        let sortedData = [];
        // console.log(key);
        // console.log(unsortedData);
        // console.log(data.sort((a,b) => a[key] - b[key]));
        if(des === true){
            // console.log("true");
            // sortedData = unsortedData.sort((a,b) => b[key] - a[key])
            sortedData = unsortedData.sort((a,b) => a[key] < b[key] ? 1: -1)
        } else if (des === false){
            // console.log("false");
            sortedData = unsortedData.sort((a,b) => a[key] > b[key] ? 1: -1)
        }
        return sortedData;
    }

    const getUnique = (arr, prop) => {
        let unique = [...new Set(arr.map(x => x[prop]))]         
        return unique;
    }
    useEffect(()=>{
        async function GetData() {
        let main = new Array();
        let offset = 0;
        let tokenDataFiltered = tokenData.filter((x) => x["Street Name"] === street).map((x)=> x["token_id"])
        // console.log(Math.floor(tokenDataFiltered.length / 20));
        // console.log(tokenDataFiltered.length)
        console.log("startload")
        setLoading(true);
        // console.log(Math.floor(tokenDataFiltered.length / 20));
        let cs = await Axios.get("https://api.opensea.io/api/v1/collection/propertysofficial/stats")
        setStats(cs.data);
        while (offset < Math.ceil(tokenDataFiltered.length / 20)) {
            let pag = "https://api.opensea.io/api/v1/assets?asset_contract_address=0x18cb9db75fa62a9717aa98292b939e579b7c7ccd&order_direction=desc"
            tokenDataFiltered.slice((offset * 20), ((offset * 20)) + 20).forEach((x)=>{
                // console.log(`&token_ids=${String(x)}`);
                pag = pag.concat(`&token_ids=${String(x)}`)
            })
            // console.log(pag);
            const response = await Axios.get(pag)
            // console.log(response.data)
            await response.data.assets.forEach((x)=>{
                let row = {}
                row.img = x.image_url
                x.traits.forEach((trait)=> {
                    row[trait.trait_type] = trait.value
                    if (trait.trait_type === "Special") {
                        row['City Name'] = "Special"
                        row['District Name'] = " "
                        row['Street Name'] = trait.value
                        row["trait_count"] = trait.trait_count;
                    }
                })
                if (x.sell_orders !== null){
                    row['Current Price'] = String(Number(x.sell_orders[0].current_price)/ Math.pow(10,18))
                    // console.log(row.current_price);
                } else {
                    row['Current Price'] = ""
                }
                row.token_id = x.token_id;
                row['Address'] = x.owner.address;
                    if(x.owner.user === null) {
                    x.owner.user = {username: "noname"}
                };
                // console.log(data.owner);
                if(x.owner.user.username !== null)
                {
                    row['User Name'] = x.owner.user.username;
                } else {
                    row['User Name'] = x.owner.address.slice(-8) ;
                }
                row.counter = 1;
                if (offset === Math.floor(tokenDataFiltered.length / 20) - 1){
                    console.log("endload")
                    setLoading(false)
                    console.log(main);
                }
                // console.log(main);
                // console.log(row,offset);
                main.push(row);
            })
            offset += 1
            setData(main);
            setaData(aggregate(main,"Address","counter"));
        }}
        GetData();
    },[street]);
    let idList = []
    // console.log(street);

    return (
        <>
            <div className='container-fluid' style={{width : '90%',}} >
                <h1 className='h3 text-center whiteText d-none d-sm-block d-md-block mt-3 mb-3'> Property's NFT </h1>
                <div className='card border' style={{borderColor:'rgb(229, 232, 235)', marginBottom:"24px"}}></div>
                <Row>
                    <div className='col-lg-2'>
                        <div className='card-body' style={{backgroundColor:'#262B2F'}}>
                            <div className="row justify-content-md-center">
                            <Col className='form-group'>
                                <p className='whiteText'> Street Analysis</p>
                                <Select className="mb-3" options={cityOptions} onChange={(e) => setCity(e.value)}/>
                                <Select className="mb-3" options={city === "" ? districtOptions : districtOptions.filter((x) => x.city === city)} onChange={(e) => setDistrict(e.value)}/>
                                <Select className="" options={district === "" && city === "" ? streetOptions : (district === "" ? streetOptions.filter((x) => x.city === city) : streetOptions.filter((x) => x.district === district))} onChange={(e) => setStreet(e.value)}/>
                            </Col>
                            </div>
                        </div>
                    </div>
                    {loading === false && (
                        <>
                    <div className='col-lg-10'>
                    {
                        stats.stats &&
                        (
                            <>
                            <div className = "dashboard">
                            <div className='whiteText component'> <p className='mb-0 cheader'> Number of Owner </p> <p className='mb-0 ccontent'> {stats.stats.num_owners} </p> </div>
                            <div className='whiteText component'> <p className='mb-0 cheader'> Daily Average </p> <p className='mb-0 ccontent'> {Math.floor(stats.stats.one_day_average_price*100)/100} </p> </div>
                            <div className='whiteText component'> <p className='mb-0 cheader'> Floor Price </p> <p className='mb-0 ccontent'> {stats.stats.floor_price} </p> </div>
                            <div className='whiteText component'> <p className='mb-0 cheader'> Volume Traded </p> <p className='mb-0 ccontent'> {Math.floor(stats.stats.total_volume)} </p> </div>
                            </div>
                            </>
                        )
                    }
                        <Row>
                            <div className='col-6'>
                                <h1 className='h3 text-center d-none d-sm-block d-md-block mt-3 mb-3 ml-3 mr-3 ' style={{color: "#9402fe"}}> Top Holders </h1>
                                <table className='content-table table table-hover table-dark dataTable no-footer' cellPadding={0} cellSpacing={0}>
                                    <thead>
                                        <tr>
                                            <th> </th>
                                            <th onClick={()=> {setDes(!des); setKey("City Name")}}> City </th>
                                            <th onClick={()=> {setDes(!des); setKey("District Name")}}> District </th>
                                            <th onClick={()=> {setDes(!des); setKey("Street Name")}}> Street </th>
                                            <th onClick={()=> {setDes(!des); setKey("count")}}> Unit Owned </th>
                                            <th onClick={()=> {setDes(!des); setKey("User Name")}}> User Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortData(aData,key,des).sort((a,b) => b.count - a.count).slice(0,7).map((row)=>(
                                        <tr>
                                            <td className='text-center'> <img src = {row.img} width={30} height={45}/> </td>
                                            <td className='text-center'> {row['City Name']} </td>
                                            <td className='text-center'> {row['District Name']} </td>
                                            <td className='text-center'> {row['Street Name']} </td>
                                            <td className='text-center'> {row['count']} </td>
                                            <td className='text-center'> {row['User Name']} </td>
                                        </tr>
                                        )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-6'>
                                <h1 className='h3 text-center d-none d-sm-block d-md-block mt-3 mb-3' style={{color: "#9402fe"}}> Listed Propertys </h1>
                                <table className='content-table table table-hover table-dark dataTable no-footer' cellPadding={0} cellSpacing={0}>
                                    <thead>
                                        <tr>
                                            <th> </th>
                                            <th onClick={()=> {setDes(!des); setKey("City Name")}}> City </th>
                                            <th onClick={()=> {setDes(!des); setKey("District Name")}}> District </th>
                                            <th onClick={()=> {setDes(!des); setKey("Street Name")}}> Street </th>
                                            <th onClick={()=> {setDes(!des); setKey('Current Price')}}> Price </th>
                                            <th onClick={()=> {setDes(!des); setKey("User Name")}}> Sold by </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.filter(x => x['Current Price'] !== "").sort((a,b) => a['Current Price'] - b['Current Price']).slice(0,7).map((row)=>(
                                        <tr>
                                            <td className='text-center'> <img src = {row.img} width={30} height={45}/> </td>
                                            <td className='text-center'> {row['City Name']} </td>
                                            <td className='text-center'> {row['District Name']} </td>
                                            <td className='text-center'> {row['Street Name']} </td>
                                            <td className='text-center'> {row['Current Price']} </td>
                                            <td className='text-center'> {row['User Name']} </td>
                                        </tr>
                                        )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Row>
                    </div>
                    </>
                    )}
                    {
                        loading === true && 
                        (
                            <>
                                <h1 className='whiteText d-flex justify-content-center col-lg-10'> loading </h1>
                            </>
                        )
                    }
                </Row>
            </div>
        </>
    );
}

export default StreetAnalysis;