export class QueryStats {
    stats = {}

    to_chart_format_qps(type) {
        // Returns the object needed to display a dataset in ApexCharts
        // Example:  {
        //    name: 'Dataset',
        //    data: [
        //        {x: 1, y: 2},
        //        {x: 3, y: 5}
        //    ]
        // }
        let data = this.stats[type]
        if (!this.stats.hasOwnProperty(type)) {
            // Paint data and subsequently this function might get call while empty
            // before the http request has been done or answered.
            //
            // While there is no data, we do not know what 'TYPE' exists, as this.stats is '{}'
            // So if we do this.stats[type] as this.stats is an empty dict it will throw an exception
            // we handle this by just assigning the temporal var 'data' to an empty list, milliseconds
            // after this, data will arrive, and it will be re-painted correctly
            data = []
        }
        return {
            name: type,
            data: data.map((val) => {
                return {x: val[1], y: val[2]}
            })
        }
    }

    to_chart_format_duration(type) {
        let data = this.stats[type]
        if (!this.stats.hasOwnProperty(type)) {
            data = []
        }
        return {
            name: type,
            data: data.map((val) => {
                return {x: val[1], y: val[3]}
            })
        }
    }

    constructor(data) {
        for (const datum of data) {
            let type = datum[4]
            if (!this.stats.hasOwnProperty(type)) {
                this.stats[type] = []
            }
            this.stats[type].push(datum)
        }
    }
}
