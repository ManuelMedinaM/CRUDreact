import React,{Component} from 'react';

export default class Formulario extends Component {

    //ref
    tituloRef = React.createRef()
    entradaRef = React.createRef()

    crearPost = (e)=>{
        e.preventDefault()
        //leer ref
        const post ={
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId:1
        }
        // mandar por props
        this.props.crearPost(post)
    }

    render() {
        return (
           <form onSubmit={this.crearPost} className="col-8">
            <legend className="text-center">Crear nuevo post</legend>
            <div className="form-group">
                <label>Titulo Post: </label>
                <input ref={this.tituloRef} type="text" className="form-control" placeholder="titulo"/>
                <label>Contenido: </label>
                <textarea ref={this.entradaRef} type="text" className="form-control" placeholder="titulo">

                </textarea>
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
           </form>
        );
    }
}