class RecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mood: '',
            food: '',
            activity: '',
            foodwant: '',
            activitywant: '',
            grateful: '',
            date: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.record) {
            this.setState({
                mood: this.props.record.mood,
                food: this.props.record.food,
                activity: this.props.record.activity,
                foodwant: this.props.record.foodwant,
                activitywant: this.props.record.activitywant,
                grateful: this.props.record.grateful,
                date: this.props.record.date,
                id: this.props.record.id
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
        console.log(event.target.id, this);
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state);
        this.props.handleSubmit(this.state)
    }


    render() {
        return ( 
         <div className = "row center-align" >
           <div id = "recordForm"
            className = "col s12 m8 l9" >
            <h1 className = "formhi" > How are you feeling today ? < /h1> 
            <button onClick = {
                 () => this.props.toggleState('meditate', 'recordForm')
             } 
             className = "waves-effect waves-light btn"
             id="begin-meditate" >
             Let me meditate on it < /button> 
             <div className = "row" >
              <form className = "col s12"
                onSubmit = {this.handleSubmit} >
             <div className = "row" >
              <div className = "input-field col s12" >
               <input id = "mood"
                 required type = "text"
                 placeholder = "Mood"
                 className = "validate center-align"
                 onChange = {this.handleChange}
                 value = {this.state.mood}/> 
              </div> 
             </div>

            <div className = "row" >
             <div className = "input-field col s6" >
              <input id = "food"
                required type = "text"
                className = "validate center-align"
                onChange = {this.handleChange}
                value = {this.state.food}/> 
              <label for = "food" > What did you eat today ? </label> 
             </div > 
            
             <div className = "input-field col s6" >
              <input id = "foodwant"
               required type = "text"
               className = "validate center-align"
               onChange = {this.handleChange}
               value = {this.state.foodwant}/> 
              <label for = "foodwant" > What did you want to eat today ? </label> 
             </div > 
            </div>

            <div className = "row" >
             <div className = "input-field col s6" >
              <input id = "activity"
                required type = "text"
                className = "validate center-align"
                onChange = {this.handleChange}
                value = {this.state.activity}/> 
              <label for = "activity" > What did you do today ? </label> 
             </div >

             <div className = "input-field col s6" >
              <input id = "activitywant"
                required type = "text"
                className = "validate center-align"
                onChange = {this.handleChange}
                value = {this.state.activitywant}/> 
              <label for = "activitywant" > What did you want to do today ? </label> 
             </div> 
            </div>

            <div className = "row" >
             <div className = "input-field col s6" >
              <input id = "grateful"
                required type = "text"
                className = "validate center-align"
                onChange = {this.handleChange}
                value = {this.state.grateful}/> 
              <label for = "grateful" > What are you grateful for today ? </label> 
             </div >

             <div className = "input-field col s6" >
              <input id = "date"
                required type = "text"
                className = "validate center-align"
                onChange = {this.handleChange}
                value = {this.state.date}/> 
              <label for = "date" > What day is it ? </label> 
             </div > 
            </div> 

            <div className = "row" >
             <div className = "input-field col" >
             <button className = "left-align btn waves-effect waves-light"
               type = "submit"
               name = "action" > Submit <i className = "material-icons right" > send </i> 
             </button >
             <a href = "#" 
               onClick = {
                  () => this.props.toggleState('recordsList', 'recordForm')
               }
               className = "waves-effect waves-light btn"
               id = "see-all" >
               Back to all Records </a>
             </div> 
             </div> 
            </form> 
           </div> 
          </div> 
         </div>
        )
    }
}
