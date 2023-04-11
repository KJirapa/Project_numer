import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const GaussJordan = () =>{
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
    const calJordan = (A) => {
        var m = A.length;
        var n = A[0].length;
        var min = Math.min(m,n);
        for(var k = 0; k < min; ++k) {
            for(var i = k+1; i < m; ++i) {
                var c = A[i][k] / A[k][k];
                for(var j = k+1; j < n; ++j) {
                    A[i][j] = A[i][j] - A[k][j] * c;
                }
            A[i][k] = 0;
            }
        }
        for(var i = m-1; i >= 0; --i) {
            var y = A[i][m] / A[i][i];
            for(var j = i-1; j >= 0; --j) {
                A[j][m] -= y * A[j][i];
                A[j][i] = 0;
            }
            A[i][m] = y;
            A[i][i] = 1;
        }
        let x = new Array(min); 
        for(var i = 0; i < N; ++i){
            x[i] = A[i][n-1];
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
            A[i].push(B[i]);
        }
        console.log(A);
        console.log(B);
        setAns(calJordan(A));
    }
    const inputnum = (event) => {
        setN(parseInt(event.target.value));
        setMatrix(new Array(parseInt(event.target.value)).fill(new Array(parseInt(event.target.value)).fill(0)));
        setHtml(createTable(event.target.value)); 
    }
    return(
        <Container>
        <Form>
            <h1>Gauss - Jordan Method</h1>
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
export default GaussJordan