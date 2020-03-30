import React,{Component} from 'react';
import { Link } from 'react-router-dom';

export default class Post extends Component {

    render() {
        const {id,title} = this.props.info
        return (
            <tr>
                <td>
                    {id}
                </td>
                <td>
                    {title}
                </td>
                <td>
                    <Link to={`/post/${id}`} className="btn btn-primary">Ver</Link>
                    <Link to={`/editar/${id}`} className="btn btn-warning">Editar</Link>
                    <button onClick={()=>this.props.borrarPost(id)} type="button" className="btn btn-danger">Borrar</button>
                </td>
            </tr>
        );
    }
}