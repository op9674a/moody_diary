class Records extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                recordsList: true,
                recordForm: false,
                showRecord: false,
                editRecord: false,
                forest: false,
                records: [],
                record: {}
            }

            this.toggleState = this.toggleState.bind(this);
            this.deleteRecord = this.deleteRecord.bind(this);
            this.getRecords = this.getRecords.bind(this);
            this.getRecord = this.getRecord.bind(this);
            this.handleCreate = this.handleCreate.bind(this)
            this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
            this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
            this.getChartRecords = this.getChartRecords.bind(this)
        }

        componentDidMount() {
            this.getRecords()
            this.getChartRecords()
        }

        toggleState(st1, st2) {
            this.setState({
                [st1]: !this.state[st1],
                [st2]: !this.state[st2]
            })
        }

        getRecords() {
            fetch('/records')
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        records: data
                    })
                }).catch((error) => console.log(error))
        }

        getRecord(record) {
            this.setState({
                record: record
            })
        }

        handleCreate(record) {
            const updateRecord = this.state.records
            updateRecord.unshift(record)
            this.setState({
                records: updateRecord
            })
        }

        handleCreateSubmit(record) {
            fetch('/records', {
                method: 'POST',
                body: JSON.stringify(record),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                return res.json()
            }).then(newRecord => {
                this.handleCreate(newRecord)
                this.getRecords()
                this.toggleState('recordsList', 'recordForm')
            }).catch(error => console.log(error))
        }

        handleUpdateSubmit(record, index) {
            fetch('/records/' + record.id, {
                body: JSON.stringify(record),
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).then(updateRecord => {
                return updateRecord.json()
            }).then(jsonedRecord => {
                this.getRecords()
                this.toggleState('recordsList', 'editRecord')
            }).catch(error => console.log(error))
        }

        deleteRecord(record, index) {
            fetch('records/' + record.id, {
                method: 'DELETE'
            }).then(data => {
                this.setState({
                    records: [
                        ...this.state.records.slice(0, index),
                        ...this.state.records.slice(index + 1)
                    ]
                })
            })
        }

        getChartRecords() {
            fetch('/records')
                .then((response) => response.json())
                .then((data) => {
                    makeChart(data)
                }).catch((error) => console.log(error))
        }


        render() {
                return ( <
                    div >

                    {
                        this.state.recordsList ? < button onClick = {
                            () => this.toggleState('recordForm', 'recordsList')
                        }
                        className = "waves-effect waves-light btn"
                        id = "greeting" >
                        <
                        i className = "material-icons right" > playlist_add < /i>
                        How are you feeling today ? < /button> : ''}

                        {
                            this.state.recordsList ?
                                <
                                RecordsList
                            toggleState = {
                                this.toggleState
                            }
                            records = {
                                this.state.records
                            }
                            getRecord = {
                                this.getRecord
                            }
                            deleteRecord = {
                                this.deleteRecord
                            }
                            /> : ''}

                            {
                                this.state.recordForm ?
                                    <
                                    RecordForm
                                toggleState = {
                                    this.toggleState
                                }
                                handleCreate = {
                                    this.handleCreate
                                }
                                handleSubmit = {
                                    this.handleCreateSubmit
                                }
                                /> : ''
                            }


                            {
                                this.state.forest ? <
                                    Forest
                                toggleState = {
                                    this.toggleState
                                }
                                />: ''
                            }

                            {
                                this.state.editRecord ?
                                    <
                                    EditRecordForm
                                toggleState = {
                                    this.toggleState
                                }
                                record = {
                                    this.state.record
                                }
                                records = {
                                    this.state.records
                                }
                                handleCreate = {
                                    this.handleCreate
                                }
                                handleUpdateSubmit = {
                                    this.handleUpdateSubmit
                                }
                                handleSubmit = {
                                    this.handleSubmit
                                }
                                editRecord = {
                                    this.state.editRecord
                                }
                                /> : ''
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
                            events: ["click"]
                        }
                    });
                    myChart.update()
                }
