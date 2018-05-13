class Forest extends React.Component {
    render() {
        return ( <
            div id = "forest" >

            <
            a href = "#"
            onClick = {
                () => this.props.toggleState('recordsList', 'forest')
            }
            id = "done-meditating" >
            Back to all Records < /a> < /
            div >
        )
    }
}