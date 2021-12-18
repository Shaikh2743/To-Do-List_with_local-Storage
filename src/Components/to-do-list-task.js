import React,{useState,useEffect} from 'react'
import "./to-do-list-task.css"

export default function Form() {

    const getLocalItems = ()=>{
        const list = localStorage.getItem('lists');
        if(list){
            return JSON.parse(localStorage.getItem('lists'));
        }
        else{
            return [];
        }
    }

    const [inputData,setInputData]=useState();
    const [items, setItems]=useState(getLocalItems());
    const [status,setStatus] =useState('All');
    const [filterTodos,setFilterTodos] = useState([]);


    const filterHandler = () => {
        switch(status){
            case 'Completed':
                setFilterTodos(items.filter(el => el.completed === true));
                break;
            case 'Active':
                setFilterTodos(items.filter(el => el.completed === false));
                break;
            default:
                setFilterTodos(items);
                break;

        }
    }
    var cboxs = document.getElementsByClassName("task-list-item-checkbox");
  for (var i = 0; i < cboxs.length; i++) {

    if (cboxs[i].checked) {
      cboxs[i].closest(".task-list-item").style.textDecoration = "";
    }
    else {
      cboxs[i].closest(".task-list-item").style.textDecoration = "line-through";
    }
  }

    const addItem = (e)=> {

        e.preventDefault();
        if(!inputData){
            alert('Enter Any To-do');
        }
        else{
            setItems([...items,{text: inputData,completed: false, id: new Date().getTime()}]);
            setInputData('').style.textDecoration = "line-through";
        }    
    }

    const del = (id) =>{
        const updatedItems = items.filter((el,ind)=>{
            return ind!=id;
        })
        setItems(updatedItems);
    }


    const completeHandler =(id) =>{

        const newId= items.map((el) =>{
            if(el.id === id){
                return {
                    ...el, completed:!el.completed
                };
            }
             else
             {
                return el;
             } 
        })

        setItems(newId);
    }


    const statusHandler = (e) => {
        setStatus(e.target.textContent)
       
    
    }


    useEffect(() => {
        localStorage.setItem('lists',JSON.stringify(items));
        filterHandler();

       
    }, [items,status])


    const clearComplete = () => {
        const updatedTodos = items.filter((val) => {
          if (val.completed == false) {
            return val;
          }
        });
        setItems(updatedTodos);
      };



   


    

    return (
        <div>
                <form onSubmit={addItem}>

               
                <div className="form-inner"  >
                <input  type="text"  placeholder="Create a new todo..." value={inputData} 
                onChange={(e)=> {
                    setInputData(e.target.value)
                }}
                ></input>
                </div>
                </form>
         

            <div className="todo-list-wrapper">
                <ul className="list tags">

                    {
                       filterTodos.map((el,i)=>{
                            return(
                                <li key={i} className="lists task-list-item">
                                <input type="checkbox" className="item-check task-list-item-checkbox" checked={el.completed}   onClick={() => completeHandler(el.id)}/>
                                <span>{el.text}</span>  
                                <svg xmlns="http://www.w3.org/2000/svg"className="svg" width="18" height="18"onClick={() => del(i)}><path  d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"></path></svg>
                            </li>
                            )
                           
                        })
                    }

                    <div className="todo-footer">
                    <button onClick={statusHandler} >All</button>
                    <button onClick={statusHandler}>Active</button>
                    <button onClick={statusHandler}>Completed</button>
                    <button onClick={clearComplete}>Clear Completed</button>
                    </div>
                    
                </ul>
            </div>
        </div>
    )
}
