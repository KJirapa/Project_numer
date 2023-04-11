import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate ,derivative} from 'mathjs'
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart ,registerables} from "chart.js";

Chart.register(CategoryScale);
Chart.register(...registerables);

const NewtonRaphson =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.X0));
        c();
        return(
            <center>
            <Container className = "tableresult">
                <label>result = {X}</label>
                <div className="chart">
                    <Line data={datagraph}/>
                </div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X</th>
                            <th width="30%">value X</th>
                            <th width="30%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>X{element.iteration}</td>
                                <td>{element.X}</td>
                                <td>{element.error}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
            </center>
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew);
    const dataX = [];
    const dataY = [];
    const c = () =>{
        {data.map((element, index)=>{
            dataX[index] = element.X;
            dataY[index] = element.iteration;
        })}
        console.log("data  "+dataX);
        console.log("dataY  "+dataY);
    }
    const datagraph = {
        labels: dataY,
        datasets: [{
        label: 'X of iteration',
        data: dataX,
        fill: false,
        borderColor: 'rgb(0, 130, 230)',
          tension: 0.1
        }]
      };
    const CalNewton = (x0) => {
        var fX0,dfX0,ea,scope,x;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        const cal = (x) =>{
            scope = {
                x:x0,
            }
        return evaluate(Equation, scope)
        }
        const diff = (x) =>{
            scope = {
                x:x0,
            }
            const df = derivative(Equation,'x').toString()
            return evaluate(df, scope)
        }
        do {
            fX0 = cal(x0);
            dfX0 = diff(x0);
            x = x0 - fX0/ dfX0;
            ea = error(x, x0)
            iter++;
            obj = {
                iteration:iter,
                X:x.toFixed(6),
                error:ea.toFixed(6)
            }
            data.push(obj)
            x0 = x;
        } while (ea>e && iter<MAX)
        setX(x0)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    

    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState()
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
        CalNewton(x0num);
        setHtml(print());

        console.log(valueIter)
        console.log(valueX0)
    }

    return (
            <Container>
                <Form >
                    <h1>Newton-Raphson Method</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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
export default NewtonRaphson