import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const Cholesky = () =>{
    const [Matrix, setMatrix] = useState([]);
    const [N, setN] = useState(0);
    const [Ans, setAns] = useState([]);

    const [html, setHtml] = useState(null);
    const createTable = () =>{ 
        return(
        <div>
            <label>INPUT Matrix</label>
        </div>
    )}
    const calCholesky = (A,B) => {
        var L = [];
        var LT = [];
        
        for(let i = 0; i < N; i++){
            L.push([0])
            LT.push([0])
            for(let j = 0; j < N; j++){
                L[i][j] = 0;
                LT[i][j] = 0;
            }
        }
        console.log(L)
        console.log(LT)
        var n = A.length;
        for (var i = 0; i < n; i++) {
            var sum = 0;
            for (var j = 0; j <= i; j++) {
                if (i == j) {
                    for (var k = 0; k < j; k++) {
                        sum += Math.pow(L[j][k], 2);
                    }
                    L[j][j] = Math.sqrt(A[j][j] - sum);
                }
                else {
                    for (var k = 0; k < j; k++) {
                        sum += (L[i][k] * LT[k][j]);
                    }
                    L[i][j] = (A[i][j] - sum) / L[j][j];
                }
                LT[j][i] = L[i][j];
            }
        }
       
        //find x,y
        var y = new Array(n);
        var x = new Array(n);
        for (var i = 0; i < n; i++) {
            y[i] = 0;
            x[i] = 0;
        }
        for (var i = 0; i < n; i++) {
            y[i] = B[i];
            for (var j = 0; j < n; j++) {
                if (i != j) {
                    y[i] = y[i] - L[i][j] * y[j];
                }
            }
            y[i] = y[i] / L[i][i];
        }
        for (var i = n - 1; i >= 0; i--) {
            x[i] = y[i];
            for (var j = 0; j < n; j++) {
                if (i != j) {
                    x[i] = x[i] - L[j][i] * x[j];
                }
            }
            x[i] = x[i] / LT[i][i];
        }
       
        return x
    }

    const calculateRoot = () =>{
        var A = [];
        var B = [];
        for(let i = 0; i < N; i++){
            A.push([0])
            B.push([0])
            for(let j = 0; j < N; j++){
                A[i][j] = 0;
            }
        }
        for(var i = 0; i < N; i++){
            B[i] = parseFloat(document.getElementById("B"+i+i).value);;
            for(var j = 0; j < N; j++){
                A[i][j] = parseFloat(document.getElementById("A"+i+j).value);
            }
        }
        console.log(A);
        console.log(B);
        setAns(calCholesky(A,B));
    }
    const inputnum = (event) => {
        setN(parseInt(event.target.value));
        setMatrix(new Array(parseInt(event.target.value)).fill(new Array(parseInt(event.target.value)).fill(0)));
        setHtml(createTable(event.target.value)); 
    }
    return(
        <Container>
        <Form>
            <h1>Cholesky Decomposition Method</h1>
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
            </Container>
            <Button variant="dark" onClick={calculateRoot} >
                Calculate
            </Button>
        </Form>
        
         <div className="showresult">
            {Ans.map((element,index)=>{
                return(
                    <label> X{index+1} = {element.toFixed(6)} </label>
                )
            })}
        </div>
    </Container>
    );
}
export default Cholesky