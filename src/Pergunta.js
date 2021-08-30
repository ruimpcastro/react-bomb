import React from 'react'
import './Pergunta.css'

class Pergunta extends React.Component{
    constructor(props) {
        super(props);
        this.state={resposta: null};
    }

    handleClick(resposta){
        this.props.parentCallback(resposta, this.props.parent);
    }

    render(){
        return(
            <div className="pergunta-normal">
                {/*<div className="pergunta-invisible">*/}
                <h2>Quem descobriu o aquecimento global?</h2>
                <button className="buttons" onClick={() => this.handleClick("Guy Stewart Callendar")}>Guy Stewart Callendar</button>
                <button className="buttons" onClick={() => this.handleClick("Kurt Gödel")}>Kurt Gödel</button>
            </div>
        )
    }
}

export default Pergunta;