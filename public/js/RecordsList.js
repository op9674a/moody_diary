class RecordsList extends React.Component {
    constructor(props) {
        super(props)
        this.getChartRecords = this.getChartRecords.bind(this)
    }

    componentDidMount() {
        this.getChartRecords()
    }

    getChartRecords() {
        fetch('/records')
            .then((response) => response.json())
            .then((data) => {
                makeChart(data)
            }).catch((error) => console.log(error))
    }

    render() {
        console.log(this);
        return ( <
            div className = "cards-container" > {
                this.props.records.map((record, index) => {
                    return ( <
                        div className = "row" >
                        <
                        div className = "card small" >
                        <
                        div className = "card-content" >
                        <
                        span className = "card-title center" > I feel...{
                            record.mood
                        } < /span> <
                        div className = "row center" >
                        <
                        div className = "col" >
                        <
                        p > WHAT I ATE: {
                            record.food
                        } < /p>
                        <
                        p > WHAT I WANTED TO EAT: {
                            record.foodwant
                        } < /p>
                        <
                        p > WHAT I DID: {
                            record.activity
                        } < /p> < /
                        div >
                        </div>

                        <
                        div className = "row center" >
                        <
                        div className = "col" >
                        <
                        p > WHAT I WANTED TO DO: {
                            record.activitywant
                        } < /p>
                        <
                        p > I AM GRATEFUL FOR: {
                            record.grateful
                        } < /p>
                        <
                        p > DATE: {
                            record.date
                        } < /p>< /
                        div > <
                        /div>

                        < /div >

                        <
                        div className = "card-action" >
                        <
                        span > < a onClick = {
                            () => {
                                this.props.toggleState('recordsList', 'editRecord');
                                this.props.getRecord(record)
                            }
                        }
                        className = "btn-floating waves-effect waves-light btn-small" >
                        <
                        i className = "material-icons" > edit < /i></a > < /span> <
                        span > < a onClick = {
                            () => this.props.deleteRecord(record, index)
                        }
                        className = "btn-floating waves-effect waves-light btn-small" > < i className = "material-icons" > delete < /i>Delete</a > < /span> < /
                        div > <
                        /div>

                        <
                        /div>


                    )
                })
            } <
            /div>
        )
    }
}

const makeChart = (data) => {
    console.log(data);
    //get Chart Element
    const ctx = document.getElementById("myChart");
    //map over record moods
    const recordMoodArr = data.map(record => record.mood)
    console.log(recordMoodArr);
    //count each instance of mood
    const wordFreq = arr => {
        let wordCount = {};
        const freqMoodArr = arr.toString().toLowerCase().split(",")
        console.log(freqMoodArr);
        const moodNum = freqMoodArr.forEach(word => {
            // if the word doesn't exist in our object
            if (!wordCount[word]) {
                wordCount[word] = 1;
            } else {
                wordCount[word]++;
            }
            console.log(wordCount);
        }) // closes forEach function
        return wordCount;
    }

    wordFreq(recordMoodArr)

    //store count of each instance of mood
    const moodArrObj = [wordFreq(recordMoodArr)]
    console.log(moodArrObj);
    //grab count of each instance of mood
    //https://stackoverflow.com/questions/7391362/retrieving-keys-from-json-array-key-value-pair-dynamically-javascript
    const moodVal = Object.values(moodArrObj[0])
    console.log(moodVal);
    //remove duplicates from moods for chart labels
    //https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    const dup = [...new Set(recordMoodArr)];
    console.log(dup);
    console.log(dup.length);

    myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: dup,
            datasets: [{
                label: 'All Moods',
                data: moodVal,
                backgroundColor: ["#F7AEF8", "#B388EB", "#8093F1", "#72DDF7", "#DE369D", "#FFDDE2", "#1DD3B0", "#BDADEA", "#B6C2D9", "#709775", "#60E1E0", "#4C0827", "#DB7F8E"]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            events: ['click']
        }
    });
    myChart.update()
}
