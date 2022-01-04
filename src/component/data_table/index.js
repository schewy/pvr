import React from 'react'
import {useState, useEffect } from 'react';

function FilterTable(props) {
    const [sortCol, setSortCol] = useState(['Current Price'])
    const [sortBy, setSortBy] = useState("DES")
    const [data, setdata] = useState([props.data]);
    const d = props.data
    // console.log(d.length);
    useEffect(() => {
        setdata(d.filter((x) => x["Current Price"] !== ""));
        // setdata(props.data.filter((x) => x["Current Price"] !== ""))
        // setdata()
        // console.log(data)
    }, [d])
    // const data = props.data.filter((x) => x["Current Price"] !== "")
    // console.log(props.data.length);
        // setdata(props.data);
    // const fdata = data.filter((x) => x['Current Price'] !== "")
    const onClickSort = (col) => {
        if (sortBy === "DES") {
            setSortBy("ASD")
            setSortCol(col);
            const sorted = [...data].sort((a,b) => {
                if ( a[sortCol] < b[sortCol] ){
                return -1;
                }
                if ( a[sortCol] > b[sortCol] ){
                return 1;
                }
                return 0;
            })
            setdata(sorted);
        } else if (sortBy === "ASD"){
            setSortBy("DES")
            setSortCol(col);
            const sorted = [...data].sort((a,b) => {
                if ( a[sortCol] < b[sortCol] ){
                return 1;
                }
                if ( a[sortCol] > b[sortCol] ){
                return -1;
                }
                return 0;
            })
            setdata(sorted);
        }
    }
    // const sdata = fdata.sort((a,b) => {
    //     if ( a[sortCol] < b[sortCol] ){
    //     return -1;
    //     }
    //     if ( a[sortCol] > b[sortCol] ){
    //     return 1;
    //     }
    //     return 0;
    // })
    return (
        <table className='content-table table table-hover table-dark dataTable no-footer' cellPadding={0} cellSpacing={0}>
            <thead>
                <tr>
                    <th onClick={() => setSortCol("User Name")}> User Name </th>
                    <th onClick={() => setSortCol("City Name")}> City</th>
                    <th onClick={() => setSortCol("District Name")}> District </th>
                    <th onClick={() => setSortCol("Street Name")}> Street </th>
                    <th onClick={() => setSortCol("Special")}> Special </th>
                    <th onClick={() => onClickSort("Current Price")}> Current Price </th>
                </tr>
            </thead>
            <tbody>
                {data.map((row)=>(
                <tr>
                    <td> {row["User Name"]} </td>
                    <td> {row["City Name"]} </td>
                    <td> {row["District Name"]} </td>
                    <td> {row["Street Name"]} </td>
                    <td> {row["Special"]} </td>
                    <td> {row["Current Price"]} </td>
                    
                </tr>
                )
                )}
            </tbody>
        </table>
    )
}

export default FilterTable
