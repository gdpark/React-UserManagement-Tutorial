import React from 'react';

class CustomerDelete extends React.Component{
  
    deleteCustomer(id){

        console.log("Click CustomerDelete: ");

        const url ='/api/customers/' + id;
        fetch(url,{
            method: 'DELETE'
        });

        console.log("run CustomerDelete: ");

        this.props.stateRefresh();
    }

    render(){
        return (
            <button onClick = { (e) => {this.deleteCustomer(this.props.id)}}>삭 제</button>
        )
    }
}

export default CustomerDelete;