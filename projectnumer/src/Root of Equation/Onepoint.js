import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart ,registerables} from "chart.js";

Chart.register(CategoryScale);
Chart.register(...registerables);
const Onepoint = () =>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.x0));
        setValuefX0(data.map((x)=>x.fX0));
        c();

        return(
            <center>
            <Container className="tableresult">
                <label>result = {X}</label>
                <div className="chart">
                    <Line data={datagraph}/>
                </div>
                <Table  striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X0</th>
                            <th width="30%">fX0</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.x0}</td>
                                <td>{element.fX0}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
            </center>
        );
    
    }
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew);

    const CalOnepoint= (x0) => {
        var fX0,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        const cal = (x) =>{
            scope = {
                x:x,
            }
            return evaluate(Equation, scope)
        }
        do{
            fX0 = cal(x0);
            ea = error(x0, fX0);
            iter ++;
            data.push({
                iteration:iter,
                x0:x0,
                fX0:fX0,
            })
            x0 = fX0;
            
        }while(ea>e && iter<MAX)
        setX(fX0)
    }
    const dataX = [];
    const dataY = [];
    const c = () =>{
        {data.map((element, index)=>{
            dataX[index] = element.x0;
            dataY[index] = element.fX0;
        })}
        console.log("data  "+dataX);
        console.log("dataY  "+dataY);
    }
    const datagraph = {
        labels: dataY,
        datasets: [{
        label: 'X and Fx',
        data: dataX,
        fill: false,
        borderColor: 'rgb(0, 130, 230)',
        tension: 0.1
        }]
      };
    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valuefX0, setValuefX0] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState();
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        CalOnepoint(x0num);
     
        setHtml(print());

    }
    return(
        <Container>
            <Form>
                <h1>One-Point Iteration Method</h1>
                <Form.Group className="mb-3">
                    <Form.Label>f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation}  onChange={inputEquation}  style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    <Form.Label>X</Form.Label>
                        <input type="number" id="X0" onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
            </Form>
            <br></br>
            <Container>
                {html}
            </Container>
        </Container>
    )
}
export default Onepoint