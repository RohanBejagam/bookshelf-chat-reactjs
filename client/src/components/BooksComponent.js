import React,{Component} from 'react';
import { Table,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from './LoadingComponent.js';
import { useHistory } from 'react-router-dom';


function RenderBook ({roll,book, changeSelected ,isAdmin,isSignedIn,toggleDeleteModal,toggleEditModal,i}) {
    const history = useHistory();
    
//    var temp=this.props.auth.userinfo.roll;
//    console.log(temp)
    const handleButtonClick =()=>{
        
        history.push(`/QRcode?isbn=${book.isbn}`);
    }
    return (
            <React.Fragment>
            <td>
            {i}
            </td>
            <td>
            <Link to={`/books/${book._id}`}>
            {book.name}
            </Link>
            </td>
            <td>
            {book.isbn}
            </td>
            <td>
                {book.author}
            </td>
            <td>
                {book.copies}
            </td>
            {isSignedIn &&!isAdmin?( <td>
                
            <Button color="info" onClick={handleButtonClick}>Request</Button>
        
            </td> ):(<React.Fragment/>)}
            {isAdmin?(<td><span onClick={()=>{changeSelected(book._id); toggleEditModal(); }} className="Option fa fa-pencil"/>
                          &nbsp; &nbsp; <span onClick={()=>{changeSelected(book._id); toggleDeleteModal();}} className="Option fa fa-trash"/>
                        </td>):(<React.Fragment/>)}
                      
            </React.Fragment>
       );
}


class Booklist extends Component {

    constructor(props){
        super(props);
        this.state={
            
        }
        this.i=1;
    }


    componentDidMount() {
        window.scrollTo(0, 0)
      }
      
render(){
    
    const list = this.props.books.map((book) => {
        return (
                <tr key={book.name}>
                    <RenderBook roll={this.props.isSignedIn && this.props.isAdmin?this.props.auth.userinfo.roll:'null'} book={book} isAdmin={this.props.isAdmin} isSignedIn={this.props.isSignedIn} changeSelected={this.props.changeSelected}
                    toggleDeleteModal={this.props.toggleDeleteModal}
                    toggleEditModal={this.props.toggleEditModal}
                    i={this.i++}
                    />
                </tr>
        );
    });

    if (this.props.booksLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.booksErrMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.booksErrMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else
    {
    return(
        
        <div className="container">
        <div className="row">
            <div className="col-12 heading">
             <h3 align="center">List of All books</h3>
             <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name of Book</th>
            <th>ISBN number</th>
            <th>Authors</th>
            <th>Copies available</th>
            {this.props.isAdmin?(<th>Edit / <br/>Delete</th>):(<React.Fragment/>)}
            {this.props.auth.isAuthenticated && !this.props.auth.userinfo.admin?(<th>Request</th>):(<React.Fragment/>)}
          </tr>
        </thead>
        <tbody>
            {list}
        </tbody>
        </Table>
            </div>
        </div>
    </div>

        );
}
}

}

export default Booklist;