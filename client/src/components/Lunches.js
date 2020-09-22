import React, { Fragment } from 'react';
import {useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MissionKey from "./MissionKey";
import LaunchItem from "./LaunchItem";
import Launch from "./Launch";



const LAUNCHES_QUERY = gql`
    query LaunchesQuery{
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;
const Launches = () => {
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);

    if (loading) return <h4 className="display-4">Loading...</h4>;
    if (error) return console.log(error);

    return <Fragment>
        {
            data.launches.map( launch => (
                <LaunchItem key={launch.flight_number} launch={launch}/>
            ))
        }
    </Fragment>

}

export default () => (
    <Fragment>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Route exact path="/" component={Launches} />
        <Route exact path="/launch/:flight_number" component={Launch} />
    </Fragment>

)