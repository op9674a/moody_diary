class Meditate extends React.Component {
    render() {
        return (
            <div id = "meditate">
                <div id="instruct">
                  Hang out here and enjoy the color transitions as you reflect on your day. Head back whenever you are ready by clicking below.
                </div>
              <div id = "forest" >
             </div >
             <button
              className ="waves-effect waves-light btn"
              id = "done-meditating"
              onClick = {
                  () => this.props.toggleState('recordsList', 'meditate')
              }>
              Back to all Records </button>
             </div>
        )
    }
}
