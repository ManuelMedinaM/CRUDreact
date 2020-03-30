import React,{Component} from 'react';

export default class Editar extends Component {

    //ref
    tituloRef = React.createRef()
    entradaRef = React.createRef()

    editarPost = (e)=>{
        e.preventDefault();
        //leer ref
        const post ={
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId:1,
            id: this.props.post.id
        }
        // mandar por props
        this.props.modificarPost(post)
    }

    cargarFormulario=()=>{
        // asi controlamos el la carga de los props que al principio no tendran nada
        if(!this.props.post) return null;
        const{title, body} =this.props.post


        return( <form onSubmit={this.editarPost} className="col-8">
        <legend className="text-center">Editar post</legend>
        <div className="form-group">
            <label>Titulo Post: </label>
            <input ref={this.tituloRef} type="text" className="form-control" defaultValue={title}/>
            <label>Contenido: </label>
            <textarea ref={this.entradaRef} type="text" className="form-control" defaultValue={body}>

            </textarea>
        </div>
        <button type="submit" className="btn btn-primary">Guardar Post</button>
       </form>)
    }

    render() {
        return (
          <React.Fragment>
              {this.cargarFormulario()}
          </React.Fragment>
        );
    }
}