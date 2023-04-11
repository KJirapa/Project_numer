import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const GaussSeidal = () =>{
    const [Matrix, setMatrix] = useState([]);
    const [N, setN] = useState(0);
    const [Ans, setAns] = useState([]);

    const [html, setHtml] = useState(null);
    const createTable = () =>{ 
        return(
        <div>
            <label>INPUT Matrix : </label>
        </div>
    )}
    const calGSeidal = (A,B,X) => {
        var n = A.length;
        var Xold = [];
        var ea = [];
        var sum = 0;
        // console.log("------------")
        do{
            for (var i = 0; i < n; i++) {
                Xold[i] = X[i];
                sum = 0;
                for (var j = 0; j < n; j++) {
                    if (i != j) {
                        sum += A[i][j] * X[j];
                    }
                }
            // console.log("B  "+ B[i])
            // console.log("sum  "+ sum)
            X[i] = (B[i] - sum)/A[i][i];
            var u = B[i] - sum;
            // console.log("A  "+ A[i][i])
                }
            // console.log("old  "+Xold)
            // console.log("x  " +X)

            for(var i = 0; i < X.length; i++){
                ea[i] = Math.abs((X[i] - Xold[i]) / X[i]);
                // console.log("ea " + i +" "+ ea[i]);
            }
            var check = false;
            for(var i = 0; i < X.length; i++){
                check = ea[i] > 0.000001;
            }
        }while(check)
        setAns(X);
    }

    const calculateRoot = () =>{
        var A = [];
        var B = [];
        var X = [];
        for(let i = 0; i < N; i++){
            A.push([0])
            B.push([0])
            X.push([0])
            for(let j = 0; j < N; j++){
                A[i][j] = 0;
            }
        }
        for(var i = 0; i < N; i++){
            B[i] = parseFloat(document.getElementById("B"+i+i).value);
            X[i] = parseFloat(document.getElementById("X"+i).value);;
            for(var j = 0; j < N; j++){
                A[i][j] = parseFloat(document.getElementById("A"+i+j).value);
            }
        }
        console.log(A);
        console.log(B);
        console.log(X);
        calGSeidal(A,B,X)
    }
   

    const inputnum = (event) => {
        setN(parseInt(event.target.value));
        setMatrix(new Array(parseInt(event.target.value)).fill(new Array(parseInt(event.target.value)).fill(0)));
        setHtml(createTable(event.target.value)); 
        console.log(Matrix);
    }
    return(
        <Container>
        <Form>
            <h1>GaussSeidal Method</h1>
            <label><b>Size of Matrix :</b></label><label>N X N</label>
            <input type="number" id="N"  onChange={inputnum} />
            <Container className="inputmatrix">
                {html} 
                <Table>
                    {Matrix.map((element,index) => {
                        var i = index;
                        return(
                            <tr key= {i} >
                            {Matrix[i].map((element,index) => {
                                return(
                                    <td key={"A" + i + index}>
                                        <center>
                                        <input id={"A" + i + index} placeholder={"A" + i + index} style={{width:"80%"}}/>
                                        </center>
                                    </td>
                                )
                            })}
                            <td key={"B" + i + index}>
                                <center>
                                    <input id={"B" + i + index} placeholder={"B" + i + index} style={{width:"80%"}}/>
                                </center>
                            </td>
                            </tr>
                            
                        )
                    })}
                </Table>
                <div className="showresult">
                    <b>Answer :</b>
                    {Ans.map((element,index)=>{
                        return(
                            <label> X{index+1} = {element.toFixed(6)} </label>
                        )
                    })}
                </div>
                <Container className="init">
                {Matrix.map((element,index) => {
                    return(
                        <div>
                            <label>X{index+1}</label>
                            <input id={"X" + index} placeholder={"X" + index} style={{width:"10%"}} />
                        </div>
                    );
                })}
               </Container>
            </Container>
            <Button variant="dark" onClick={calculateRoot} >
                Calculate
            </Button>
        </Form>
    </Container>
    );
}
export default GaussSeidal