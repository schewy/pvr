import { useEffect, useState } from 'react';
import Axios from 'axios';
import {Row, Col, Button} from 'react-bootstrap'

const inBrix = {
    'Beige Bay' : 10,
    'Orange Oasis' : 20,
    'Yellow Yards' : 30,
    'Green Grove' : 40,
    'Purple Palms ' : 50,
    'Blue Bayside' : 60,
    'X AE X-II' : 80,
    "20" : 250,
    "5" : 600,
    "1" : 1200,
}

const pureStreetBonus = {
    'Beige Bay' : 300,
    'Orange Oasis' : 350,
    'Yellow Yards' : 400,
    'Green Grove' : 450,
    'Purple Palms ' : 500,
    'Blue Bayside' : 550,
    'X AE X-II' : 650,
}

const pureDistrictBonus = {
    'Beige Bay' : 500,
    'Orange Oasis' : 600,
    'Yellow Yards' : 700,
    'Green Grove' : 800,
    'Purple Palms ' : 900,
    'Blue Bayside' : 1000,
    'X AE X-II' : 1600,
}

const pureCityBonus = {
    'Beige Bay' : 1000,
    'Orange Oasis' : 1200,
    'Yellow Yards' : 1400,
    'Green Grove' : 1600,
    'Purple Palms ' : 1800,
    'Blue Bayside' : 2000,
    'X AE X-II' : 4300,
}

const aggregate = (data, key, counter) => {
    let result = [];
    // console.log(data);
    data.reduce(function(res, value) {
        if (!res[value[key]]) {
            res[value[key]] = {"img" : value["img"], "City Name" : value["City Name"], "District Name" : value["District Name"], "Street Name" : value["Street Name"], count : 0, Brix : 0}
            result.push(res[value[key]]);
        }
        // console.log(res);
        res[value[key]].count += value[counter]
        res[value[key]].Brix += Number(value["Brix"])
        return res;
    },{});
    // console.log(data);
    return result;
}

const getHouseBonus = (data) => {
    let hb = 0;
    // console.log(data);
    data.forEach((b) => {
        // console.log(Number(b.Brix));
        if (b.Brix) {
            hb += Number(b.Brix)
        }
    })
    return [hb, data.length];
}

const getPureStreetBonus = (data) => {
    let pureStreet = data.filter((x) => x.count >= 7)
    // console.log(pureStreet);
    let numOfPureStreet = 0
    let totalPureStreetBonus = 0
    pureStreet.forEach((p)=> {
        totalPureStreetBonus += pureStreetBonus[p["City Name"]] * Math.floor(p.count / 7);
        numOfPureStreet += Math.floor(p.count / 7)
    })
    // console.log(totalPureStreetBonus, numOfPureStreet)
    return  [totalPureStreetBonus, numOfPureStreet];
}

const getImpureStreetBonus = (data, psc) =>{
    let d = data.filter((x) => x["City Name"] !== "Special")
    let upsc = Math.floor(d.length/7) - psc
    return [upsc * 150 , upsc]
}

const getSpecialBonus = (data) =>{
    let totalSpecialBonus = 0
    let d = data.filter((x) => x["trait_count"])
    d.forEach((p) =>{
        totalSpecialBonus += Number(p.Brix)
    })
    return [ totalSpecialBonus , d.length]
}

const getDistrictBonus = (data) =>{
    let numOfDistrict = 0
    let totalDistrictBonus = 0
    let pureStreet = data.filter((x) => x.count >= 7)
    pureStreet.forEach((p) => {p.numOfPS = Math.floor(p.count / 7)})
    pureStreet = aggregate(pureStreet,"District Name", "numOfPS")
    const districtData = pureStreet.filter((x) => x.count >= 3)
    districtData.forEach((x)=>{
        x.count = Math.floor(x.count / 3)
        x.Brix = pureDistrictBonus[x["City Name"]] * x.count
    })
    // console.log(districtData)
    districtData.forEach((p) => {
        // console.log(pureDistrictBonus[p["City Name"]])
        totalDistrictBonus += pureDistrictBonus[p["City Name"]] * p.count;
        numOfDistrict += p.count;
    })
    // console.log(totalDistrictBonus, numOfDistrict);
    return [totalDistrictBonus, numOfDistrict, districtData];
}

