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
    data.reduce(function(res, value) {
        if (!res[value[key]]) {
            res[value[key]] = {"City Name" : value["City Name"], "District Name" : value["District Name"], "Street Name" : value["Street Name"], count : 0}
            result.push(res[value[key]]);
        }
        // console.log(res);
        res[value[key]].count += value[counter]
        return res;
    },{});
    // console.log(result)
    return result;
}

const getHouseBonus = (data) => {
    let hb = 0;
    // console.log(data);
    console.log(data.length);
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
    console.log(pureStreet);
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
    let d = data.filter((x) => x["City Name"])
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
    pureStreet.forEach((p) => {
        totalDistrictBonus += pureDistrictBonus[p["City Name"]] * Math.floor(p.count / 3);
        numOfDistrict += Math.floor(p.count / 3)
    })
    console.log(totalDistrictBonus, numOfDistrict);
    return [totalDistrictBonus, numOfDistrict];
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
    // const ref = "https://api.opensea.io/api/v1/assets?owner=0x302f23818ecc618f728beb5383195fc146123fc1&order_direction=desc&offset=100&limit=50&collection=propertysofficial";
    useEffect(()=>{
        async function GetData() {
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
                    nft.traits.forEach((trait)=> {
                        row[trait.trait_type] = trait.value
                        if (trait.trait_type === "Special") {
                            row["trait_count"] = trait.trait_count;
                        }
                    })
                    if (row['City Name']) {
                        row.Brix = inBrix[row['City Name']]
                    } else {
                        row.Brix = inBrix[row['trait_count']]
                    }
                    row.counter = 1;
                    pool.push(row)
                    // setData(pool);
                });
                offset += 50;
            }
            // console.log(pool);
            // setData(pool);
        }
        GetData();
    },[address]);
    
    // Brix Calculation
    // console.log(data)
    const [houseBonus, houseCount] = getHouseBonus(data);
    const aData = aggregate(data, "Street Name", "counter")
    const [pureStreetBonus, pureStreetCount] = getPureStreetBonus(aData);
    const [impureStreetBonus, impureStreetCount] = getImpureStreetBonus(data, pureStreetCount);
    const [districtBonus, districtCount] = getDistrictBonus(aData);
    const [cityBonus, cityCount] = getCityBonus(aData)
    const [specialBonus, specialCount] = getSpecialBonus(data);
    // console.log(houseBonus + pureStreetBonus + impureStreetBonus + districtBonus + cityBonus + specialBonus);
    const totalBonus = houseBonus + pureStreetBonus + impureStreetBonus + districtBonus + cityBonus + specialBonus
    console.log(address);
    return (
        <>
            <div className='container-fluid' style={{width : '90%',}} >
                <h1 className='h3 text-center whiteText d-none d-sm-block d-md-block mt-3 mb-3'> Property's NFT </h1>
                <div className='card border' style={{borderColor:'rgb(229, 232, 235)', marginBottom:"24px"}}></div>
                <Row>
                    <div className='col-3 priceText'> <h4 className='whiteText' style={{textAlign:"center",}}> Wallet Address : </h4> </div>
                    <div className='col-7 priceText'>
                    <input className='form-control mb-2' autoComplete='off' placeholder='Wallet Address' type="text" value ={addressHolder} height="28px" onChange={(e) =>
                        setAddressHolder(e.target.value)}/>
                    </div>
                    <div className='col-2'>
                    <Button className='filterButton btn-block mt-0' onClick={() => setAddress(addressHolder)}> Filter </Button>
                </div>
                </Row>
                <div className='card-body' style={{backgroundColor:'#262B2F'}}>
                    <div className="row justify-content-md-center">
                        <Col className="col-sm col-lg-10 d-none d-sm-block d-md-block">
                            <Row>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Total NFT : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {houseCount} </h4>
                                </div>
                            </Row>
                            <Row>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Total Houses : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {houseCount - specialCount} </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Bonus : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {houseBonus} </h4>
                            </div>
                            </Row>
                            <Row>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Pure Street : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {pureStreetCount} </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Bonus : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {pureStreetBonus} </h4>
                            </div>
                            </Row>
                            <Row>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Impure Street : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {impureStreetCount} </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Bonus : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {impureStreetBonus} </h4>
                            </div>
                            </Row>
                            <Row>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> District : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {districtCount} </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Bonus : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {districtBonus} </h4>
                            </div>
                            </Row>
                            <Row>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> City : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {cityCount} </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Bonus : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {cityBonus} </h4>
                            </div>
                            </Row>
                            <Row>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Special : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {specialCount} </h4>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Bonus : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {specialBonus} </h4>
                            </div>
                            </Row>
                            <Row>
                                <div className='col-3 priceText'>
                                </div>
                                <div className='col-3 priceText'>
                                </div>
                                <div className='col-3 priceText'>
                                    <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> Total Bonus : </h4>
                                </div>
                                <div className='col-3 priceText'>
                                <h4 className='whiteText' style={{textAlign:"center", marginBottom: '12px'}}> {totalBonus} </h4>
                            </div>
                            </Row>
                        </Col>
                    </div>
                </div>
            </div>
        </>
        
        
    );
}

export default BrixCal;