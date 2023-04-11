import { useState, useEffect } from "react"
import { Button, Container, Form, Table, Accordion } from "react-bootstrap";
import {  pow , inv, i, index} from 'mathjs'
import PolynomialRegression from 'ml-regression-polynomial';
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import { set } from "mongoose";


const Polynomial= () => {
    const [N, setN] = useState(0);
    const [Ans, setAns] = useState([]);
    const [M, setM] = useState();
    const [NUM, setNUM] = useState([])
    const [Xi, setXi] = useState([]);
    const [fXi, setfXi] = useState([]);
    const [Graph, setG] = useState();
    const [Value,setValue] = useState();
    const [Result,setResult] = useState();
    const [Res,setRes] = useState([]);
  

    const showgraph = () =>{
        console.log("datagraph==",datagraph)
        return(
            <Scatter data={datagraph} />
        )
    }

    const showRegression = () =>{
        return(
            <label>f({Value}) = {Result}</label>
        )
    }
    const inputValue = (event) => {
        setValue(parseInt(event.target.value));
    }
    const inputM = (event) => {
        setM(parseInt(event.target.value));
    }
    const inputN = (event) => {
        setN(parseInt(event.target.value));
        setNUM(new Array(parseInt(event.target.value)).fill(0));
        random();
    }
    const calRegression = (fx, X) => {
        var A = [];
        var Xres = [];
        for (var i = 0; i < M + 1; i++) {
            A.push([0])
            Xres.push([0])
            for (var j = 0; j < M + 1; j++) {
                A[i][j] = 0;
            }
        }
        var B = new Array(M + 1).fill(0);
        var sum = 0;
        for (var i = 0; i < M + 1; i++) {
            for (var k = 0; k <= i; k++) {
                sum = 0;
                var p = i + k;
                console.log("i"+i);
                console.log("k"+k);
                console.log("T"+p);
                for (j = 0; j < N; j++) {
                    sum += pow(X[j], p);
                }
                A[i][k] = sum;
                A[k][i] = sum;
                console.log(i,k);
                console.log(k,i);
            }
            console.log("------");
            sum = 0;
            for (j = 0; j < N; j++) {
                sum += fx[j] * pow(X[j], i)
            }
            B[i] = sum;
        }
        console.log("A",A);
        console.log("B",B);

        var IA = inv(A);
        console.log("inv(A)",IA);

        var result = 0;
        for(var i = 0; i < M + 1; i++){
            result = 0
            for (var j = 0; j < M + 1; j++) {
                result += IA[i][j]*B[j];
            }
            Xres[i] = result;
        } 
        console.log("Xresult",Xres)
        console.log("X",Xi);
        console.log("Y",fXi);

        var resultfx = Xres[0];
        for(var i = 1; i < M + 1; i++){
            resultfx += Xres[i] * pow(Value,i);
        }
        setResult(resultfx.toFixed(6));
        setAns(showRegression());
        console.log("result",resultfx);
        setRes(Xres);
        console.log("ppppp",Res);
    }
    const calculateRoot = () => {
        var fx = [];
        var X = [];
        for (var i = 0; i < N; i++) {
            fx[i] = parseFloat(document.getElementById("Y" + i).value);
            X[i] = parseFloat(document.getElementById("X" + i).value);
        }
        setXi(X);
        setfXi(fx);
        console.log(fx);
        console.log(X);
        console.log(N);
    
        setG(showgraph());
        calRegression(fx, X)
        cal();
        // const regression = new PolynomialRegression(X, fx, M);
        // console.log("regression"+regression);
    }
    const regression = [];
    const cal = () =>{
        var yval = 0; 
        for(var i = 0 ; i < N; i++){
            for(var j = 1; j < M + 1; j++){
                yval = Res[j] * pow(Xi[i],j) 
            }
            yval = yval + Res[0];
            regression.push(yval)
            console.log("yval  ",i," ",yval);
        }
    }
    const datagraph = {
        labels: Xi,
        datasets: [{
            type: 'scatter',
            label: 'Scatter Dataset',
            data: fXi,
            fill: false,
            borderColor: 'blue'
        }, {
            type: 'line',
            label: 'Line Dataset',
            data: regression,
            fill: false,   
            borderColor: 'rgb(255, 99, 132)',
        }]
      };
      const [Data,setData] = useState([]);
      const url = 'http://localhost:1400/XY';

      let data;
      const getdata = () =>{
          axios.get(url).then((response) => {
              data = response.data;
              setData(response.data);
              console.log("get Data API" ,data);
          })
          .catch((error) => {
              console.log(error);
          });
      }
      useEffect(() => {
          getdata();
      },[]);
      const randX = [];
      const randY = [];
      const [RX,setRX] = useState([]);
      const [RY,setRY] = useState([]);
      const random = () =>{
        for(var i = 0; i < Data.length; i++){
            randX.push(Data[i].X);
            randY.push(Data[i].Y)
        }
        console.log("randx",randX)
        console.log("randy",randY)
        let item1 = randX[Math.floor(Math.random() * randX.length)];
        console.log("randomX",item1)
        RX.push(item1);
        let item2 = randY[Math.floor(Math.random() * randY.length)];
        console.log("randomY",item2)
        RY.push(item2);
      }
    return (
        <Container>
            <Form>
                <h1>Polynomial Regression</h1>
                <label><b>number of data :</b></label>
                <input type="number" id="N" onChange={inputN} />
                <label><b>M :</b></label>
                <input type="number" id="M" onChange={inputM} />
                <label><b>X :</b></label>
                <input type="number" id="X" onChange={inputValue} />
                <Container className="inputX">
                <center>
                    
                    <div className="chart"> 
                        {Ans}
                        {Graph}
                    </div>
                </center>
                    <Table>
                        {/* {NUM.map((element, index) => {

                            return (
                                <tr>
                                    {Data.map((d,i)=>{
                                        if(i == index)
                                        return(
                                            <td key={"X" + index}>
                                                <center> <input id={"X" + index} value={d.X} placeholder={"X" + index} style={{ width: "80%" }} /></center>
                                            </td>
                                    )})}
                                     {Data.map((d,i)=>{
                                          if(i == index)
                                          return(
                                            <td key={"Y" + index}>
                                                <center><input id={"Y" + index} value={d.Y} placeholder={"f" + "(" + "X" + index + ")"} style={{ width: "80%" }} /> </center>
                                            </td>
                                         )})}
                                </tr>
                           
                            )
                            })} */}
                            {NUM.map((element, index) => {
                                // console.log("Data",Data[index].X)
                            return (
                                <tr>
                                    <td key={"X" + index}>
                                        <center> <input id={"X" + index}  value={RX[index]} placeholder={"X" + index} style={{ width: "80%" }} /></center>
                                    </td>
                                    <td key={"Y" + index}>
                                        <center><input id={"Y" + index} value={RY[index]} placeholder={"f" + "(" + "X" + index + ")"} style={{ width: "80%" }} /> </center>
                                     </td>
                                </tr>
                           
                            )})}
                    </Table>
                </Container>
                <Button variant="dark" onClick={calculateRoot} >
                    Calculate
                </Button>
            </Form>
        </Container>
    );
}
export default Polynomial;