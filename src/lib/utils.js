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
            tickInterval: 24 * 3600 * 1000 * 5, // 5 days interval
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
export function stackColumnDataFromAggregate(aggregateResult) {
    const categories = []
    const chartResponse = []

    aggregateResult.aggregations.first_agg.buckets.forEach((first_bucket) => {
        const date = first_bucket.key

        first_bucket.second_agg.buckets.forEach((second_bucket) => {
            const media = second_bucket.key
            const count = second_bucket.doc_count

            const media_obj = chartResponse.find((resp) => resp.name === media)
            if(media_obj){
                media_obj.data.push([date, count])
            }else{
                chartResponse.push({
                    name: media,
                    data: [[date, count]]
                })
            }
        })
    })

    return {categories, chartResponse}
}

// Sends GET request to specified endpoint of the API
// Accepts: end point with out leading '/', params is an object and success call back function
// Shows alert on error and adds {error: true} to call back function
export function getRequest(endPoint, params, callBack) {
    const url = new URL(`http://localhost:4000/${endPoint}`)
    Object.keys(params).forEach((k) => url.searchParams.append(k, params[k]))

    fetch(url)
        .then(response => response.json())
        .then(data => {
            callBack(data)
        })
}