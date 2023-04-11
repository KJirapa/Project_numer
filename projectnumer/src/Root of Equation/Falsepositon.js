import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart ,registerables} from "chart.js";

Chart.register(CategoryScale);
Chart.register(...registerables);
const Falseposition =() =>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueX1(data.map((x)=>x.X1));
        setValueXr(data.map((x)=>x.Xr));
        c();
        return(
            <center>
            <Container className="tableresult">
                {/* <div className="chart">
                    <Line data={datagraph}/>
                </div> */}
                <Table >
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">X1</th>
                            <th width="30%">XR</th>
                            <th width="30%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.X1}</td>
                                <td>{element.Xr}</td>
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
            dataX[index] = element.X1;
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
    const Calfalseposition = (xl, xr) => {
        var x1,fX1,fXl,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        const cal = (X) =>{
            scope = {
                x:X,
            }
            return evaluate(Equation, scope)
        }
        do{
            fXl = cal(xl);
            fXr = cal(xr);

            x1 = (xl * fXr - xr * fXl) / (fXr - fXl);
            
            fX1 = cal(x1);

            iter ++;
            if (fX1*fXr > 0)
            {
                ea = error(xr, x1);
                data.push({
                    iteration:iter,
                    Xl:xl.toFixed(6),
                    X1:x1.toFixed(6),
                    Xr:xr.toFixed(6),
                    error:ea.toFixed(6)
                })
                xr = x1;
            }
            else if (fX1*fXr < 0)
            {
                ea = error(xl, x1);
                data.push({
                    iteration:iter,
                    Xl:xl.toFixed(6),
                    X1:x1.toFixed(6),
                    Xr:xr.toFixed(6),
                    error:ea.toFixed(6)
                })
                xl = x1;
            }
        }while(ea>e && iter<MAX)
        setX(x1)
        
    }
    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valueXr, setValueXr] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState()
    const [X,setX] = useState()
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)
  
    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calfalseposition(xlnum,xrnum);
        setHtml(print());
    }
    return (
            <Container>
                <Form >
                    <h1>False-Position Method</h1>
                    <Form.Group className="mb-3">
                    <Form.Label>f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control" data-testid="equation"></input>
                        <Form.Label>XL</Form.Label>
                        <input type="number" id="XL" onChange={inputXL} style={{width:"20%", margin:"0 auto"}} className="form-control" data-testid="xl"></input>
                        <Form.Label>XR</Form.Label>
                        <input type="number" id="XR" onChange={inputXR} style={{width:"20%", margin:"0 auto"}} className="form-control" data-testid="xr"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot} data-testid="Cal">
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <Container>
                <label><div data-testid="result">result = {X}</div></label>
                {html}
                </Container>
            </Container>
    )
}

export default Falseposition