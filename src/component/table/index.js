import React from 'react'
import '../../App.css';

const data_table = (data) => {
    const columns = data[0] && Object.keys(data[0])
    return (
        <table className='content-table table table-hover table-dark dataTable no-footer' cellPadding={0} cellSpacing={0}>
            <thead>
                <tr> {data[0] && columns.map((heading) => <th> {heading}</th>)}</tr>
            </thead>
            <tbody>
                {data.map((row)=>(
                <tr>
                    {columns.map(column=> <td> {row[column]} </td>)}
                </tr>
                )
                )}
            </tbody>
        </table>
    );
}

export default data_table;