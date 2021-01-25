import React from "react";
import axios from "axios";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            loading: true,
            products: []
        };
    }

    componentDidMount() {
        const url = "https://app.getrecall.com/api/products";
        axios.get(url).then(resp=>{
            console.log(resp)
            console.log(resp.data.products);
            this.setState({
                products:resp.data.products,
                loading:false
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        var data = this.state.products;
        var columns = [
            {
                Header: "Image",
                style :{
                    textAlign:'center'
                },
                width :200,
                maxWidth : 700,
                Cell: row => (
                    <div >
                        <a href={row.original.link} target="_blank">
                            <img height={100} width={100} src={row.original.thumbnail} alt="Default"/>
                        </a>
                    </div>
                )
            },
            {
                Header: "Features",
                style :{
                    textAlign:'left'
                },
                width :1080,
                maxWidth : 1500,
                Cell: row => {
                    const features = row.original.features.map((f, index) => (<tr key={index}>
                        <td >{f}</td>
                    </tr>));
                    const list = (
                        <table style={{textAlign: "left"}}>{features}</table>
                    )
                    return (
                        <p> {list}</p>
                    );
                },
            },
            {
                Header: "Specifications",
                style :{
                    textAlign:'left'
                },
                width :600,
                maxWidth : 1500,
                Cell: row => (
                    <ReactTable
                        className="-striped -highlight"
                        data={row.original.specifications}
                        columns={[{
                            Header: "Name",
                            accessor: "name",
                        }, {
                            Header: "Category",
                            accessor: "category",
                        }, {
                            Header: "Value",
                            accessor: "value",
                        }]}
                        showPagination={true}
                        defaultPageSize={3}
                    >
                    </ReactTable>
                )
            },
            {
                Header: "userID",
                accessor: "_id",
                style :{
                    textAlign:'left'
                },
                width :250,
                maxWidth : 400
            },
            {
                Header: "Name",
                accessor: "name",
                style :{
                    textAlign:'left'
                },
                width :450,
                maxWidth : 600
            },
            {
                Header: "Description",
                accessor: "description",
                style :{
                    textAlign:'left'
                },
                width :1000,
                maxWidth : 1500
            },
            {
                Header: "Category",
                accessor: "category",
                style :{
                    textAlign:'left'
                },
                width :200,
                maxWidth : 250,
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                        return true;
                    }
                    if (filter.value === "Embedded Flash Storage") {
                        return row[filter.id] === "Embedded Flash Storage";
                    }
                    return row[filter.id] === "GPU & Edge AI";
                },
                Filter: ({filter, onChange}) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{width: "100%"}}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        <option value="Embedded Flash Storage">Embedded Flash Storage</option>
                        <option value="GPU & Edge AI">GPU & Edge AI</option>
                    </select>
            },
            {
                Header: "Subcategory",
                accessor: "subcategory",
                style :{
                    textAlign:'left'
                },
                width :130,
                maxWidth : 200
            },
            {
                Header: "CreatedAt",
                accessor: "createdAt",
                style :{
                    textAlign:'left'
                },
                width :250,
                maxWidth : 300
            },
            {
                Header: "UpdatedAt",
                accessor: "updatedAt",
                style :{
                    textAlign:'left'
                },
                width :250,
                maxWidth : 300
            },
            {
                Header: "__v",
                accessor: "__v",
                style :{
                    textAlign:'left'
                },
                width :60,
                maxWidth : 100
            },
            {
                Header: "ModelId",
                accessor: "modelId",
                style :{
                    textAlign:'left'
                },
                width :200,
                maxWidth : 300
            },
            {
                Header: "Pid",
                accessor: "pid",
                style :{
                    textAlign:'left'
                },
                width :190,
                maxWidth : 200
            },
            {
                Header: "Datasheet",
                accessor: "datasheet",
                style :{
                    textAlign:'left'
                },
                width :700,
                maxWidth : 1000
            },
            {
                Header: "Informations",
                Cell : row => {
                    return(
                        <div>
                            <button><a href={row.original.link} target="_blank">More Info...</a></button>
                        </div>
                    )
                },
                style :{
                    textAlign:'left'
                },
                width :100,
                maxWidth : 1000
            },
        ]
        if (this.state.loading) {
            return <div>
                        <p>loading...</p>
                    </div>;
        }
        return (
            <div>
                <ReactTable
                    className="-striped -highlight"
                    data={data}
                    filterable
                    columns={columns}
                    defaultPageSize={10}
                >
                </ReactTable>
            </div>
        );
    }
}
