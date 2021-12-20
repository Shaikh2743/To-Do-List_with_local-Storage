import React,{useState,useEffect} from 'react'
import "./to-do-list-task.css"

export default function Form({setActive,IsActive}) {
    
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
//     var cboxs = document.getElementsByClassName("task-list-item-checkbox");
//   for (var i = 0; i < cboxs.length; i++) {

//     if (cboxs[i].checked==false) {
//       cboxs[i].closest(".task-list-item").style.textDecoration = "line-through";
//     }
//     else {
//       cboxs[i].closest(".task-list-item").style.textDecoration = "";
//     }
//   }

    const addItem = (e)=> {

        e.preventDefault();
        if(!inputData || inputData.trim().length === 0){
            alert('Entered Value Is Empty Please Enter Some To-do');
        }
        else{
            setItems([...items,{text: inputData,completed: false, id: new Date().getTime()}]);
            // setInputData('').style.textDecoration = "line-through";
            setInputData('');
        }    
    }

    const del = (id) =>{
        const updatedItems = items.filter((el,ind)=>{
            return ind!==id;
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

       
    }, [items,status] )


    const clearComplete = () => {
        const updatedTodos = items.filter((val) => {
          if (val.completed === false) {
            return val;
          }
        });
        setItems(updatedTodos);
      };

    //   const mouse = (e)  => {
    //       e.target.style.fill = "red" ;
    //   }
    //   const out = (e) => {
    //       e.target.style.fill = "#484b6a";
    //   }


    return (
        <div>
                <form onSubmit={addItem}>

               
                <div className="Main-form"  >
                <input  type="text" className="input" placeholder="Create a new todo..." value={inputData} 
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
                                <li key={i} className={IsActive ? "li-white" : "li-dark "}>
                                <input type="checkbox" className="item-check task-list-item-checkbox" checked={el.completed}   onClick={() => completeHandler(el.id)}/>
                                <span style={el.completed?{textDecoration:"line-through"}:null}>{el.text}</span>  
                                <svg /* onMouseOver={mouse} onMouseOut={out} */ xmlns="http://www.w3.org/2000/svg" /* className="svg svg-circle" */ className={IsActive ? "svg" : "svg-black"}  width="18" height="18"onClick={() => del(i)}><path  d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"></path></svg>
                            </li>
                            )
                           
                        })
                    }

                    <div className="footer">
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
