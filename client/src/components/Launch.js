import React, { Fragment } from 'react';
import {useQuery, gql} from '@apollo/client';
import Moment from "react-moment";
import classNames from 'classnames';
import { Link } from "react-router-dom";


const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!){
        launch(flight_number: $flight_number) {
        flight_number
        mission_name
        launch_year
        launch_date_local
        launch_success
        details
        rocket{
          rocket_id
          rocket_name
          rocket_type
        }
        links{
          mission_patch
          youtube_id
        }
    }
}
`;


export default function Launch (props) {

    let { flight_number } = props.match.params;
    flight_number = parseInt( flight_number );
    const { loading, error, data } = useQuery(LAUNCH_QUERY, {variables:{flight_number}});

    if (loading) return <h4 className="display-4">Loading...</h4>;
    if (error) return console.log(error);
    const { mission_name, launch_year, launch_date_local,launch_success,details,  rocket:{rocket_id, rocket_name, rocket_type}, links:{mission_patch, youtube_id}} = data.launch;
    console.log(data);
    const videoSrc = `https://www.youtube.com/embed/${youtube_id}`;
    return (
        <div className="row">
            <div className="col-md-8">
                <h1 className="display-3 my-3"><small className="text-dark mr-2">Mission:</small><span className="text-monospace">{mission_name}</span></h1>
                <h3 className="mb-4">Launch Details</h3>
                <p className="lead">{details}</p>
                <ul className="list-group">
                    <li className="list-group-item">Flight Number: { flight_number }</li>
                    <li className="list-group-item">Launch Year: { launch_year }</li>
                    <li className="list-group-item">Launch Success: <span className={classNames({
                        'text-success' : launch_success,
                        'text-danger'   :!launch_success
                    })}>{ launch_success ? 'Yes' : 'No' }</span></li>
                    <li className="list-group-item">Date: <Moment format="YYYY-MM-DD HH:mm">{ launch_date_local }</Moment></li>
                </ul>
                <h3 className="my-3">Rocket Details</h3>
                <ul className="list-group">
                    <li className="list-group-item">Rocket ID: { rocket_id }</li>
                    <li className="list-group-item">Rocket Name: { rocket_name }</li>
                    <li className="list-group-item">Rocket Type: { rocket_type }</li>
                </ul>
            </div>
            <div className="col-md-4">
                {
                    mission_patch
                    ? <img src={mission_patch} alt={mission_name + 'patch'} className="img-fluid"/>
                    : ''
                }
                {
                    youtube_id
                        ?   <div className="embed-responsive embed-responsive-16by9 mt-4">
                            <iframe className="embed-responsive-item" src={videoSrc} allowFullScreen></iframe>
                        </div>
                        : ''
                }


            </div>
            <div className="col-sm-12 my-5">
                <hr className="divider"/>
                <Link to="/" className="btn btn-secondary">Back</Link>
            </div>

        </div>
    );
}
