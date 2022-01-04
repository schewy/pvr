const axios = require('axios');
const { count } = require('console');

// const  instance = axios.create({ baseURL: 'https://api.opensea.io/api/v1/asset/0x18cb9db75fa62a9717aa98292b939e579b7c7ccd/'})
// let url = "https://api.opensea.io/api/v1/asset/0x18cb9db75fa62a9717aa98292b939e579b7c7ccd/16843329/"
let ref = "https://api.opensea.io/api/v1/assets?asset_contract_address=0x18cb9db75fa62a9717aa98292b939e579b7c7ccd&order_direction=desc&"

const getData = () => {
    let main = new Array();
    let counter = 0;
    let offset = 0;
    let data_array = [];
    while (offset <= 5950){
        url = `${ref}offset=${offset}&limit=50`;
        axios.get(url).then ((res)=>{
            // console.log(res.data.assets)
            res.data.assets.forEach((x)=>{
                let row = {}
                // username
                if(x.owner.user === null) {
                    x.owner.user = {username: "noname"}
                };
                // console.log(data.owner);
                if(x.owner.user.username !== null)
                {
                    row.username = x.owner.user.username;
                } else {
                    row.username = "noname";
                }
                // address
                row.address = x.owner.address;
                // token id
                row.token_id = x.token_id
                x.traits.forEach((trait)=> {row[trait.trait_type] = trait.value})
                // price
                if (x.sell_orders !== null){
                    row.current_price = Number(x.sell_orders[0].current_price)/ Math.pow(10,18)
                    // console.log(row.current_price);
                } else {
                    row.current_price = 0
                }
                main.push(row);
                if (main.length === 6000){
                    console.log(main);
                }
            })
        }).catch((err)=>{console.error(err)})
            // console.log(res.data.assets.length)
            offset += 50;
            // console.log(main);
        }
    }

export default getData;
// console.log(main);
