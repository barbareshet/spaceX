const axios = require('axios');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');

//Creating Launch Type for graphql

const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        details : {type : GraphQLString },
        links: {type : LinkType },
        rocket: { type: RocketType }
    })
});

//Creating Rocket Type for graphql

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    })
});
const LinkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
        mission_patch: { type: GraphQLString },
        mission_patch_small: { type: GraphQLString },
        video_link: { type: GraphQLString },
        youtube_id: { type: GraphQLString },
    })
});

//Root Query
//The basic root query to the API
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data);
            }
        },
        //Getting a single launch by flight number / ID
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data);
            }
        },
        //Getting a single launch by flight number / ID
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                    .then(res => res.data);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});