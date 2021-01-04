module.exports = {
    port: 3000,
    static_folder_name: 'static', // default
    time_resolution: 60000, // time in miliseconds default 1 minute = 60000 sec
    max_requests_in_time_resolution: 1000,// how much attempts in time_resolution can be accessed
    error_message: 'Sorry, rate limit is reached.'
}