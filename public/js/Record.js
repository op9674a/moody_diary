class Record extends React.Component {
  render () {
    return (
      <div>
        <div>
          <h3>Record Name:{this.props.record.mood}</h3>
          <p><span>What you ate:</span>{this.props.record.food}</p>
          <p><span>What you did:</span> {this.props.record.activity}</p>
          <p><span>What you wanted to do:</span> {this.props.record.activitywant}</p>
          <p><span>What you wanted to eat:</span> {this.props.record.foodwant}</p>
          <p><span>What you are grateful for:</span> {this.props.record.grateful}</p>
          <p><span>What day is it:</span> {this.props.record.date}</p>
        </div>

         <div>
           <button onClick={()=> this.props.toggleState('recordsList', 'showRecord')}>See All Records</button>
         </div>
      </div>
    )
  }
}
