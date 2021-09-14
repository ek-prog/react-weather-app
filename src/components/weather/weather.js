
import React from "react";



import "./weather.css";


class Weather extends React.Component {

    render() {
        return(
            <div className="container">
                <div>
                    <h2>
                        {this.props.city}
                    </h2>
                    <h5 className="py-4">
                        < i className={`wi ${this.props.icon}display-4`} />
                    </h5>
                    {this.props.temp_celsius ?
                        <h2 className="py-2">{this.props.temp_celsius}&deg;</h2> :
                        null
                    }
                    {/** show min and max temp*/}
                    {minmaxTemp(this.props.temp_min, this.props.temp_max)}

                    <h4 className="py-3">{this.props.description}</h4>
                </div>
            </div>
        );
    }

};



function minmaxTemp(min, max){
    if(min && max){
        return (
            <h3>
                <span className="px-4"> min {min}&deg;</span>
                <span className="px-4"> max {max}&deg;</span>
            </h3>
        )
    }
}
export default Weather;