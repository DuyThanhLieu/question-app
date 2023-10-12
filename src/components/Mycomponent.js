import React from 'react'

class Mycomponent extends React.Component {
    state = {
        name: 'Eric',
        address: 'HoidanIt',
        age: 23
    };
    handleClick = (event) => {
        alert("click me 1");

        this.setState({
            name: 'Thanh'
        })


    }
    render() {
        return (
            <div>my first component {this.state.name}
                <button onClick={this.handleClick}>click me</button>
            </div>
        );
    }
}
export default Mycomponent;