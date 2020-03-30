import React,{Component} from 'react';
import Post from './Post'

export default class Listado extends Component {
    mostrarPost = () =>{
        const posts = this.props.posts

        // para que no cargue si no hay nada
        if(posts.length ===0) return null;

        return(
            <React.Fragment>
                {Object.keys(posts).map(post=>(
                    <Post
                        borrarPost={this.props.borrarPost}
                        key={post}
                        info={this.props.posts[post]}
                    />
        ))}
            </React.Fragment>
        )        

    }
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            ID
                        </th>
                        <th scope="col">
                            Titulo
                        </th>
                        <th scope="col">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.mostrarPost()}
                </tbody>
            </table>
        );
    }
}