const getCityBonus = (data) =>{
    let numOfCity = 0
    let totalCityBonus = 0
    let pureStreet = data.filter((x) => x.count >= 7)
    pureStreet.forEach((p) => {p.numOfPS = Math.floor(p.count / 7)})
    // console.log(pureStreet);
    let pureDistrict = aggregate(pureStreet,"District Name", "numOfPS").filter((x) => x.count >= 3)
    // console.log(pureDistrict);
    pureDistrict.forEach((p) => {p.numOfPD = Math.floor(p.count / 3)})
    let pureCity = aggregate(pureDistrict, "City Name", "numOfPD")
    // console.log(pureCity)
    pureCity.forEach((p) => {
        if (p["City Name"] === 'Beige Bay' || p["City Name"] === 'Orange Oasis') {
            totalCityBonus += pureCityBonus[p["City Name"]] * Math.floor(p.count / 5);
            numOfCity += Math.floor(p.count / 5)
        } else if (p["City Name"] === 'Yellow Yards' || p["City Name"] === 'Green Grove' || p["City Name"] === 'Purple Palms ') {
            totalCityBonus += pureCityBonus[p["City Name"]] * Math.floor(p.count / 4);
            numOfCity += Math.floor(p.count / 4);
        } else if (p["City Name"] === 'Blue Bayside' || p["City Name"] === 'X AE X-II') {
            totalCityBonus += pureCityBonus[p["City Name"]] * Math.floor(p.count / 3);
            numOfCity += Math.floor(p.count / 3);
        }
    })
    // console.log(totalCityBonus, numOfCity);
    return [totalCityBonus, numOfCity];
}

