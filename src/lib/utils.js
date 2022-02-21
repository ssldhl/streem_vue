// Returns chart options required to show highchart time series stacked column chart
export function stackColumnChartOptions(){
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Result'
        },
        xAxis: {
            tickInterval: (24 * 3600 * 1000) * 5, // 5 days interval for clean output
            labels: {
                format: '{value:%Y-%b-%e}'
            },
            type: 'datetime',
            title: {
                text: 'timestamp'
            }
        },
        yAxis: {
            title: {
                text: 'Count of records'
            }
        },
        plotOptions: {
            column: {
                pointWidth: 20,
                stacking: 'normal'
            }
        },
        series: []
    }
}

// Accepts double aggregation result returned by API and then returns time series stacked column chart data
// final result format: [{name: media, data: [[timestamp, count]]}]
// example: [
// {name: 'Online', data: [[1564581600000, 265352], [1564754400000, 209228]]},
// {name: 'Social', data: [[1564581600000, 2652], [1564754400000, 2028]]}
// ]
export function stackColumnDataFromAggregate(aggregateResult) {
    const chartResponse = []

    // go through first aggregations buckets
    aggregateResult.aggregations.first_agg.buckets.forEach((first_bucket) => {
        // grab the date from first aggregation
        const date = first_bucket.key

        // for each date aggregated results iterate through second aggregation to grab media and count
        first_bucket.second_agg.buckets.forEach((second_bucket) => {
            const media = second_bucket.key
            const count = second_bucket.doc_count

            // check if media object exists
            const media_obj = chartResponse.find((resp) => resp.name === media)

            if(media_obj){
                // if it does then push to the same array object
                media_obj.data.push([date, count])
            }else{
                // if it does not then this is the first time we encountered the media, create a new record
                chartResponse.push({
                    name: media,
                    data: [[date, count]]
                })
            }
        })
    })

    return chartResponse
}

// Sends GET request to specified endpoint of the API; VITE_API_URL defined in environment variables
// Accepts: end point with out leading '/', params object and success call back function
// Shows alert on error and adds {error: true} to call back function, no need to handle error on caller
export function getRequest(endPoint, params, callBack) {
    const url = new URL(`${import.meta.env.VITE_API_URL}${endPoint}`)
    console.log(url)
    // add the params to the url going through all of them
    Object.keys(params).forEach((k) => url.searchParams.append(k, params[k]))

    fetch(url)
        .then(response => {
            // check if response is OK
            if(response.status === 200){
                response.json().then((data) => {
                    callBack(data)
                })
            }else{
                // if there is error show it and inform the caller about it
                response.json().then((data) => {
                    alert(data.error)
                    callBack({error: true})
                })
            }
        })
}