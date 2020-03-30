import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import axios from 'axios'
import Header from './Header';
import Navegacion from './Navegacion';
import Posts from './Posts'
import SinglePost from './SinglePost'
import Formulario from './Formulario'
import Editar from './Editar'
class Router extends Component {
    state = {
        post:[]    
        }
        componentDidMount() {
            this.obtenerPost()
        }
        obtenerPost=()=>{
            axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(result => {
                this.setState({
                    post: result.data
                })
            })
        }

        borrarPost = (id)=>{
            axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(
                resu=>{
                    console.log(id)
                    if(resu.status===200){
                        const posts = [...this.state.post];

                        let resultado = posts.filter(post=>(
                            post.id != id
                        ));
                        this.setState({
                            post:resultado
                        })
                    }
                }
            )
        }

        crearPost = (post)=>{
            axios.post(`https://jsonplaceholder.typicode.com/posts`,{post})
            .then((result) => {
                if(result.status===201){

                    let postId  = {id: result.data.id}
                    console.log(postId)
                    console.log(post)

                    const nuevoPost = Object.assign({},result.data.post,postId)
                    
                    this.setState(prevState=>({
                        // al pasasrle el prev estate como argumento lo que estamoshaciendo es parasarle el state anterior que tenia, con esto podemos hacer verificacione
                        post: [...prevState.post, nuevoPost]
                    }))
                    
                }                
            })
        }

        modificarPost=(postActualizado)=>{
            console.log(postActualizado)
            axios.put(`https://jsonplaceholder.typicode.com/posts/${postActualizado.id}`,{postActualizado})
            .then((result) => {
                console.log(result)
            })
        }

        render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header/>
                        <Navegacion/>
                        <Switch>
                            <Route exact path="/" render={()=>{
                                return(
                                    <Posts
                                        posts={this.state.post}
                                        borrarPost={this.borrarPost}
                                    />
                                )
                            }}/>

                            <Route exact path="/post/:postId" render={
                                (props)=>{
                                    let idPost = props.location.pathname.replace('/post/','');
                                    
                                    const posts = this.state.post

                                    let filtro;
                                    filtro = posts.filter(post=>(
                                        post.id===Number(idPost)
                                    ))
                                    
                                    return(
                                        <SinglePost
                                            post = {filtro[0]}
                                        />
                                    );

                                }
                            }/>

                            <Route exact path='/crear' render={()=>{
                                return(
                                    <Formulario
                                        crearPost={this.crearPost}
                                    />
                                )
                            }}/>

                            <Route exact path="/editar/:postId" render={
                                (props)=>{
                                    let idPost = props.location.pathname.replace('/editar/','');
                                    
                                    const posts = this.state.post

                                    let filtro;
                                    filtro = posts.filter(post=>(
                                        post.id===Number(idPost)
                                    ))
                                    
                                    return(
                                        <Editar
                                            post = {filtro[0]}
                                            modificarPost ={this.modificarPost}
                                        />
                                    );

                                }
                            }/>
                        </Switch>
                    </div>

                </div>
            </BrowserRouter>
        );
    }
}
export default Router;