function BrixCal() {
    const [data, setData] = useState([]);
    const [address, setAddress] = useState('');
    const [addressHolder, setAddressHolder] = useState('');
    const [loading, setLoading] = useState(true);
    const [key,setKey] = useState('Brix');
    const [des, setDes] = useState(false)
    // const ref = "https://api.opensea.io/api/v1/assets?owner=0x302f23818ecc618f728beb5383195fc146123fc1&order_direction=desc&offset=100&limit=50&collection=propertysofficial";
    useEffect(()=>{
        async function GetData() {
            setLoading(true);
            let pool = []
            let offset = 0
            while (1) {
                let ref = `https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=${offset}&limit=50&collection=propertysofficial`
                // console.log(ref);
                const response = await Axios.get(ref);
                // console.log(response.data);
                if (response.data.assets.length === 0) {
                    setData(pool)
                    return
                }
                let inventory = response.data.assets;
                // console.log(inventory);
                inventory.forEach(nft => {
                    let row = {}
                    // console.log(nft.traits)
                    row.img = nft.image_url
                    nft.traits.forEach((trait)=> {
                        row[trait.trait_type] = trait.value
                        if (trait.trait_type === "Special") {
                            row['City Name'] = "Special"
                            row['District Name'] = " "
                            row['Street Name'] = trait.value
                            row["trait_count"] = trait.trait_count;
                        }
                    })
                    if (row['City Name'] !== 'Special') {
                        row.Brix = inBrix[row['City Name']]
                    } else {
                        row.Brix = inBrix[row['trait_count']]
                    }
                    row.counter = 1;
                    pool.push(row)
                    // setData(pool);
                    // console.log(pool);
                });
                offset += 50;
            }
            // console.log(pool);
            // setData(pool);
            setLoading(false);
        }
        GetData();
    },[address]);
    
    const sortData = (unsortedData, key, des) => {
        let sortedData = [];
        console.log(key);
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
    // Brix Calculation
    // console.log(data)
    const [houseBonus, houseCount] = getHouseBonus(data);
    const aData = aggregate(data, "Street Name", "counter")
    console.log(aData);
    // console.log(sortData(aData, key, des));
    const [totalPureStreetBonus, pureStreetCount] = getPureStreetBonus(aData);
    const [totalImpureStreetBonus, impureStreetCount] = getImpureStreetBonus(data, pureStreetCount);
    const [totalDistrictBonus, districtCount, dData] = getDistrictBonus(aData);
    const [totalCityBonus, cityCount] = getCityBonus(aData)
    const [totalSpecialBonus, specialCount] = getSpecialBonus(data);
    const totalStreetBonus = totalPureStreetBonus + totalImpureStreetBonus;
    // console.log(houseBonus + pureStreetBonus + impureStreetBonus + districtBonus + cityBonus + specialBonus);
    const totalBonus = houseBonus + totalPureStreetBonus + totalImpureStreetBonus + totalDistrictBonus + totalCityBonus
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };
    return (
        <>
            <div className='container-fluid' style={{width : '90%',}} >
                <h1 className='h3 text-center whiteText d-none d-sm-block d-md-block mt-3 mb-3'> Property's NFT </h1>
                <div className='card border' style={{borderColor:'rgb(229, 232, 235)', marginBottom:"24px"}}></div>
                <div className='col-lg-4'>

                </div>
                <Row>
                    <div className='col-lg-3'>
                    <Row>
                    <div className='col-7 priceText'>
                    <input className='form-control mb-2' autoComplete='off' placeholder='Wallet Address' type="text" value ={addressHolder} height="28px" onChange={(e) =>
                        setAddressHolder(e.target.value)}/>
                    </div>
                    <div className='col-5'>
                    <Button className='filterButton btn-block mt-0' onClick={() => setAddress(addressHolder)}> Filter </Button>
                </div>
                </Row>
                        <div className='card-body' style={{backgroundColor:'#262B2F'}}>
                            <div className="row">
                                <Col className="col-sm d-none d-sm-block d-md-block">
                                    <Row className='mb-1'>
                                        <div className='col-9 priceText'>
                                            <p className='labelText'> NFT Owned </p>
                                        </div>
                                        <div className='col-3 priceText'>
                                            <p className='numberText'> {houseCount} </p>
                                        </div>
                                    </Row>
                                    <Row className='mb-1'>
                                        <div className='col-9 priceText'>
                                            <p className='labelText'> Houses Owned </p>
                                        </div>
                                        <div className='col-3 priceText'>
                                            <p className='numberText'> {houseCount - specialCount} </p>
                                        </div>
                                    </Row>
                                    <Row>
                                    <div className='col-9 priceText'>
                                        <p className='labelText'> Special Owned </p>
                                    </div>
                                    <div className='col-3 priceText'>
                                        <p className='numberText'> {specialCount} </p>
                                    </div>
                                </Row>
                                    <Row>
                                        <div className='col-9 priceText'>
                                            <p className='labelText'> Street(P) Completed </p>
                                        </div>
                                        <div className='col-3 priceText'>
                                            <p className='numberText'> {pureStreetCount} </p>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='col-9 priceText'>
                                            <p className='labelText'> Street(I) Completed </p>
                                        </div>
                                        <div className='col-3 priceText'>
                                            <p className='numberText'> {impureStreetCount} </p>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='col-9 priceText'>
                                            <p className='labelText'> District Completed </p>
                                        </div>
                                        <div className='col-3 priceText'>
                                            <p className='numberText'> {districtCount} </p>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='col-9 priceText'>
                                            <p className='labelText'> City Completed </p>
                                        </div>
                                        <div className='col-3 priceText'>
                                            <p className='numberText'> {cityCount} </p>
                                        </div>
                                    </Row>
                                    {totalBonus > 0 ? 
                                        (<Row>
                                        <div className='col-9 priceText'>
                                            <p className='labelText'> City Bonus </p>
                                        </div>
                                        <div className='col-3 priceText'>
                                            <p className='numberText'> {totalCityBonus} </p>
                                    </div>
                                    </Row>) : <></>}
                                    <Row>
                                        <div className='col-9 priceText'>
                                            <p className='labelText'> Total Bonus </p>
                                        </div>
                                        <div className='col-3 priceText'>
                                            <p className='numberText'> {totalBonus} </p>
                                    </div>
                                    </Row>
                                </Col>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div className="bloc-tabs">
                            <button
                            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(1)}
                            >
                            NFT
                            </button>
                            <button
                            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(2)}
                            >
                            Street
                            </button>
                            <button
                            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(3)}
                            >
                            District
                            </button>
                        </div>
                        <div className={toggleState === 1 ? "content  active-content" : "content"}>
                            <div>
                                <h3 className='whiteText'> NFT Brix Bonus: {houseBonus} </h3>
                            </div>
                            <table className='content-table table table-hover table-dark dataTable no-footer' cellPadding={0} cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th onClick={()=> {setDes(!des); setKey("City Name")}}> City </th>
                                        <th onClick={()=> {setDes(!des); setKey("District Name")}}> District </th>
                                        <th onClick={()=> {setDes(!des); setKey("Street Name")}}> Street </th>
                                        <th onClick={()=> {setDes(!des); setKey("count")}}> Unit Owned </th>
                                        <th onClick={()=> {setDes(!des); setKey("Brix")}}> Brix </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortData(aData,key,des).map((row)=>(
                                    <tr>
                                        <td className='text-center'> <img src = {row.img} width={30} height={45}/> </td>
                                        <td className='text-center'> {row['City Name']} </td>
                                        <td className='text-center'> {row['District Name']} </td>
                                        <td className='text-center'> {row['Street Name']} </td>
                                        <td className='text-center'> {row['count']} </td>
                                        <td className='text-center'> {row['Brix']} </td>
                                    </tr>
                                    )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={toggleState === 2 ? "content  active-content" : "content"}>
                            <div>
                                <h3 className='whiteText'> Total Street Bonus: {totalPureStreetBonus} (Pure) + {totalImpureStreetBonus} (Impure) = {totalStreetBonus} </h3>
                            </div>
                            <table className='content-table table table-hover table-dark dataTable no-footer' cellPadding={0} cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th onClick={()=> {setDes(!des); setKey("City Name")}}> City </th>
                                        <th onClick={()=> {setDes(!des); setKey("District Name")}}> District </th>
                                        <th onClick={()=> {setDes(!des); setKey("Street Name")}}> Street </th>
                                        <th onClick={()=> {setDes(!des); setKey("count")}}> Set Owned </th>
                                        <th onClick={()=> {setDes(!des); setKey("Brix")}}> Brix </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortData(aData.filter((x) => x.count >= 7),key,des).map((row)=>(
                                    <tr>
                                        <td className='text-center'> <img src = {row.img} width={30} height={45}/> </td>
                                        <td className='text-center'> {row['City Name']} </td>
                                        <td className='text-center'> {row['District Name']} </td>
                                        <td className='text-center'> {row['Street Name']} </td>
                                        <td className='text-center'> {Math.floor(row['count']/7)} </td>
                                        <td className='text-center'> {Math.floor(row['count']/7)*pureStreetBonus[row['City Name']]} </td>
                                    </tr>
                                    )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={toggleState === 3 ? "content  active-content" : "content"}>
                            <div>
                                <h3 className='whiteText'> Total District Bonus: {totalDistrictBonus}</h3>
                            </div>
                            <table className='content-table table table-hover table-dark dataTable no-footer' cellPadding={0} cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th> City </th>
                                        <th> District </th>
                                        <th> Set Owned </th>
                                        <th> Brix </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dData.sort((a,b) => b.Brix - a.Brix).map((row)=>(
                                    <tr>
                                        <td className='text-center'> <img src = {row.img} width={30} height={45}/> </td>
                                        <td className='text-center'> {row['City Name']} </td>
                                        <td className='text-center'> {row['District Name']} </td>
                                        <td className='text-center'> {row.count} </td>
                                        <td className='text-center'> {row.Brix} </td>
                                    </tr>
                                    )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Row>
            </div>
        </>
        
        
    );
}

export default BrixCal;