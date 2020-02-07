import React from 'react';

import classes from './Input.module.css';

import GoogleMapReact from 'google-map-react';

import MyImage from '../../../assets/map-marker-icon.png'

const input = ( props ) => {
    const MyReact = () => <div className={classes.Marker}><img src={MyImage} alt ="marker" width ="50px" height="50px"></img></div>
    // const renderMarkers = (map, maps) => {
    //     //console.log(props.value)
    //     let marker = new maps.Marker({
    //     position: { lat: props.value[0], lng: props.value[1] },
    //     map,
    //     title: 'your location'
    //     });
    //     return marker;
    // };

    let validationError = '';
    let inputElement =[];
    // console.log(props.elementName,props.invalid,props.touched)
    if (props.invalid && props.shouldValidate && props.touched) {
        validationError = props.messages.map(element => <p key={props.elementTitle} className={classes.ValidationError}>{element}</p>);
    }
    let scase = props.elementType;
    if(props.elementOptions)
        scase = "Select";
    //console.log(props.value,props.elementTitle)
    //console.log(scase)
    switch ( scase.toLowerCase() ) {
        case ( 'date' ):
            inputElement =  <input  
                type = "date"
		value={props.value}
                className={classes.InputElement} 
                onChange={props.changed} />;
            break;
        case ( 'input' ):
            inputElement = <input
                className={classes.InputElement}
                placeholder = {props.elementTitle}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'location' ):

            inputElement = 
                <div  style={{ height: '250px', width: '100%' }}>
                    <GoogleMapReact 
                    bootstrapURLKeys={{ key: "AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28"}}
                    defaultZoom={5}
                    defaultCenter={[36,51.9]}
                    onClick = {(event) => props.changed(event,'loc')}
                    // yesIWantToUseGoogleMapApiInternals ={true}
                    // onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                    >
                    <MyReact
                        lat = {props.value[0]}
                        lng ={props.value[1]}
                        >
                    </MyReact>
                    </GoogleMapReact>
                </div>;
            break;
        case ( 'text' ):
            inputElement = <input
            className={classes.InputElement}
            placeholder = {props.elementTitle}
            value={props.value}
            onChange={props.changed} />;
            break;
        default:
            if(props.elementName === "Base_Location"){
                inputElement = (
                    <select
                        className={classes.InputElement}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementOptions.map(option => (
                            <option key={option.label} value={option.label}>
                                {option.label +" : " +JSON.stringify(option.value)}
                            </option>
                        ))}
                    </select>
                );
            }
            else{
                inputElement = (
                    <select
                        className={classes.InputElement}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementOptions.map(option => (
                            <option key={option.label} value={option.label}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                );
            }
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementTitle}</label>
            {inputElement}
            {validationError}
        </div>
    );

};


export default input;