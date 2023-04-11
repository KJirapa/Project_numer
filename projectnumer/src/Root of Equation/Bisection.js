import { useState,useEffect } from "react"
import { Button, Container, Form, Table ,Accordion} from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Line } from "react-chartjs-2";
import axios from "axios";
import { CategoryScale, Chart ,registerables} from "chart.js";

Chart.register(CategoryScale);
Chart.register(...registerables);
const Bisection =()=>{
 
    const turl = 'http://localhost:1400/login';
    const [Token,setToken] = useState([]);
    const [Data,setData] = useState([]);
    const url = 'http://localhost:1400/equation';
    let dt;
    const gettoken = () =>{
        try{
        axios.get(turl).then((response) => {
            dt = response.data;
            // setToken(response.data.token);
            console.log("get token" ,dt);
            getdata(dt);
        });
        } catch (error) {
                console.log(error);
        }
    };
    const getdata = (Token) =>{
        try {
            console.log("have token" ,Token.token);
            axios.get(url, {headers: { authorization: `Bearer ${Token.token}`},})
            .then((res) => {
                console.log("get Data API" ,res.data);
                setData(res.data);
            });
        }catch (error) {
            console.log(error);
        }
    }
    const pressButton = () =>{
        return (
            <label style={{color:"red"}}>Press GET TOKEN Button!!</label>
        )
    }
    const [Equa,setEqua] = useState([]);
    const random = () =>{
        if(Data.length == 0){
            setEqua(pressButton())
        }
        else{
            for(var i = 0; i < Data.length; i++){
                let item = Data[Math.floor(Math.random() * Data.length)]
                setEquation(item.Equation);
                setXL(item.Xl);
                setXR(item.Xr);
             }
             setEqua(" ")
        }
    }
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x)=>x.Xr));
        c();
        return(
            <center>
            <Container className="tableresult" >
                <label><div data-testid="result">result = {X}</div></label>
                <div className="chart">
                    <Line data={datagraph}/>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th>
                            <th width="30%">Error</th>
                        </tr>
                    </thead>
                    <tbody className="result">
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
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
   function Calbisection (xl, xr){
        var xm,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        const cal = (X) =>{
            scope = {
                x:X,
            }
            return evaluate(Equation, scope)
        }
        do
        {
            xm = (xl+xr)/2.0;
            
            fXr = cal(xr);
            fXm = cal(xm);

            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, xm);
                data.push({
                    iteration:iter,
                    Xl:xl.toFixed(6),
                    Xm:xm.toFixed(6),
                    Xr:xr.toFixed(6),
                    error:ea.toFixed(6)
                })
                // data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, xm);
                data.push({
                    iteration:iter,
                    Xl:xl.toFixed(6),
                    Xm:xm.toFixed(6),
                    Xr:xr.toFixed(6),
                    error:ea.toFixed(6)
                })
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
        setHtml(print());
    }
    module.exports = Calbisection;
    const dataX = [];
    const dataY = [];
    const c = () =>{
        {data.map((element, index)=>{
            dataX[index] = element.Xm;
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
    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    

    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState()
    const [X,setX] = useState(0)
    const [XL,setXL] = useState()
    const [XR,setXR] = useState()

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
        Calbisection(xlnum,xrnum);
    }
    const RandEquation = () =>{
        random();
    }
  
    return (
            <Container>
                <Form >
                    <h1>Bisection Method</h1><br/>
                    <Form.Group className="mb-3">
                    <Form.Label>f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"35%", margin:"0"}} className="form-control" data-testid="equation"></input>
                        <br/>
                        <Form.Label>XL</Form.Label>
                        <input type="number" id="XL" value={XL} onChange={inputXL} style={{width:"25%", margin:"1.3em"}} className="form-control" data-testid="xl" ></input>
                        <Form.Label>XR</Form.Label>
                        <input type="number" id="XR" value={XR} onChange={inputXR} style={{width:"25%", margin:"1.3em"}} className="form-control" data-testid="xr"></input><br/>
                        <Form.Label>Token</Form.Label>
                        <input type="text" id="token"  value={Token} style={{ width:"90%",margin:"1.3em"}} data-testid="showtoken"></input>
                        
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot} data-testid="Cal">
                        Calculate
                    </Button>
                    <Button variant="dark" onClick={RandEquation} >
                        Random
                    </Button>
                    <Button onClick={gettoken}>
                       Get Token
                    </Button>
                    {Equa}
                </Form>
                <br></br>
                <Container>
                {html}
                
                </Container>
            </Container>
    )
}
export default Bisection