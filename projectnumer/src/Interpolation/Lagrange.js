import { useState } from "react"
import { Button, Container, Form, Table ,Accordion} from "react-bootstrap";
import { CategoryScale, Chart ,registerables} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);
Chart.register(...registerables);
const Lagrange  =()=>{
    const [numX, setnumX] = useState([]);
    const [N, setN] = useState(0);
    const [Ans, setAns] = useState([]);
    const [Point,setPoint] = useState([]);
    const [value,setValue] = useState();
    const [Xi, setXi] = useState([]);
    const [fXi, setfXi] = useState([]);

    const [html, setHtml] = useState(null);
    const createTable = () =>{ 
        return(
        <div>
            <label>INPUT X and f(X) : </label>
        </div>
    )}
    const calLagrange = (fx,X) => {
        let result = 0; 
   
        for (let i = 0; i < Point; i++)
        {
            let term = fx[i];
            for (let j = 0; j < Point; j++)
            {
                if (j != i)
                    term = term * (value - X[j]) / (X[i] - X[j]);
                console.log(X[j]); 
                console.log(X[i]); 
            }
            result += term;
        }
        console.log(result.toFixed(6));  
        setAns(result.toFixed(6));
    }
  
    const calculateRoot = () =>{
        var fx = [];
        var X = [];
        for(var i = 0; i < N; i++){
            fx[i] = parseFloat(document.getElementById("Y"+i).value);
            X[i] = parseFloat(document.getElementById("X"+i).value);
        }
        setXi(X);
        setfXi(fx);
        console.log(fx);
        console.log(X);
        console.log("Xi",Xi);
        console.log("fXi",fXi);
        calLagrange(fx,X)
    }
   
    const datagraph = {
        labels: Xi,
        datasets: [{
        label: 'f(Xi) of Xi',
        data: fXi,
        fill: false,
        borderColor: 'rgb(0, 130, 230)',
          tension: 0.1
        }]
      };
    const inputnump = (event) => {
        setPoint(parseInt(event.target.value));
    }
    const inputX= (event) => {
        setValue(parseInt(event.target.value));
    }

    const inputnum = (event) => {
        setN(parseInt(event.target.value));
        setnumX(new Array(parseInt(event.target.value)).fill(0));
        setHtml(createTable()); 
    }
    return(
        <Container>
        <Form>
            <h1>Lagrange Interpolation</h1>
            <label><b>number of data :</b></label>
            <input type="number" id="N"  onChange={inputnum} />
            <label><b>X :</b></label>
            <input type="number" id="X"  onChange={inputX} />
            <Container className="inputX">
                <div className="init"> </div>
                {html} 
                <Table>
                    {numX.map((element,index) => {
                        return(
                            <tr>
                                <td key={"X" + index}>
                                    <center> <input id={"X" + index}  placeholder={"X" + index} style={{width:"80%"}}/></center>
                                </td>
                                <td key={"Y" + index}>
                                    <center><input id={"Y" +index}  placeholder={"f"+"("+"X" + index+")"} style={{width:"80%"}}/> </center>
                                </td>
                            </tr>
                        )
                    })}
                </Table>
            </Container>
            <label><b>number of point</b></label>
            <input type="number" id="N"  onChange={inputnump} min="2"/>
            <Button variant="dark" onClick={calculateRoot} >
                Calculate
            </Button>
            <div className="init">Ans : {Ans}</div>
            <div className="chart">
                    <Line data={datagraph}/>
            </div>
        </Form>
    </Container>
    );
}
export default Lagrange 