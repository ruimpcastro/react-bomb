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
                <h1>Este grupo merece um 20 pela noitada?</h1>
                <button className="buttons" onClick={() => this.handleClick("sim")}>Sim</button>
                <button className="buttons" onClick={() => this.handleClick("nao")}>Não</button>
            </div>
        )
    }
}

export default Pergunta;