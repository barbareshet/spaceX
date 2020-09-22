import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer role="site-info" className="row">
            <div className="col-sm-12 text-center lead">
                This App is using the following technologies: express, graphql, apollo, react & react router, bootswatch, the spaceX api
            </div>
            <div className="col-md-6 text-left">
                made by: <Link to="https://github.com/barbareshet">ido barnea</Link>
            </div>
            <div className="col-md-6 text-right">
                <span className='text-muted'>&copy;</span>
                <Moment format="YYYY" className='text-muted ml-2'></Moment>
            </div>

        </footer>
    )
}

export default Footer